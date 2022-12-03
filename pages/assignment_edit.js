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
            const dropArea = document.querySelectorAll(`.${styles.fileinput}`);
            console.log(dropArea)
            dropArea.addEventListener("dragover",handleDragOver);
            dropArea.addEventListener("dragleave",handleDragLeave);
            dropArea.addEventListener("drop",handleDrop);

        });

        function handleDragOver(e){
            e.preventDefault();
            dropArea.classList.add(styles.activedrag)
        }

        function handleDragLeave(e){
            e.preventDefault();
            dropArea.classList.remove(styles.activedrag)
        }

        function handleDrop(e){
            e.preventDefault();
            let file = e.dataTransfer.files[0];
            console.log(file);
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

            <div className={styles.uploadfieldcontainer}>
                <div className={styles.wrapper}>
                    <header>File Uploader JavaScript</header>
                        <div id='fileinput' className={styles.fileinput} type="file" name="file">

                        </div>
                    <section className={styles.progressarea}></section>
                    <section className={styles.uploadedarea}></section>
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