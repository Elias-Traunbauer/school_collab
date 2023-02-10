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
            if (iterator.value > max)
                max = iterator.value;
        }

        const step = max/5;
        let cnt = max;
        for (let i = 0; i < 4; i++) {
            steps.push(cnt);
            cnt -= step;
        }

        return steps;
    }

    function calcPercent(value){
        let max = 0;
        for (const iterator of chartData) {
            if (iterator.value > max)
                max = iterator.value;
        }

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
            value: 20,
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

    return(
        <div className={styles.wrapper}>
            <button onClick={() => changevalues()}>change</button>
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
                        height: calcPercent(chartData.value) + 'rem',
                        backgroundColor: chartData.backgroundColor,
                        border: '3px solid ' + chartData.borderColor,
                        borderBottom: 'none',
                    }
                    return(
                        <div className={styles.chart} key={index}>
                            <div data-value={chartData.value + " " + chartData.name} className={styles.chartElement} style={designData}></div>
                        </div>
                    )
                })}            
            </div>
        </div> 
    );
}