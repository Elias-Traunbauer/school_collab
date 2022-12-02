import { useState,useEffect } from 'react'
import styles from '../styles/assignment.module.css'

export default function Assignment(assignment){

    //mock
    assignment = {
        subject:"DBI",
        title: "JPA Lab 1: Generieren der IDs",
        time: new Date(2020, 5, 19, 25, 65)
    }
    
    const rechnen = new Date().getTime() - new Date(2020, 5, 19, 25, 45).getTime();
    const [datetime, setDateTime] = useState(rechnen);

    function formatDate(milliseconds) {
        let seconds = milliseconds/1000;
        let days = Math.floor(seconds/86400);
        seconds-= days*86400;
        let hours = Math.floor(seconds/3600);
        seconds -= hours*3600;
        let minutes = Math.floor(seconds/60);
        seconds -= minutes*60;

        return `${padTo2Digits(days)}d ${padTo2Digits(hours)}h ${padTo2Digits(minutes)}m ${padTo2Digits(
            seconds,
          )}s`;

    }

    function padTo2Digits(num) {
        return num.toString().padStart(2, '0');
    }



    useEffect(()=>{
        //setDatetime(assignment.time)
        const id = setInterval(() => {
            if(Math.floor(datetime/1000) != 0)
            setDateTime(datetime-1000);

        }, 1000);
        return () => {
            clearInterval(id);
        }
    },[datetime]);


   
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
                            formatDate(datetime.toString())
                        }
                    </p>
                </div>
            </div>
        </div>
        
    );
}