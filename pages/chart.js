import styles from '../styles/chart.module.css';
import { useState,useEffect } from 'react'

export default function Chart(){
    const[chartData, setChartData] = useState([{
        name: 'tedadsadst',
        value: 10,
        backgroundColor: 'rgba(255, 0, 0, 0.6)',
        borderColor: 'rgba(255, 0, 0)',
    },
    {
        name: 'tdadsadadasdest',
        value: 3,
        backgroundColor: 'rgba(0, 0, 255, 0.6)',
        borderColor: 'rgba(0, 0, 255)',
    },
    {
        name: 'tedadsadsadast',
        value: 20,
        backgroundColor: 'rgba(0,255, 0, 0.6)',
        borderColor: 'rgba(0,255, 0)',
    }]);


    useEffect(() => {
    }, [chartData]);

    function displayScale(){
        let max = 0;
        const steps = [];
        for (const iterator of chartData) {
            max += iterator.value;
        }

        const step = max/5;
        let cnt = max;
        for (let i = 0; i < 4; i++) {
            steps.push(Math.round(cnt));
            cnt -= step;
        }

        return steps;
    }

    function calcHeight(value){
        let max = calcMaxValue();

        if (max <= 20)
        return (20*(value / max));

        return value * 20/max;
    }

    function changevalues(){
        const newChardata = [{
            name: 'test',
            value: 1,
            backgroundColor: 'rgba(255, 0, 0, 0.5)',
            borderColor: 'rgba(255, 0, 0)',
        },
        {
            name: 'test',
            value: 10,
            backgroundColor: 'rgba(0, 0, 255, 0.5)',
            borderColor: 'rgba(0, 0, 255)',
        },
        {
            name: 'test',
            value: 30,
            backgroundColor: 'rgba(0,255, 0, 0.5)',
            borderColor: 'rgba(0,255, 0)',
        }];
        setChartData(newChardata);
    }

    function getValueInPersentage(value){
        let sum = calcMaxValue();

        return parseFloat(value * 100/sum).toFixed(2);
    }

    function  calcMaxValue(){
        let sum = 0;
        for (const iterator of chartData) {
            sum += iterator.value;
        }
        return sum;
    }

    return(
        <div className={styles.wrapper}>
            <div className={styles.chartContainer}>
            <div className={styles.chartScale}>
                <div className={styles.verticalLine}></div>
                <div className={styles.horizontalLines}>
                    {
                        displayScale().map((item, index) => {
                            return(
                                <div key={index} className={styles.horizontalLine}>
                                    <div className={styles.horizontalLineText}>
                                        <p>{item}</p>
                                    </div>
                                </div>
                            )
                        })
                    }
                    <div className={styles.horizontalLine}>
                            <div className={styles.horizontalLineText}>
                            </div>
                    </div>
                </div>
            </div>
            {
                chartData.map((chartData, index) => {
                    const designData = {
                        height: calcHeight(chartData.value) + 'rem',
                        backgroundColor: chartData.backgroundColor,
                        border: '3px solid ' + chartData.borderColor,
                        borderBottom: 'none',
                    }
                    return(
                        <div className={styles.chart} key={index}>
                            <div data-value={chartData.value + " (" + getValueInPersentage(chartData.value) + "%)"} className={styles.chartElement} style={designData}></div>
                        </div>
                    )
                })}            
            </div>
            <button className={styles.changeBtn} onClick={() => changevalues()}>change</button>
        </div> 
    );
}