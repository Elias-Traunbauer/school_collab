import { useState,useEffect } from 'react'
import Countdown from '../components/Countdown';
import File_Upload from '../components/file_upload';
import styles from '../styles/assignment.module.css';
import Image from 'next/image';


export default function AssignmentEdit({assignment,acceptedFilextentions,uploaded,instriction}){

        //mock
        let assignmentDummy = {
            subject: "DBI",
            title: "JPA Lab 1: Generieren der IDs",
            deadline: new Date(2023, 1, 22, 13, 40),
            set: true,
            description: "dsasdasdadsadsad",
            creator: {
                name:"pfreyteaching",
            }
        }
        
        const currUserDummy = {
            name:"pfreyteaching",
        }

        const [uploadFiles,setUploadFiles] = useState([]);
        let deliting = false;

        function handleInstructionFilesUpdate(list){
            setUploadFiles([...uploadFiles,...list]);
        }

        function deleteItem(e,file,key){
            e.preventDefault();
            deliting = true;
            const tmpList = [];
            const parent = e.target.parentElement;
            parent.classList.add(styles.filelistitem_close);

            for (let i = 0; i < uploadFiles.length; i++) {
                if(i != key)
                tmpList.push(uploadFiles[i]);
            }
            
            
            //animation
            setTimeout(() => {
                parent.classList.remove(styles.filelistitem_close);
                setUploadFiles(tmpList);
                deliting = false;
            }, 250)
        }

        let currFileKey = -1;

        function openDialog(file,key){
            if(deliting)
            return;
            currFileKey = key;
            const dialog = document.getElementById('dialog');
            let inputs = document.querySelectorAll(`.${styles.dialogwindow} input`)
            inputs[0].value = file.name;
            dialog.classList.add(styles.opendialog);

            dialog.showModal();
            setTimeout(() => {
                dialog.classList.remove(styles.opendialog);
            }, 300)
        }

        function closeDialog(e){
            const dialog = document.getElementById('dialog');
            dialog.close();
            
        }
        

    return(
        <>
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
            <File_Upload handleFilesUpdated={(uploadFiles) => handleInstructionFilesUpdate(uploadFiles)}></File_Upload>
            <div className={styles.fileListWrapper}>
                <div  className={styles.fileListContainer}>

                    {uploadFiles.length > 0 ? (<>
                        <ul id='uploadFilesUl' className={styles.filelistitem} hidden>
                            {uploadFiles.map((file,i)=>{return <li onClick={() => openDialog(file,i)} key={i}>
                                <p>{file.name}</p>
                                <Image onClick={(e) => deleteItem(e,file,i)} className={styles.cancelbutton} src={"/cancelicon.svg"} width={20} height={20} alt="cancel"></Image>
                        </li>})}
                    </ul>
                    </>) : (<></>)}
                    
                </div>
            </div>
            
            
            <div className={styles.editButton}>
                <button onClick={()=>alert("uploading " + uploadFiles.length + " file(s)")}>Save</button>
            </div>
            
        </div>
        <dialog id='dialog' className={styles.dialogwindow}>
            <div>
                <label>Name</label>
                <input placeholder='name'></input>
                <input></input>
            </div>
            <button onClick={closeDialog}>Save</button>
        </dialog>
        
    </>
    );
    
}