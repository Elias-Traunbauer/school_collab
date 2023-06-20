import { useState, useEffect, useRef, useContext } from 'react'
import Countdown from './Countdown';
import styles from '../styles/Assignment.module.scss'
import { useRouter } from 'next/router'
import Assignment from '../models/Assignment';
import Group from '../models/Group';
import Subject from '../models/Subject';
import UserContext from '../components/UserContext'

export default function AssignmentCard({ assignment }: { assignment: Assignment }) {
    const router = useRouter();
    const [assignmentState, setAssignment] = useState(assignment);

    return (
        <div className={styles.assignmentcontainer} >
            <div className={styles.assignmentcard} onClick={() => router.push("/assignments/edit?assignmentId=1")}>
                <div className={styles.assignmenthead}>
                    <p>{assignmentState.subject.name}</p>
                </div>
                <div className={styles.assignmentbody}>
                    <h2>{assignmentState.title}</h2>
                </div>
                <div className={styles.assignmentfoot}>
                    <Countdown date={assignmentState.due}></Countdown>
                </div>
            </div>
        </div>

    );
}