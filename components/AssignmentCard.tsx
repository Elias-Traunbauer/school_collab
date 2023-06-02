import { useState, useEffect, useRef } from 'react'
import Countdown from './Countdown';
import styles from '../styles/Assignment.module.scss'
import { useRouter } from 'next/router'

export default function Assignment({ assignment = { subject: "DBI", title: "JPA Lab 1: Generieren der IDs", deadline: new Date(2023, 1, 22, 13, 40), set: true} }) {
    const router = useRouter();

    let assignmentStart = {
        subject: "...",
        title: "...",
        deadline: new Date(),
        set: false
    }
    const [assignmentState, setAssignment] = useState(assignmentStart);

    useEffect(() => {
        setTimeout(() => {
            if (!assignmentState.set) {
                setAssignment(assignment);
            }
        }, 300);
    });

    return (
        <div className={styles.assignmentcontainer} >
            <div className={styles.assignmentcard} onClick={() => router.push("/assignments/edit?assignmentId=1")}>
                <div className={styles.assignmenthead}>
                    <p>{assignmentState.subject}</p>
                </div>
                <div className={styles.assignmentbody}>
                    <h2>{assignmentState.title}</h2>
                </div>
                <div className={styles.assignmentfoot}>
                    <Countdown date={new Date(assignmentState.deadline)}></Countdown>
                </div>
            </div>
        </div>

    );
}