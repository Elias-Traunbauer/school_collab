import { useState, useEffect } from 'react'
import styles from '../styles/Assignment.module.scss';
import Image from 'next/image';

export default function FileUpload ({ handleFilesUpdated, handleAcceptedFiles, title, edittmode = false, fileExtentions = [] })
{
    const [acceptedFilextentions, setAcceptedFilextentions] = useState(fileExtentions);

    function showFile(newFiles) {
        let tmpArray = [];
        for (const newFile of newFiles) {
            const fileExtention = newFile.name.split('.');
            if (acceptedFilextentions.includes(fileExtention[fileExtention.length - 1]) || acceptedFilextentions.length == 0 || edittmode)
                tmpArray.push(newFile);
        }
        handleUpload(tmpArray);
    }

    function handleInputChange(e) {
        const res :any[] = [];
        let files = e.target.files;
        if(files.length == 0 || !files){
            return;
        } 
        const reader = new FileReader();

        reader.onload = (e) => {
            const text = e.target.result;
        };

        for (const iterator of files) {
            reader.readAsText(iterator);
            res.push(iterator);
        }

        
        showFile(res);
    }

    function handleFileExtentionsChange(acceptedFiles) {
        handleAcceptedFiles(acceptedFiles);
        setAcceptedFilextentions([...acceptedFilextentions, ...acceptedFiles]);
        return;
    }

    function handleDrop(e) {
        e.preventDefault();
        let files = e.dataTransfer.files;
        showFile(files);
        e.target.classList.remove(styles.activedrag);
    }

    function handleClick(e) {
        e.preventDefault();
        (document.getElementById('fileInput')as HTMLInputElement).value = null;
        document.getElementById('fileInput').click();
    }


    function handleDragOver(e) {
        e.preventDefault();
        e.target.classList.add(styles.activedrag);
    }

    function handleDragLeave(e) {
        e.preventDefault();
        e.target.classList.remove(styles.activedrag);
    }

    function handleUpload(newFiles) {
        handleFilesUpdated(newFiles);
    }

    function deleteItem(e, key) {
        const tmpList = [];
        for (let i = 0; i < acceptedFilextentions.length; i++) {
            if (i != key)
                tmpList.push(acceptedFilextentions[i]);
        }
        setAcceptedFilextentions(tmpList);
    }

    function addItem(e) {
        const input = document.getElementById('fileExtentionInput') as HTMLInputElement;
        console.log(e.key);
        if (input.value.length <= 0 || e.key != "Enter")
            return;

        if (!acceptedFilextentions.includes(input.value)) {
            const tmpList = acceptedFilextentions;
            tmpList.push(input.value);
            setAcceptedFilextentions([...tmpList]);
        }
        input.value = "";
    }

    function handleDropDownOnClick() {
        console.log("focused")
        document.getElementById('fileExtentionInput').focus();
    }

    return (
        <>
            <div className={styles.uploadfieldcontainer}>
                <div className={styles.wrapper}>
                    <div className={styles.headerContainer}>
                        <h1>{title ? title : "File Upload"}</h1>
                        <div className={styles.extentionWrapper}>
                            {
                                edittmode ?
                                    (<>
                                        <div className={styles.extentionContainer}>
                                            <div className={styles.dropdown}>
                                                <button onClick={handleDropDownOnClick} className={styles.dropbtn}>Extentions</button>
                                                <div className={styles.dropdownContent}>
                                                    {acceptedFilextentions.map((extention, i) => {
                                                        return <a key={i}>
                                                            <p>{extention}</p>
                                                            <Image onClick={(e) => deleteItem(e, i)} className={styles.cancelbutton} src={"/cancelicon.svg"} width={20} height={20} alt="cancel"></Image>
                                                        </a>
                                                    })}
                                                    <input onKeyUp={(e) => addItem(e)} id='fileExtentionInput' placeholder='new Extention'></input>
                                                </div>
                                            </div>
                                        </div>
                                    </>)
                                    :
                                    (
                                        <>
                                            {
                                                acceptedFilextentions.length == 0 ? <p>no Restrictions</p> : acceptedFilextentions.map((extention, i) => {
                                                    return <div key={i} className={styles.fileExtention}>
                                                        <p>.{extention}</p>
                                                    </div>
                                                })
                                            }
                                        </>
                                    )
                            }
                        </div>

                    </div>


                    <div onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDrop} onClick={handleClick} id='fileinput' className={styles.fileinput}>
                        <label>Drag and Drop</label>
                    </div>
                    <input id='fileInput' onChange={handleInputChange} type="file" hidden></input>
                </div>
            </div>
        </>
    );
}