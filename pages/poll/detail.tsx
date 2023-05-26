import React, { useEffect, useRef, useState } from 'react';
import styles from '../../styles/PollDetail.module.scss';
import Countdown from '../../components/Countdown';
import MarkdownEditor from '../../components/MarkdownEditor';
import {ChartData, ChartOptions } from 'chart.js';
import Chart from 'chart.js/auto';
import { useRouter } from 'next/router';


export default function PollDetail(){
    const mockPoll = {
        votingId: 1,
        title: 'Poll Title',
        description: 'Poll Description',
        end: new Date('2021-07-20T00:00:00'),
        votingOptions: ["Yes","No","Maybe","I don't know"],
        user:'Yannie'
    }
    const chartRef = useRef(null);
    const router = useRouter();



    const mockUser = {
        name: 'Yannie',
    }
    const [selected, setSelected] = useState(false);
    const [voted, setVoted] = useState(false);

    useEffect(() => {
        if(!chartRef.current){
            return;
        }
        const ctx = chartRef.current.getContext('2d');

        const data: ChartData = {
            labels: mockPoll.votingOptions,
            datasets: [{
                label: 'Votes',
                data: [12, 19, 3, 5],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.5)',
                    'rgba(54, 162, 235, 0.5)',
                    'rgba(255, 206, 86, 0.5)',
                    'rgba(75, 192, 192, 0.5)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgb(75, 192, 192)'
                ],
                borderWidth: 1
            }]
        };
        const options: ChartOptions = {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: 'Voting Results'
                }
            }
        };
        const chart = new Chart(ctx, {
            type: 'pie',
            data: data,
            options: options
        });

        return () => {
            chart.destroy();
        }
        

        // mby ein Service der alle paar sekunden das Voting updated und dann die Daten neu lädt
      },[mockPoll.votingOptions, voted]);

    function setActive(e){
        if(e.target.classList.contains(styles.active)){
            console.log('remove active');
            e.target.classList.remove(styles.active);
            setSelected(false);
        }else{
            const options = document.querySelectorAll('.'+styles.container+' div:last-child button');
            options.forEach((option)=>{
                option.classList.remove(styles.active);
            });
            e.target.classList.add(styles.active);
            setSelected(true);
        }
    }

    function vote(){
        setVoted(true);
        const voteButton = document.getElementById('voteButton');
        voteButton.setAttribute('disabled', 'true');

        //delay scroll to bottom
        setTimeout(()=>{
            window.scrollTo({
                top: document.documentElement.scrollHeight,
                behavior: 'smooth',
              });
        }, 100);

        //TODO: send vote to backend

    }

    function backToList(){
        router.push('/poll/list');
    }

    useEffect(()=>{
        if(mockPoll.end < new Date()){
            setVoted(true);
        }
        else{
            setTimeout(()=>{
                setVoted(true);
            }
            ,mockPoll.end.getTime()-new Date().getTime());
        }
    

    //passt schon so :D
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);
    

    return(
        <div className={styles.container}>
            <div>
                <button onClick={backToList}></button>
            </div>
            <div>
                <h1>{mockPoll.title}</h1>
            </div>

            <div>
                <div>
                    {
                        //end in the past
                        mockPoll.end < new Date() ?
                        <p>Abstimmung beendet!</p>
                        :
                        <>
                        <p>Endet in &nbsp;</p>
                        <Countdown date={mockPoll.end}></Countdown>
                        </>
                    }
                    
                </div>
            </div>

            <div>
                <div>
                    <MarkdownEditor containerWidth={100} isEditable={mockUser.name == mockPoll.user}></MarkdownEditor>
                </div>
            </div>

           
            {
                voted&&
                <div>
                <canvas ref={chartRef} />
                </div>
            }


            <div>
                {
                    mockPoll.votingOptions.map((option, index) => {
                        return(
                            <button onClick={!voted?setActive:()=>{}} key={"option_"+index}>
                                <p>{option}</p>
                            </button>
                        )
                    })
                }
                <div>
                    <button id='voteButton' disabled={!selected} onClick={vote}>{voted?"Abgestimmt":"Abstimmen"}</button>
                </div>
            </div>
        </div>
    )
}