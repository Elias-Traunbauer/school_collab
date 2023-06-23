import React, { useEffect, useRef, useState } from 'react';
import styles from '../../styles/PollDetail.module.scss';
import Countdown from '../../components/Countdown';
import MarkdownEditor from '../../components/MarkdownEditor';
import { ChartData, ChartOptions } from 'chart.js';
import Chart from 'chart.js/auto';
import { useRouter } from 'next/router';
import Datepicker from '../../components/Datepicker';

export default function PollDetail() {
    const mockPoll = {
        votingId: 1,
        title: 'Poll Title',
        description: 'Poll Description',
        end: new Date('2024-07-20T00:00:00'),
        votingOptions: ["Option1", "Option2"],
        user: 'Yannie'
    }

    const [poll, setPoll] = useState(mockPoll);
    const chartRef = useRef(null);
    const router = useRouter();



    const mockUser = {
        name: 'Yannie',
    }
    const [selected, setSelected] = useState(false);
    const [voted, setVoted] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [backupPoll, setBackupPoll] = useState(mockPoll);
    const [editedDate, setEditedDate] = useState(new Date());
    const [isNoEndDate, setIsNoEndDate] = useState(mockPoll.end === null);

    useEffect(() => {
        if (!chartRef.current) {
            return;
        }
        const ctx = chartRef.current.getContext('2d');

        const data: ChartData = {
            labels: poll.votingOptions,
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
    }, [poll.votingOptions, voted]);

    function setActive(e) {
        if (e.target.classList.contains(styles.active)) {
            console.log('remove active');
            e.target.classList.remove(styles.active);
            setSelected(false);
        } else {
            const options = document.querySelectorAll('.' + styles.container + ' div:last-child button');
            options.forEach((option) => {
                option.classList.remove(styles.active);
            });
            e.target.classList.add(styles.active);
            setSelected(true);
        }
    }

    function removeInvalidationStyle(e){
        e.target.classList.remove(styles.invalid);
    }

    function vote() {
        setVoted(true);
        const voteButton = document.getElementById('voteButton');
        voteButton.setAttribute('disabled', 'true');
        const chart = document.getElementById('Chart');

        //delay scroll to bottom
        setTimeout(() => {
            chart.scrollIntoView({ behavior: 'smooth' });
        }, 100);

        //TODO: send vote to backend

    }

    function backToList() {
        router.push('/poll/list');
    }

    function deleteOption(index:number) {
        poll.votingOptions.splice(index, 1);
        setPoll({...poll});
    }
    function addOption() {
        poll.votingOptions.push('');
        setPoll({...poll});
    }

    function saveEdit() {
        const titleInput = document.getElementById('pollTitleInput') as HTMLInputElement;
        const options = document.querySelectorAll<HTMLInputElement>('.' + styles.optionsEditContainer + ' div input');
        const validOptions = [];
        let isValid = true;

        if (titleInput.value.length < 1) {
            titleInput.classList.add(styles.invalid);
            isValid = false;
        }

        // at least 2 options should be available
        let valid = 0;
        options.forEach((option) => {
            if (option.value.length > 0) {
                valid++;
                validOptions.push(option.value);
            }
        });
        if (valid < 2) {
            options.forEach((option) => {
                if (option.value.length < 1) {
                    option.classList.add(styles.invalid);
                }
            });
            isValid = false;
        }

        if (!isValid) {
            return;
        }

        if(isNoEndDate){
            poll.end = null;
        }
        else{
            poll.end = editedDate;
        }
        poll.votingOptions = validOptions;
        poll.title = titleInput.value;
        setPoll({...poll});
        setEditMode(false);
    }

    function edit() {
        setBackupPoll({...poll});
        setEditMode(true);
    }

    function cancelEdit() {
        if(backupPoll.end === null){
            setIsNoEndDate(true);
        }
        else{
            setIsNoEndDate(false);
        }
        setEditedDate(backupPoll.end);
        setPoll({...backupPoll});
        setEditMode(false);
    }

    function changeDate(date: Date) {
        console.log(date);
        setEditedDate(date);
    }

    function deletePoll(){
        backToList();

        //TODO: delete poll in backend
    }

    useEffect(() => {
        if (poll.end < new Date()) {
            setVoted(true);
        }
        else {
            setTimeout(() => {
                setVoted(true);
            }
                , poll.end.getTime() - new Date().getTime());
        }


        //passt schon so :D
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    
    function changeEndDateCheckbox(){
        setIsNoEndDate(!isNoEndDate);
    }


    return (
        <div className={styles.container}>
            <div>
                <button onClick={backToList}></button>
            </div>
            <div>
                {
                    editMode ?
                        <input id='pollTitleInput' type="text" defaultValue={poll.title}></input>
                        :
                        <h1>{poll.title}</h1>
                }

            </div>

            <div>
                <div>
                    {
                        !editMode ?
                            poll.end == null ?
                            ""
                            :
                            poll.end < new Date() ?
                                <p>Abstimmung beendet!</p>
                                :
                                <>
                                    <p>Endet in &nbsp;</p>
                                    <Countdown date={poll.end}></Countdown>
                                </>
                            :
                            <div className={styles.dateContainer}>
                                <div>
                                    <Datepicker dateParam={poll.end} inputChanged={changeDate} ></Datepicker>
                                </div>
                                <span>
                                    <input onChange={changeEndDateCheckbox} type='checkbox' id='checkbox' defaultChecked={isNoEndDate}></input>
                                    <label htmlFor='checkbox'>ohne Ende</label>
                                </span>
                            </div>
                    }

                </div>
            </div>

            <div>
                <div>
                    {
                        <MarkdownEditor containerWidth={100} isEditable={editMode}></MarkdownEditor>
                    }

                </div>
            </div>


            {
                voted && !editMode ?
                <div>
                    <canvas id='Chart' ref={chartRef} />
                </div>
                :
                <div id='Chart'></div>
            }



                {
                    !editMode ?
                    <div className={styles.optionsContainer}>
                        <div>
                            {

                                poll.votingOptions.sort((a, b) => a.length - b.length).map((option, index) => {
                                    return (
                                        <button onClick={!voted ? setActive : () => { }} key={"option_" + index}>
                                            <p>{option}</p>
                                        </button>
                                    )
                                })
                            }
                            <div>
                                <button id='voteButton' disabled={!selected} onClick={vote}>{voted ? "Abgestimmt" : "Abstimmen"}</button>
                            </div>
                        </div>
                        </div>
                        :
                        <div className={styles.optionsEditContainer}>
                            <div>
                            {
                                poll.votingOptions.map((option, index) => {
                                    return (
                                        <div key={"option_" + index}>
                                            <input onInput={removeInvalidationStyle} type="text" defaultValue={option}></input>
                                            {
                                                poll.votingOptions.length > 2 &&
                                                <button onClick={()=>deleteOption(index)}>X</button>
                                            }
                                            
                                        </div>
                                    )
                                })
                            }
                            <button onClick={addOption}>+</button>
                            </div>
                        </div>
                }

                
                {
                    poll.user == mockUser.name &&
                
                        editMode ?
                        <div className={styles.buttonArray}>
                            <div>
                            <button className='btn btn-cancel' onClick={cancelEdit}>Cancel</button>
                            <button className='btn btn-primary' onClick={saveEdit}>Save</button>
                            </div>
                        </div>
                            :
                            <div className={styles.deleteButtonContainer}>
                                <div>
                                    <button className='btn btn-secondary' onClick={edit}>Edit</button>
                                    <button className='btn btn-danger' onClick={deletePoll}>Delete</button>
                                </div>
                            </div>
                            
                }
                

        </div>
    )
}