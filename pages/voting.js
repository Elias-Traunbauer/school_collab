import styles from '../styles/Voting.module.css';
import React, { useState, useEffect } from 'react';
import Chart from 'chart.js/auto';

export default function Voting({ VoteId }) {
    //Mock
    const user = {
        name: "thomas"
    }

    const creator = {
        name: "thomas"
    }

    const data = {
        question: "frage",
        answers: ["ja", "nein"],
        countOfMaxAnswers: 1,
        countOfMinAnswers: 1,
        chartlabels: ["Ja", "Nein"],
        chartData: [1, 0],
        chartColors: ["#3e95cd", "#8e5ea2", "#3cba9f", "#e8c3b9", "#c45850"]
    }

    const [votes, setVotes] = useState(data.chartData);
    const [votingIndices, setvotingIndices] = useState([]);
    let [chart, setChart] = useState();

    useEffect(() => {
        if (!chart) {
            const canvas = document.getElementById('votingChart');
            let tmpChart = new Chart(canvas, {
                type: 'pie',
                data: {
                    labels: data.chartlabels,
                    datasets: [{
                        label: "Votes",
                        backgroundColor: data.chartColors,
                        data: votes,
                        borderWidth: 2
                    }]
                },
                options: {
                    plugins: {
                        legend: {
                            display: false
                        }
                    },
                    title: {
                        display: false,
                        text: 'Results'
                    },
                    circleAroundPieDoughnut: {
                        width: 2, // Width of the border, defaults to 1
                        color: 'white' // Color of the border, defaults to black
                    }
                },

            });
            chart = tmpChart;
            setChart(tmpChart);
        }

        chart.data.datasets[0].data = votes;

        if (votes.includes(0))
            chart.data.datasets[0].borderWidth = 0;
        else
            chart.data.datasets[0].borderWidth = 2;

        chart.update();
    });

    function finishVote() {
        document.getElementById('voteBtn').classList.add(styles.disabeld);
        document.querySelector('.' + styles.votingContentContainer + " ul").classList.add(styles.invisible);
    }

    function selectItem(e, key) {
        let index = 0
        let removedObj = 0;

        for (const i of votingIndices) {
            votes[i]--
        }

        if (votingIndices.includes(key)) {
            e.target.classList.remove(styles.activeAnswer);
            index = votingIndices.indexOf(key);
            removedObj = votingIndices.splice(index, 1);
        }
        else {
            if (votingIndices.length == data.countOfMaxAnswers)
                RemoveAtIndex(votingIndices.shift());

            e.target.classList.add(styles.activeAnswer);
            votingIndices.push(key);
        }

        console.log(key)
        if (votingIndices.length >= data.countOfMinAnswers)
            document.getElementById('voteBtn').classList.remove(styles.disabeld);

        for (const i of votingIndices) {
            votes[i]++
        }

        setVotes([...votes]);
    }

    function RemoveAtIndex(index) {
        const activeAnswers = document.querySelectorAll("." + styles.votingContentContainer + " ul li");
        activeAnswers[index].classList.remove(styles.activeAnswer);
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.votingContainer}>
                <div className={styles.heading}><h1>{data.question}</h1></div>
                <div className={styles.votingContentContainer}>
                    <ul>
                        {
                            data.answers.map((element, i) => {
                                return <li onClick={(e) => selectItem(e, i)} key={i}>{element}</li>
                            })
                        }
                    </ul>
                    <div className={styles.chartContainer}>
                        <canvas id='votingChart'></canvas>
                    </div>
                </div>
                <div className={styles.buttonArray}>
                    <button>Cancel</button>
                    <button id='voteBtn' onClick={finishVote} className={styles.disabeld}>Vote</button>
                </div>
            </div>
        </div>
    );
}