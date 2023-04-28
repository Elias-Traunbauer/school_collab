import Link from 'next/link'
import Wizard from '../components/Wizard'
import styles from '../styles/WizardTest.module.css'
import React from 'react';
import { WizardField } from '../models/WizardField';
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
            <Wizard title='Test' callback={callback}></Wizard>
    );

}