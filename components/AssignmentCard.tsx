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
    const subject = router.query.subjectId;

    return (
        <div className={styles.assignmentcontainer} >
            <div className={styles.assignmentcard} onClick={() => router.push(`/assignments/${subject}/${assignment.id}`)}>
                <div className={styles.assignmenthead}>
                    <p>{assignmentState&&assignmentState.subject&&assignmentState.subject.name}</p>
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