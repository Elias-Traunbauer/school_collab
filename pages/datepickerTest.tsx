import react from 'react'
import Datepicker from '../components/Datepicker'
import React from 'react'
import styles from '../styles/Datetimepicker.module.css'
export default function DatepickerTest() {

    function nothing(e) {
        console.log(e);
    }
    return (
        <div className={styles.datepickerTestingContainer}>
            <Datepicker inputChanged={nothing} ></Datepicker>
        </div>        
    )
}