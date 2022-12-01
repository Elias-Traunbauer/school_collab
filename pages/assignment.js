import { useState } from 'react'
import styles from '../styles/assignment.module.css'
import { useEffect } from 'react';

export default function Assignment(assignment){

    assignment = {
        subject:"AM",
        title: "Hello",
        time: new Date()
    }
    console.log(assignment.time)
    return(
        
        <div className={styles.assignmentcontainer}>
            <div className={styles.assignmentcard}>
                <div className={styles.assignmenthead}>
                    <p>{assignment.subject}</p>
                </div>
                <div className={styles.assignmentbody}>
                    <h2>{assignment.title}</h2>
                </div>
                <div className={styles.assignmentfoot}>
                    <p>{assignment.time.getHours()+ ":" + assignment.time.getMinutes() +":" + assignment.time.getSeconds()}</p>
                </div>
            </div>
        </div>
        
    );
}