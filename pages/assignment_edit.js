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
                }, 500)
                
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
                    <header>File Upload</header>
                        <div id='fileinput' className={styles.fileinput} type="file" name="file">
                            <label>Drag and Drop</label>
                        </div>
                        <input type="file" hidden></input>
                        <ul id='fileul' className={styles.filelistitem} hidden>
                            {fileslist.map((file,i)=>{return <li  key={i}>
                                {file.name}
                                <button onClick={(e) => {deleteItem(file,i),e.preventDefault()}}>X</button>
                            </li>})}
                        </ul>
                </div>
                
            </div>
            
            <div className={styles.editButton}>
                <button>Edit</button>
            </div>
        </div>
    );
    
}