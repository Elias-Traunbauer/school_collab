import React, { useEffect, useRef, useState } from 'react';
import styles from '../../../styles/PollDetail.module.scss';
import Countdown from '../../../components/Countdown';
import MarkdownEditor from '../../../components/MarkdownEditor';
import { ChartData, ChartOptions } from 'chart.js';
import Chart from 'chart.js/auto';
import { useRouter } from 'next/router';
import Datepicker from '../../../components/Datepicker';
import Poll from '../../../models/Poll';
import PollOption from '../../../models/PollOption';
import User from '../../../models/User';
import { getUser } from '../../../services/User.service';
import { executeVote, getPollById, updatePoll } from '../../../services/Poll.service';
import { exec } from 'child_process';

export default function PollDetail() {


    const colors :string[]=[
        //20 hex colors for a pie chart
        '#FF6633', '#FFB399', '#FF33FF', '#FFFF99', '#00B3E6',
        '#E6B333', '#3366E6', '#999966', '#99FF99', '#B34D4D',
        '#80B300', '#809900', '#E6B3B3', '#6680B3', '#66991A',
        '#FF99E6', '#CCFF1A', '#FF1A66', '#E6331A', '#33FFCC'
    ] 

    const [poll, setPoll] = useState<Poll>();
    const chartRef = useRef(null);
    const router = useRouter();
    const [selected, setSelected] = useState(false);
    const [voted, setVoted] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [backupPoll, setBackupPoll] = useState<Poll>();
    const [editedDate, setEditedDate] = useState(new Date());
    const [isNoEndDate, setIsNoEndDate] = useState<boolean>();
    const [ownUser, setOwnUser] = useState<User>();
    const pollId = router.query.id;
    const [selectedOption, setSelectedOption] = useState<number>();


    useEffect(() => {

        getUser().then((res) => {
            setOwnUser(res);
        });
        
        const pollIdAsNumber = parseInt(pollId as string);
        if (isNaN(pollIdAsNumber)) {
            return;
        }

        console.log("PARAM", pollIdAsNumber);

        getPollById(pollIdAsNumber).then((res) => {
            setPoll(res);
        });

        if (poll&&poll.due < new Date()) {
            loadChart();
            setVoted(true);
        }

        // mby ein Service der alle paar sekunden das Voting updated und dann die Daten neu lädt
    }, [pollId]);

    async function loadChart(){
        if (!chartRef.current) {
            chartRef.current = document.getElementById('Chart');
            console.log('no chart ref');
            return;
        }

        const ctx = chartRef.current.getContext('2d');
        const result:Poll = await getPollById(poll.id);
        console.log(result);
        const tmpBackgroundColors = [];
        const tmpBorderColors = [];
        const tmpData = [];
        const tmpLabels = [];
        for (let i = 0; i < poll.pollOptions.length; i++) {
            tmpData.push(result.pollOptions[i].votes);
            tmpLabels.push(result.pollOptions[i].name);
        
            if (i >= colors.length) {
                const randomColor = Math.floor(Math.random() * 16777215).toString(16);
                tmpBackgroundColors.push('#' + randomColor);
                tmpBorderColors.push('#FFFFFF');
                //tmpBorderColors.push('#' + randomColor);
            }
            else {
                tmpBackgroundColors.push(colors[i]);
                tmpBorderColors.push('#FFFFFF');
                //tmpBorderColors.push(colors[i]);
            }
        }

        const data: ChartData = {
            labels: tmpLabels,
            datasets: [{
                label: 'Votes',
                data: tmpData,
                backgroundColor: tmpBackgroundColors,
                borderColor: tmpBorderColors,
                borderWidth: 1
            }]
        };

        console.log(data);
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
        //Error: Canvas is already in use. Chart with ID '2' must be destroyed before the canvas with ID 'Chart' can be reused.
        if(Chart.getChart(chartRef.current)){
            Chart.getChart(chartRef.current).destroy();
        }
        const chart = new Chart(ctx, {
            type: 'pie',
            data: data,
            options: options
        });
    }

    function setActive(e,option:PollOption) {
        if (e.target.classList.contains(styles.active)) {
            console.log('remove active');
            e.target.classList.remove(styles.active);
            setSelected(false);
            setSelectedOption(null);
        } else {
            const options = document.querySelectorAll('.' + styles.container + ' div:last-child button');
            options.forEach((option) => {
                option.classList.remove(styles.active);
            });
            e.target.classList.add(styles.active);
            setSelected(true);
            setSelectedOption(option.id);
        }
    }

    function removeInvalidationStyle(e){
        e.target.classList.remove(styles.invalid);
    }

    useEffect(() => {
        if (voted) {
            loadChart();
        }
    }, [voted,editMode]);

    function vote() {
        setVoted(true);
        if(poll.due < new Date()){
            return;
        }

        const voteButton = document.getElementById('voteButton');
        voteButton.setAttribute('disabled', 'true');
        const chart = document.getElementById('Chart');

        //TODO: send vote to backend
        if(selectedOption){
            executeVote(selectedOption);
        }
        //delay scroll to bottom
        setTimeout(() => {
            chart.scrollIntoView({ behavior: 'smooth' });
        }, 100);

        

    }

    function backToList() {
        router.push('/polls');
    }

    function deleteOption(index:number) {
        poll.pollOptions.splice(index, 1);
        setPoll({...poll});
    }
    function addOption() {
        //Trauni:Endpoint für neue Optionen
        const newOption :PollOption = {
            name: '',
            pollId: poll.id,
            votes: 0,
            id: 0,
            version: ''
        }
        poll.pollOptions.push(newOption);
        setPoll({...poll});

        updatePoll(poll);
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
            poll.due = null;
        }
        else{
            poll.due = editedDate;
        }
        poll.pollOptions = validOptions;
        poll.title = titleInput.value;
        //TODO: update Poll
        setPoll({...poll});
        setEditMode(false);
        updatePoll(poll);
    }

    function edit() {
        setBackupPoll({...poll});
        setEditMode(true);
    }

    function cancelEdit() {
        if(backupPoll.due === null){
            setIsNoEndDate(true);
        }
        else{
            setIsNoEndDate(false);
        }
        setEditedDate(backupPoll.due);
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
                        <h1>{poll&&poll.title}</h1>
                }

            </div>

            <div>
                <div>
                    {
                        !editMode ?
                        poll&&poll.due == null ?
                            ""
                            :
                            poll&&poll.due < new Date() ?
                                <p>Abstimmung beendet!</p>
                                :
                                <>
                                    <p>Endet in &nbsp;</p>
                                    <Countdown date={poll&&poll.due}></Countdown>
                                </>
                            :
                            <div className={styles.dateContainer}>
                                <div>
                                    <Datepicker dateParam={poll&&poll.due} inputChanged={changeDate} ></Datepicker>
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
                        <MarkdownEditor defaultText={poll&&poll.description} containerWidth={100} isEditable={editMode}></MarkdownEditor>
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

                    poll&&poll.pollOptions.map((option, index) => {
                                    return (
                                        <button onClick={!voted ? (e)=>setActive(e,option) : () => { }} key={"option_" + option.id}>
                                            <p>{option.name}</p>
                                        </button>
                                    )
                                })
                            }
                            <div>
                                <button id='voteButton' disabled={!selected&&voted} onClick={vote}>{voted ? "Abgestimmt" : "Abstimmen"}</button>
                            </div>
                        </div>
                        </div>
                        :
                        <div className={styles.optionsEditContainer}>
                            <div>
                            {
                                poll&&poll.pollOptions.map((option, index) => {
                                    return (
                                        <div key={"option_" + index}>
                                            <input onInput={removeInvalidationStyle} type="text" defaultValue={option.name}></input>
                                            {
                                                poll.pollOptions.length > 2 &&
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
                     poll&&ownUser&&poll.creatorUserId == ownUser.id && 
                        editMode ?
                        <div className={styles.buttonArray}>
                            <div>
                            <button className='btn btn-danger' onClick={deletePoll}>Delete</button>
                            <button className='btn btn-cancel' onClick={cancelEdit}>Cancel</button>
                            <button className='btn btn-primary' onClick={saveEdit}>Save</button>
                            </div>
                        </div>
                            :
                            <div className={styles.deleteButtonContainer}>
                                <div>
                                    <button className='btn btn-secondary' onClick={edit}>Edit</button>
                                    
                                </div>
                            </div>
                            
                }
                

        </div>
    )
}