import { useState,useEffect, useRef } from 'react'
import Countdown from '../components/Countdown';
import styles from '../styles/assignment.module.css'

export default function AssignmentEdit({assignment}){

        //mock
        let assignmentDummy = {
            subject: "DBI",
            title: "JPA Lab 1: Generieren der IDs",
            deadline: new Date(2023, 1, 22, 13, 40),
            set: true,
            description: "dsasdasdadsadsad"
        }

        useEffect(() => {
            const fileupload = document.getElementById("fileuploadfield");
            fileupload.addEventListener("drop",handleOnDrop());
        });

        function handleOnDrop(e){
            e.preve
        }

    return(
        <div className={styles.editcontainer}>
            <div className={styles.edithead}>
                <h1>{assignmentDummy.title}</h1>
                <Countdown date={assignmentDummy.deadline}></Countdown>
            </div>
            <div className={styles.descriptioncontainer}>
                <div className={styles.description}>
                    <p>{assignmentDummy.description}</p>
                </div>
            </div>
            <div className={styles.fileuploadcontainer}>
                <div id="fileuploadfield" className={styles.fileuploadfield}>
                    <label>Drag and Drop</label>
                    <button>Choose File</button>
                </div>
                
            </div>
            <div className={styles.fileslist}>
                <button>file1</button>
                <button>file1</button>
                <button>file1</button>
            </div>
            <div className={styles.editButton}>
                <button>Edit</button>
            </div>
        </div>
    );
    
}