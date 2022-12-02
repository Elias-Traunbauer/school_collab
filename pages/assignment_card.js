import { useState,useEffect, useRef } from 'react'
import Countdown from '../components/Countdown';
import styles from '../styles/assignment.module.css'

export default function Assignment(){

    //mock
    let assignmentDummy = {
        subject: "DBI",
        title: "JPA Lab 1: Generieren der IDs",
        deadline: new Date(2023, 1, 22, 13, 40),
        set: true
    }

    let assignmentStart = {
        subject: "...",
        title: "...",
        deadline: new Date(),
        set: false
    }
    
    const [assignment, setAssignment] = useState(assignmentStart);

    useEffect(()=>{
        setTimeout(() => {
            if (!assignment.set) {
                setAssignment(assignmentDummy);
            }
        }, 1000);
    });

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
                    <Countdown date={assignment.deadline}></Countdown>
                </div>
            </div>
        </div>
        
    );
}