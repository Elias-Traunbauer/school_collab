import { useState,useEffect } from 'react'
import styles from '../styles/assignment.module.css';
import Image from 'next/image';

const File_Upload =  ({handleFilesUpdated,acceptedFiles}) => {
        function showFile(newFiles){
            let tmpArray = [];
            for(const newFile of newFiles){
                const fileExtention = newFile.name.split('.');
                if(acceptedFiles.includes(fileExtention[fileExtention.length-1])|| acceptedFiles.length == 0)
                tmpArray.push(newFile);
            }
            handleUpload(tmpArray);
        }


    function handleInputChange(e){
        let files = e.target.files;
        showFile(files);
    }

    function handleDrop(e){
        e.preventDefault();
        let files = e.dataTransfer.files;
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
