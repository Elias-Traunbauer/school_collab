import Link from 'next/link'
import Wizard from '../components/Wizard'
import styles from '../styles/WizardTest.module.css'
import React from 'react';
import { WizardField } from '../components/models/WizardField';
export default function WzTest() {
    function callback(data:WizardField[][], setLoadingText, finishLoading){
        console.log(data);
        setLoadingText("Penis...");
        setTimeout(() => {
            finishLoading();
            setLoadingText("done!");
        }, 2000);
    };

    return (
        <div className={styles.container}>
            <Wizard title='Test' callback={callback}></Wizard>
        </div>
        
    );

}