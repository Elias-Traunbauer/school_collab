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
            },
            instrictionFiles: [],
            uploadFiles: [],
            edditMode: false,
        }
        
        const currUserDummy = {
            name:"pfreyteaching",
        }

        const [instructionHidden,setInstructionHidden] = useState(false);
        const [descriptionHidden,setDescriptionHidden] = useState(true);

        const [uploadFiles,setUploadFiles] = useState([]);
        const [assignment,setAssignment] = useState(assignmentDummy);
        //const [acceptedFilextentions,setAcceptedFilextentions] = useState([]);
        let acceptedFilextentions = [];
        let deleting = false;
        let currFileIndex = null;
        let instrictionFilesBackup = [];
        let assignmentBackup = assignment;

        const router = useRouter();

        function handleUploadFilesUpdate(list){
            tmpAssignment = assignment;
            tmpAssignment.uploadFiles = [...tmpAssignment.uploadFiles,...list];
            setAssignment(tmpAssignment);
        }
        function handleInstructionFilesUpdate(list){
            tmpAssignment = assignment;
            tmpAssignment.instrictionFiles = [...tmpAssignment.instrictionFiles,...list];
            setAssignment(tmpAssignment);
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
                tmpAssignment = assignment;
                tmpAssignment.uploadFiles = tmpList;
                setAssignment(tmpAssignment);
                deleting = false;
            }, 250)
        }

        function deleteInstructionItem(e,key){
            e.preventDefault();
            deleting = true;
            
            const tmpList = [];
            const parent = e.target.parentElement;
            parent.classList.add(styles.filelistitem_close);

            for (let i = 0; i < assignment.instrictionFiles.length; i++) {
                if(i != key)
                tmpList.push(instrictionFiles[i]);
            }
            
            
            //animation
            setTimeout(() => {
                parent.classList.remove(styles.filelistitem_close);

                tmpAssignment = assignment;
                tmpAssignment.instrictionFiles = tmpList;
                setAssignment(tmpAssignment)
                deleting = false;
            }, 250)
        }

        let currFileKey = -1;

        function handleSave(){
            const tmpArr = uploadFiles;
            tmpArr[currFileIndex] = new File([tmpArr[currFileIndex]],document.getElementById("fileName").value);
            tmpAssignment = assignment;
            tmpAssignment.uploadFiles = [...tmpArr];
            setAssignment(tmpAssignment);
        }

        function handleSaveInstruction(){
            const tmpArr = instrictionFiles;
            tmpArr[currFileIndex] = new File([tmpArr[currFileIndex]],document.getElementById("instructionFileName").value);
            tmpAssignment = assignment;
            tmpAssignment.instrictionFiles = [...tmpArr];
            setAssignment(tmpAssignment);
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

        function usehandleCancelEdit(){
            console.log(assignmentBackup);
            setAssignment(assignmentBackup);
        }

        function handleEddit(){
            assignmentBackup = assignment;
            tmpAssignment = assignment;
            tmpAssignment.edditMode = true;
            setAssignment(tmpAssignment);
            console.log(assignmentBackup);
        }

        function handleSaveEdit(){
            tmpAssignment = assignment;
            tmpAssignment.edditMode = false;
            tmpAssignment.description = document.getElementById("descriptionInput").value;
            tmpAssignment.title = document.getElementById("titleInput").value;
            setAssignment(tmpAssignment);
        }

        function handleSaveAssignment(){
            // TODO: Backend anbindung
            router.push("./assignments");
        }

        function ExpandDescription(){
            const description = document.getElementById("descriptionInputContainer");
            if(description.classList.contains(styles.hidden))
            {
                description.classList.remove(styles.hidden);
                setDescriptionHidden(false);
            }
            else{
                description.classList.add(styles.hidden);
                setDescriptionHidden(true);
            }
        }
        function ExpandInstruction(){
            const description = document.getElementById("instructionInputContainer");
            if(description.classList.contains(styles.hidden))
            {
                description.classList.remove(styles.hidden);
                setInstructionHidden(false);
            }
            else{
                description.classList.add(styles.hidden);
                setInstructionHidden(true);
            }
        }
    return(
        <>
        <div className={styles.editcontainer}>
            <div className={styles.editheadContainer}>
                <div className={styles.edithead}>
                    <input className={`${assignment.edditMode?styles.edditOn:styles.edditOff}`} readOnly={!assignment.edditMode} defaultValue={assignment.title} id='titleInput'></input>
                    <Countdown date={assignment.deadline}></Countdown>
                </div>
            </div>
            <div className={styles.descriptioncontainer}>
                <div className={styles.descriptionwrapper}>
                    <div onClick={assignment.description.length == 0 && !assignment.edditMode ? (e)=>e.preventDefault():()=>ExpandDescription()} className={styles.descriptionExpander}>
                        <p>{assignment.description.length == 0?"No " : ""}Description</p>
                        {
                            assignment.description.length == 0 && !assignment.edditMode ?"":<Image className={styles.expandImg} alt='expand' src='/expand.svg' width={20} height={20}></Image>
                        }
                    </div>
                    {
                        descriptionHidden || assignment.description.length == 0 && !assignment.edditMode ?"":<div clasName={styles.seperator}></div>
                    }
                    {
                        assignment.description.length == 0 && !assignment.edditMode?"":
                        <div id='descriptionInputContainer' className={`${styles.hidden} ${styles.descriptionInputContainer}`}>
                            <input className={` ${assignment.edditMode?styles.descriptionOn:styles.descriptionOff}`} readOnly={!assignment.edditMode} defaultValue={assignment.description} id='descriptionInput'></input>
                        </div>
                    }
                </div>
                {
                    assignment.instrictionFiles.length == 0?
                    <div className={styles.descriptionwrapper}>
                        <div  className={styles.descriptionExpander}>
                            <p>No Instructions</p>
                        </div>
                    </div>
                    :
                    <div className={styles.descriptionwrapper}>
                        <div onClick={()=>ExpandInstruction()}  className={styles.descriptionExpander}>
                            <p>Instructions</p>
                            <Image className={styles.expandImg} alt='expand' src='/expand.svg' width={20} height={20}></Image>
                        </div>

                    {
                        instructionHidden?"":<div clasName={styles.seperator}></div>
                    }
                    

                    <div id='instructionInputContainer' className={`${styles.descriptionInputContainer}`}>
                    {
                        instrictionFiles.map((file,i)=>{
                            return (
                                <div className={styles.filelistitem} key={i}>
                                    <p onClick={() => handleOpenInstructionDialog("instructionDialog",i)}>{file.name}</p>
                                    {
                                        assignment.edditMode?<Image onClick={(e) => deleteInstructionItem(e,i)} className={styles.deleteImg} alt='delete' src='/cancelicon.svg' width={20} height={20}></Image>
                                        :""
                                    }
                                </div>
                            );
                            
                        })
                    }
                    </div>
                    
                    </div>
                }
                    

                
            </div>

            <File_Upload edittmode={assignment.edditMode} acceptedFiles={(acceptedFiles) => handleAcceptedFiles(acceptedFiles)} title={assignment.edditMode?"Upload Instructions":"Upload Files"} handleFilesUpdated={assignment.edditMode?(instrictionFiles) => handleInstructionFilesUpdate(instrictionFiles):(uploadFiles) => handleUploadFilesUpdate(uploadFiles)}></File_Upload>
            
            {
                assignment.edditMode ? 
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
                    assignment.edditMode?null:
                    <button onClick={handleSaveAssignment}>Save</button>
                }
                {
                    assignment.creator.name == currUserDummy.name ? 
                    (<>
                        
                        {assignment.edditMode?
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