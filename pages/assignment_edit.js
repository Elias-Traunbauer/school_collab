import { useState,useEffect } from 'react'
import Countdown from '../components/Countdown';
import styles from '../styles/assignment.module.css';

export default function AssignmentEdit({assignment,acceptedFiles}){

        //mock
        let assignmentDummy = {
            subject: "DBI",
            title: "JPA Lab 1: Generieren der IDs",
            deadline: new Date(2023, 1, 22, 13, 40),
            set: true,
            description: "dsasdasdadsadsad"
        }

        let acceptedFilesDummy = ["pdf","txt","png"];
        const[fileslist,setFileList] = useState([]);
        let currFile = 0;
        
        useEffect(() => {    
            const dropArea = document.querySelectorAll(`.${styles.fileinput}`);
            const input = document.querySelectorAll(`.${styles.wrapper} input`);
            dropArea[0].addEventListener("dragover",handleDragOver);
            dropArea[0].addEventListener("dragleave",handleDragLeave);
            dropArea[0].addEventListener("drop",handleDrop);
            dropArea[0].addEventListener("click",handleClick);
            input[0].addEventListener("change",handleInputChange);
            

            function handleInputChange(e){
                let files = e.target.files;
                showFile(files);
            }

            function handleDrop(e){
                e.preventDefault();
                let files = e.dataTransfer.files;
                console.log(e.dataTransfer.files);
                showFile(files);
                e.target.classList.remove(styles.activedrag);
            }

            function handleClick(e){
                e.preventDefault();
                input[0].click();
            }
            
            
            function handleDragOver(e){
                e.preventDefault();
                e.target.classList.add(styles.activedrag);
            }
    
            function handleDragLeave(e){
                e.preventDefault();
                e.target.classList.remove(styles.activedrag);
            }

            return () => {
                dropArea[0].removeEventListener("dragover",handleDragOver);
                dropArea[0].removeEventListener("dragleave",handleDragLeave);
                dropArea[0].removeEventListener("drop",handleDrop);
                dropArea[0].removeEventListener("click",handleClick);
                input[0].removeEventListener("change",handleInputChange);
            }

            function showFile(newFiles){
                let tmpArray = [];
                
                for(const newFile of newFiles){
                    
                    const fileExtention = newFile.name.split('.');
                    if(acceptedFilesDummy.includes(fileExtention[fileExtention.length-1]))    
                    tmpArray.push(newFile)
                }

                setFileList([...fileslist,...tmpArray]);

                if(document.getElementById("fileul") != null && fileslist.length > 0)
                    document.getElementById("fileul").hidden = false;
            }

           
        
        },[fileslist]);

            function deleteItem(file,key){
                currFile = null;
                console.log(key);
                const listItems = document.querySelectorAll(`.${styles.filelistitem} li`);
                const tmpElement = listItems[key];
                

                tmpElement.classList.add(styles.filelistitem_close);

                //setFileList(fileslist);
    
                let tmpList = [];
                for(let e of fileslist){
                    if(e != file)
                    tmpList.push(e);
                }
    
                
                
                //animation
                setTimeout(() => {
                    setFileList(tmpList);
                    console.log("bye");
                    if(document.getElementById("fileul") != null && fileslist.length <= 0)
                        document.getElementById("fileul").hidden = true;

                    for(let e of listItems){
                        e.classList.remove(styles.filelistitem_close);
                    }
                }, 250)
            }

            function openDialog(file){
                if(currFile == null)
                return;
                const dialog = document.getElementById('dialog');
                let inputs = document.querySelectorAll(`.${styles.dialogwindow} input`)
                inputs[0].value = file.name;
                currFile = file;
                console.log(currFile);
                dialog.classList.add(styles.opendialog);

                dialog.showModal();
                setTimeout(() => {
                    dialog.classList.remove(styles.opendialog);
                }, 300)
            }

            function closeDialog(){
                const dialog = document.getElementById('dialog');
                let inputs = document.querySelectorAll(`.${styles.dialogwindow} input`)
                //currFile.name = inputs[0].value;

                
                dialog.classList.add(styles.closedialog)

                setTimeout(() => {
                    dialog.close();
                    let tmp = [];
                    for(let e of fileslist){
                        if(e == currFile){
                            e = new File([currFile], inputs[0].value, {
                                type: currFile.type,
                                lastModified: currFile.lastModified,
                            });
                            tmp.push(e);
                        }
                        else
                        tmp.push(e);
                        
                    }
                    console.log(tmp);
                    dialog.classList.remove(styles.closedialog);
                    setFileList(tmp);
                }, 250)
                
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
            <div className={styles.uploadfieldcontainer}>
                <div className={styles.wrapper}>
                    <header>File Upload</header>
                        <div id='fileinput' className={styles.fileinput} type="file" name="file">
                            <label>Drag and Drop</label>
                        </div>
                        <input type="file" hidden></input>
                            

                        <ul id='fileul' className={styles.filelistitem} hidden>
                            {fileslist.map((file,i)=>{return <li onClick={()=>openDialog(file)}  key={i}>
                                <img src="/file.svg" alt="An SVG of an eye"/>     
                                <p>{file.name}</p>
                                <img className={styles.cancelbutton} onClick={(e) => {deleteItem(file,i)}} src="/cancelicon.svg" alt="An SVG of an eye"/>     
                                
                            </li>})}
                        </ul>
                </div>
                
            </div>
            
            <div className={styles.editButton}>
                <button onClick={()=>alert("uploading " + fileslist.length + " file(s)")}>Edit</button>
            </div>
            
        </div>
        <dialog id='dialog' className={styles.dialogwindow}>
            <div>
                <label>Name</label>
                <input placeholder='name'></input>
                <input></input>
            </div>
            <button onClick={closeDialog}>edit</button>
        </dialog>
        
    </>
    );
    
}