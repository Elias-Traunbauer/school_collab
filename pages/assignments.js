import styles from '../styles/assignment.module.css'
import { useState,useEffect } from 'react'
import AssignmentCard from '../components/assignment_card';

export default function Assignments(){

    const [assignmentData,setAssignmentData] = useState([])

    useEffect(()=>{
        (async () => {
            const data = await fetch("/api/assignments");
            const json = await data.json();
            setAssignmentData(json.data);
        })();

    },[]);

    return(
        <div className={styles.assignmentcontainer}>
            <Image className={styles.cancelbutton} src={"/cancelicon.svg"} width={20} height={20} alt="cancel"></Image>
            {
                assignmentData.map((element, i) => {
                    return <AssignmentCard key={i} assignment={element}></AssignmentCard>
                })
            }
        </div>
    );
}
