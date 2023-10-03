import { useState, useEffect, useRef, useContext } from 'react'
import Countdown from './Countdown';
import styles from '../styles/Assignment.module.scss'
import { useRouter } from 'next/router'
import Assignment from '../models/Assignment';
import Group from '../models/Group';
import Subject from '../models/Subject';
import UserContext from '../components/UserContext'

export default function AssignmentCard({ assignment,width = 50 }: { assignment: Assignment,width?:number }) {
    const router = useRouter();
    const [assignmentState, setAssignment] = useState(assignment);
    console.log(assignment);

    return (
        <div className={styles.assignmentcontainer} >
            <div style={{width: width+'%'}} className={styles.assignmentcard} onClick={() => router.push(`assignments/edit?assignmentId=${assignment.id}`)}>
                <div className={styles.assignmenthead}>
                    <p>{assignmentState.subject.name}</p>
                </div>
                <div className={styles.assignmentbody}>
                    <h1>{assignmentState.title}</h1>
                    <p>{assignmentState.description}</p>
                </div>
                <div className={styles.assignmentfoot}>
                    <Countdown date={assignmentState.due}></Countdown>
                </div>
            </div>
        </div>

    );
}