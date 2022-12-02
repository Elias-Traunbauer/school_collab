import { useState,useEffect } from 'react'
import styles from '../styles/assignment.module.css'

export default function Assignment(){

    //mock
    let assignmentDummy = {
        subject: "DBI",
        title: "JPA Lab 1: Generieren der IDs",
        deadline: new Date(2023, 1, 22, 13, 40)
    }

    let assignmentStart = {
        subject: "...",
        title: "...",
        deadline: new Date()
    }
    
    const [assignment, setAssignment] = useState(assignmentStart);
    const [datetime, setDateTime] = useState(0);

    function formatDate(seconds) {
        
        const days = Math.floor(seconds / (3600 * 24));
        seconds -= days * 3600 * 24;
        const hrs = Math.floor(seconds / 3600);
        seconds -= hrs * 3600;
        const mnts = Math.floor(seconds / 60);
        seconds -= mnts * 60;

        return days + " Tage " + hrs + " Stunden " + mnts + " Minuten " + Math.floor(seconds) + " Sekunden";

    }

    useEffect(()=>{
        let interval = setInterval(() => {
            if(Math.floor(datetime/1000) > 0)
            {
                setDateTime(datetime-1000);
            }
        }, 1000);
        return () => {
            
        }
    }, []);

    useEffect(()=>{
        setTimeout(() => {
            setAssignment(assignmentDummy);
            setDateTime((new Date().getTime() - assignment.deadline.getTime()) / 1000);
        }, 100);
    }, []);
   
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
                    <p>
                        {
                            formatDate(datetime/1000)
                        }
                    </p>
                </div>
            </div>
        </div>
        
    );
}