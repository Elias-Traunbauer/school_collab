import { useState,useEffect } from 'react'
import Countdown from './Countdown';
import styles from '../styles/assignment.module.css'
import { useRouter } from 'next/router'

export default function Assignment({assignment}){

    const router = useRouter();

    let assignmentStart = {
        subject: "...",
        title: "...",
        deadline: new Date(),
        set: false
    }
    
    const [assignmentState, setAssignment] = useState(assignmentStart);

    useEffect(()=>{
        setTimeout(() => {
            if (!assignmentState.set) {
                setAssignment(assignment);
            }
        }, 300);
    });

    return(
        
        <div className={styles.assignmentcontainer} onClick={()=>router.push("./assignment_edit?assignmentId=1")}>
            <div className={styles.assignmentcard}>
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