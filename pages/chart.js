import styles from '../styles/chart.module.css';
import { useState,useEffect } from 'react'

export default function Chart(){
    const[chartData, setChartData] = useState([{
        name: 'tedadsadst',
        value: 10,
        color: 'red',
        backgroundColor: 'red',
    },
    {
        name: 'tdadsadadasdest',
        value: 3,
        color: 'blue',
        backgroundColor: 'blue',
    },
    {
        name: 'tedadsadsadast',
        value: 20,
        color: 'green',
        backgroundColor: 'green',
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
        for (let i = 0; i < 5; i++) {
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
            color: 'red',
            backgroundColor: 'red',
        },
        {
            name: 'test',
            value: 5,
            color: 'blue',
            backgroundColor: 'blue',
        },
        {
            name: 'test',
            value: 30,
            color: 'green',
            backgroundColor: 'green',
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
                </div>
            </div>
            {
                chartData.map((chartData, index) => {
                    const designData = {
                        height: calcPercent(chartData.value) + 'rem',
                        backgroundColor: chartData.backgroundColor,
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