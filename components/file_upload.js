import { useState,useEffect } from 'react'
import styles from '../styles/assignment.module.css';
import Image from 'next/image';

const File_Upload =  ({handleFilesUpdated}) => {


    let acceptedFilesDummy = ["pdf","txt","png"];
    const[fileslist,setFileList] = useState([]);


        

        function showFile(newFiles){
            let tmpArray = [];
            
            for(const newFile of newFiles){
                
                const fileExtention = newFile.name.split('.');
                if(acceptedFilesDummy.includes(fileExtention[fileExtention.length-1]))    
                tmpArray.push(newFile);
            }

            handleUpload(tmpArray);
        }


    function handleInputChange(e){
        console.log("input");
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
        document.getElementById('fileInput').value = null;
        document.getElementById('fileInput').click();
    }
    
    
    function handleDragOver(e){
        e.preventDefault();
        e.target.classList.add(styles.activedrag);
    }

    function handleDragLeave(e){
        e.preventDefault();
        e.target.classList.remove(styles.activedrag);
    }

        

        function handleUpload(newFiles){
            console.log(newFiles);
            handleFilesUpdated(newFiles);
        }
    
    return(
        <>

        <div className={styles.uploadfieldcontainer}>
                <div className={styles.wrapper}>
                    <header>File Upload</header>
                        <div onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDrop} onClick={handleClick} id='fileinput' className={styles.fileinput} type="file" name="file">
                            <label>Drag and Drop</label>
                        </div>
                        <input id='fileInput' onChange={handleInputChange} type="file" hidden></input> 
                        </div>
            </div>
        </>
    );
}

export default File_Upload;
