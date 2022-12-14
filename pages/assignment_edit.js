import { useState,useEffect } from 'react'
import Countdown from '../components/Countdown';
import File_Upload from '../components/file_upload';
import styles from '../styles/assignment.module.css';
import Image from 'next/image';
import { useRouter } from 'next/router'




export default function AssignmentEdit({assignmentParam,acceptedFilextentionsParam,uploaded,instruction}){

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

        const instructionDummy = ["Test1", "test 2", "test 3"];

        const [uploadFiles,setUploadFiles] = useState([]);
        const [instrictionFiles,setInstrictionFiles] = useState([]);
        const [edditMode,setEdditMode] = useState(false);
        const [assignment,setAssignment] = useState(assignmentDummy);
        const [acceptedFilextentions,setAcceptedFilextentions] = useState([]);
        let deleting = false;
        const router = useRouter()

        function handleUploadFilesUpdate(list){
            setUploadFiles([...uploadFiles,...list]);
        }
        function handleInstructionFilesUpdate(list){
            setInstrictionFiles([...instrictionFiles,...list]);
        }

        function deleteItem(e,file,key){
            e.preventDefault();
            deleting = true;
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
                deleting = false;
            }, 250)
        }

        let currFileKey = -1;

        function openDialog(file,key){
            if(deleting)
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

        function closeDialog(){
            const name = document.getElementById('dialogItemName');
            const tmpArr = uploadFiles;
            let i = 0;
            tmpArr[currFileKey] = new File([tmpArr[currFileKey]],name.value);
            setUploadFiles(tmpArr);
            dialog.close();
        }
        
    return(
        <>
        <div className={styles.editcontainer}>
            <div className={styles.edithead}>
                <h1>{assignment.title}</h1>
                <Countdown date={assignment.deadline}></Countdown>
            </div>
            {
                assignment.creator.name == currUserDummy.name ? 
                (<>
                    <button onClick={()=>setEdditMode(true)}>Edit</button>
                    <button onClick={()=>setEdditMode(false)}>Save</button>
                </>
                ):(<></>)
            }
            
            <div className={styles.descriptioncontainer}>
                <div className={styles.description}>

                    {
                        edditMode ?
                        (
                            <input defaultValue={assignment.description} onChange={(e) => {assignment.description = e.target.value}}></input>
                        ) : 
                        (
                            <p>{assignment.description}</p>
                        )
                    }
                    {
                        instrictionFiles.length>0 ?
                        (
                        <>
                            <section className={styles.descriptionSection}></section>
                            <div className={styles.instrictionfileContainer}>
                                <ul className={styles.filelistitem}>
                                    {instrictionFiles.map((file,i) => {
                                        return <li key={i}>{file.name}</li>
                                    })}
                                </ul>
                            </div>
                        </>)
                        :
                        (<></>)
                    }
                    
                   
                </div>
            </div>

            <File_Upload acceptedFiles={acceptedFilextentions} handleFilesUpdated={edditMode?(instrictionFiles) => handleInstructionFilesUpdate(instrictionFiles):(uploadFiles) => handleUploadFilesUpdate(uploadFiles)}></File_Upload>
            
            {
                edditMode ? 
                (<></>)
                :
                (
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
                ) 
            }
            
            <div className={styles.editButton}>
                <button onClick={()=>alert("uploading " + uploadFiles.length + " file(s)")}>Save</button>
            </div>
            
        </div>
        <dialog id='dialog' className={styles.dialogwindow}>
            <div>
                <label>Name</label>
                <input placeholder='name' id='dialogItemName'></input>
                <input></input>
            </div>
            <button onClick={closeDialog}>Save</button>
        </dialog>
        
    </>
    );
    
}