import { useState,useEffect } from 'react'
import Countdown from '../components/Countdown';
import File_Upload from '../components/file_upload';
import styles from '../styles/assignment.module.css';
import Image from 'next/image';
import { useRouter } from 'next/router'
import {Dialog,openDialog} from '../components/Dialog';




export default function AssignmentEdit({assignmentId}){
        // TODO: fetch assignment

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
        const [instrictionFiles,setInstrictionFiles] = useState([]);
        const [edditMode,setEdditMode] = useState(false);
        const [assignment,setAssignment] = useState(assignmentDummy);
        //const [acceptedFilextentions,setAcceptedFilextentions] = useState([]);
        let acceptedFilextentions = [];
        let deleting = false;
        let currFileIndex = null;
        let instrictionFilesBackup = [];
        let assignmentBackup = assignment;

        const router = useRouter();

        function handleUploadFilesUpdate(list){
            setUploadFiles([...uploadFiles,...list]);
        }
        function handleInstructionFilesUpdate(list){
            setInstrictionFiles([...instrictionFiles,...list]);
        }
        function handleAcceptedFiles(list){
            acceptedFilextentions = list;
            console.log(acceptedFilextentions);
        }

        function deleteItem(e,key){
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

        function deleteInstructionItem(e,key){
            e.preventDefault();
            deleting = true;
            
            const tmpList = [];
            const parent = e.target.parentElement;
            parent.classList.add(styles.filelistitem_close);

            for (let i = 0; i < instrictionFiles.length; i++) {
                if(i != key)
                tmpList.push(instrictionFiles[i]);
            }
            
            
            //animation
            setTimeout(() => {
                parent.classList.remove(styles.filelistitem_close);
                setInstrictionFiles(tmpList);
                deleting = false;
            }, 250)
        }

        let currFileKey = -1;

        function handleSave(){
            const tmpArr = uploadFiles;
            tmpArr[currFileIndex] = new File([tmpArr[currFileIndex]],document.getElementById("fileName").value);
            setUploadFiles([...tmpArr]);
        }

        function handleSaveInstruction(){
            const tmpArr = instrictionFiles;
            tmpArr[currFileIndex] = new File([tmpArr[currFileIndex]],document.getElementById("instructionFileName").value);
            setInstrictionFiles([...tmpArr]);
        }

        function handleOpenDialog(id,i){
            if(deleting)
            return;
            currFileIndex = i;
            openDialog(id);
            document.getElementById("fileName").value = uploadFiles[i].name;
        }

        function handleOpenInstructionDialog(id,i){
            if(deleting)
            return;
            currFileIndex = i;
            openDialog(id);
            document.getElementById("instructionFileName").value = instrictionFiles[i].name;
        }

        function handleCancelEdit(){
            console.log(assignmentBackup);
            setEdditMode(false);
            setAssignment(assignmentBackup);
            setInstrictionFiles(instrictionFilesBackup);
        }

        function handleEddit(){
            assignmentBackup = Object.create(assignment);
            instrictionFilesBackup = instrictionFiles;
            setEdditMode(true);
            console.log(assignmentBackup);
        }

        function handleSaveEdit(){
            setEdditMode(false);
            assignment.description = document.getElementById("descriptionInput").value;
            assignment.title = document.getElementById("titleInput").value;
        }

        function handleSaveAssignment(){
            // TODO: Backend anbindung
            router.push("./assignments");
        }

        
        
    return(
        <>
        <div className={styles.editcontainer}>
            <div className={styles.editheadContainer}>
                <div className={styles.edithead}>
                    <input className={`${edditMode?styles.edditOn:styles.edditOff}`} defaultValue={assignment.title} id='titleInput'></input>
                <Countdown date={assignment.deadline}></Countdown>
                </div>
            </div>
            
            
            
            <div className={styles.descriptioncontainer}>
                <div className={styles.description}>
                    <input className={`${edditMode?styles.descriptionOn:styles.descriptionOff}`} defaultValue={assignment.description} id='descriptionInput'></input>
                    {
                        instrictionFiles.length>0 ?
                        (
                        <>
                            <section className={styles.descriptionSection}></section>
                            <div className={styles.instrictionfileContainer}>
                                <ul className={styles.filelistitem}>
                                    {instrictionFiles.map((file,i) => {
                                        return <li key={i} onClick={()=>edditMode?handleOpenInstructionDialog("instruction",i):null}>
                                            {file.name}
                                            {
                                            edditMode ? 
                                            <Image onClick={(e) => deleteInstructionItem(e,i)} className={styles.cancelbutton} src={"/cancelicon.svg"} width={20} height={20} alt="cancel"></Image>
                                            : null
                                            }
                                            
                                        </li>
                                    })}
                                </ul>
                            </div>
                        </>)
                        :
                        (<></>)
                    }
                    
                   
                </div>
            </div>

            <File_Upload edittmode={edditMode} acceptedFiles={(acceptedFiles) => handleAcceptedFiles(acceptedFiles)} title={edditMode?"Upload Instructions":"Upload Files"} handleFilesUpdated={edditMode?(instrictionFiles) => handleInstructionFilesUpdate(instrictionFiles):(uploadFiles) => handleUploadFilesUpdate(uploadFiles)}></File_Upload>
            
            {
                edditMode ? 
                null
                :
                (
                    <div className={styles.fileListWrapper}>
                        <div  className={styles.fileListContainer}>

                            {uploadFiles.length > 0 ? (<>
                                <ul id='uploadFilesUl' className={styles.filelistitem} hidden>
                                    {uploadFiles.map((file,i)=>{return <li onClick={() => handleOpenDialog("alo",i)} key={i}>
                                        <p>{file.name}</p>
                                        <Image onClick={(e) => deleteItem(e,i)} className={styles.cancelbutton} src={"/cancelicon.svg"} width={20} height={20} alt="cancel"></Image>
                                </li>})}
                            </ul>
                            </>) : (<></>)}
                        </div>
                    </div>
                ) 
            }
            
            
            <div className={styles.editButton}>
                {
                    edditMode?null:
                    <button onClick={handleSaveAssignment}>Save</button>
                }
                {
                    assignment.creator.name == currUserDummy.name ? 
                    (<>
                        
                        {edditMode?
                        (
                            <>
                            <button onClick={handleSaveEdit}>Save Changes</button>
                            <button onClick={handleCancelEdit}>Cancel Changes</button>
                            </>
                        )
                        :
                        <button onClick={handleEddit}>Edit</button>
                        }
                        
                    </>
                    ):(<></>)
                }
                
                
            </div>
            
        </div>
        
        
    </>
    );
    
}