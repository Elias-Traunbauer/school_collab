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

        const form = document.querySelector("form"),
        fileInput = document.querySelector(".fileinput"),
        progressArea = document.querySelector(".progressarea"),
        uploadedArea = document.querySelector(".uploadedarea");
        form.addEventListener("click", () =>{
            fileInput.click();
        });

        fileInput.onchange = ({target})=>{
        let file = target.files[0];
        if(file){
            let fileName = file.name;
            if(fileName.length >= 12){
            let splitName = fileName.split('.');
            fileName = splitName[0].substring(0, 13) + "... ." + splitName[1];
            }
            uploadFile(fileName);
        }
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
                <form>
                <input className={styles.fileinput} type="file" name="file" hidden></input>
                    <i class="fas fa-cloud-upload-alt"></i>
                    <p>Browse File to Upload</p>
                    </form>
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