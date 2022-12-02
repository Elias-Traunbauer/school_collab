import styles from '../styles/assignment.module.css'
import { useState,useEffect } from 'react'
import AssignmentCard from './assignment_card';

export default function Assignments(){

    const [assignmentData,setAssignmentData] = useState([])

    useEffect(()=>{
        (async () => {
            const data = await fetch("/api/assignments.php");
            const json = await data.json();
            setAssignmentData(json.data);
            
        })();

    },[assignmentData]);

    return(
        <div className={styles.assignmentcontainer}>
            {
                assignmentData.map((element, i) => {
                    return <AssignmentCard key={i}></AssignmentCard>
                })
            }
        </div>
    );
}
