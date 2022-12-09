import { useState,useEffect } from 'react'
import Countdown from '../components/Countdown';
import File_Upload from '../components/file_upload';
import styles from '../styles/assignment.module.css';


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

        let acceptedFilesDummy = ["pdf","txt","png"];
        const [uploadedFiles,setUploadedFiles] = useState([]);
        const [instructonFiles,setInstructonFiles] = useState([]);
        let currFile = null;

        function handleInstructionFilesUpdate(list){
            setInstructonFiles([...instructonFiles,...list]);
        }

        function handleIUploadFilesUpdate(list){
            setUploadedFiles([...uploadedFiles,...list]);
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
                    {
                currUserDummy.name == assignmentDummy.creator.name ?
                    (
                        
                        <>
                        {console.log("sui")}
                        <button className={styles.description_editbtn}>
                            edit
                        </button>
                        </>
                    )
                    :
                    (
                        <>
                        {console.log("hui")}
                        </>
                    )
                }
                </div>
            </div>

            <div className={styles.fileListWrapper}>
                <div  className={styles.fileListContainer}>
                    <ul id='instructionFilesUl' className={styles.filelistitem} hidden>
                            {instructonFiles.map((file,i)=>{return <li key={i}>
                                <p>{file.name}</p>  
                        </li>})}
                    </ul>
                </div>
            </div>
            <File_Upload handleFilesUpdated={(instructonFiles) => handleInstructionFilesUpdate(instructonFiles)}></File_Upload>
            


            
            <File_Upload handleFilesUpdated={(instructonFiles) => handleIUploadFilesUpdate(instructonFiles)}></File_Upload>
            <div className={styles.fileListWrapper}>
                <div  className={styles.fileListContainer}>
                    <ul id='uploadFilesUl' className={styles.filelistitem} hidden>
                            {instructonFiles.map((file,i)=>{return <li key={i}>
                                <p>{file.name}</p>  
                        </li>})}
                    </ul>
                </div>
            </div>
            
            
            <div className={styles.editButton}>
                <button onClick={()=>alert("uploading " + fileslist.length + " file(s)")}>Edit</button>
            </div>
            
        </div>
        
        
    </>
    );
    
}