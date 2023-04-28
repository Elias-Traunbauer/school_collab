import styles from '../styles/NewAssignmentCard.module.css';
import { useState, useEffect, useRef } from 'react';
import Countdown from './Countdown';

export default function NewAssignmentCard({ assignment = { subject: "DBI", title: "JPA Lab 1: Generieren der IDs", deadline: new Date(2023, 1, 22, 13, 40), set: true ,subjectCode: "DBI"} }){
    
    let assignmentStart = {
        subject: "...",
        title: "...",
        deadline: new Date(),
        set: false,
        subjectCode: "DBI"
    }

    const [assignmentState, setAssignment] = useState(assignmentStart);

    useEffect(() => {
        setTimeout(() => {
            if (!assignmentState.set) {
                setAssignment(assignment);
            }
        }, 300);
    });
    function getTitle(){
        if (assignmentState.title.length > 20){
            return assignmentState.title.slice(0, 20) + "...";
        } else {
            return assignmentState.title;
        }
    }

    
    return(
        <div className={styles.assignmentcontainer} /*onClick={() => router.push("./assignment_edit?assignmentId=1")}*/>
            <div className={styles.hoverEffect}></div>
            <div>
                <div className={styles.assignmenthead}>
                    <p>{assignmentState.subjectCode}</p>
                </div>
                <div className={styles.assignmentbody}>
                    <div>
                        <h2>{getTitle()}</h2>
                    </div>
                </div>
                <div className={styles.assignmentfoot}>
                    <Countdown date={new Date(assignmentState.deadline)}></Countdown>
                </div>
            </div>
        </div>
    );
}