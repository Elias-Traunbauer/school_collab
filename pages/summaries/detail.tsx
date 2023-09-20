import React, { useState } from 'react';
import MarkdownEditor from '../../components/MarkdownEditor';
import Voting from '../voting';
import VotingComponent from '../../components/VotingComponent';
import styles from "../../styles/SummaryDetail.module.scss";
import FileUpload from '../../components/FileUpload';
import FileListObject from '../../components/FileListObject';
import { useRouter } from 'next/router';
export default function SummaryDetail({ post = {author:'Yannie',title:'Info sssssssssssssssssssssssssssssssssssssssssssssss sssssssssss',description: 'asddad', files: [{name : "suee"},{name : "suee"}], publishDate: new Date(),subject: "DBI",votingId: 1}}) {
    const [editMode, setEditMode] = useState(false);
    const [files, setFiles] = useState(post.files);
    const [summary, setSummary] = useState({
        title: post.title,
        description: post.description,
        files: post.files,
        votingId: post.votingId,
    });
    const [backupSummary, setBackupSummary] = useState(summary);
    const router = useRouter(); 
    const subject:string = "DBI";
    const [fileUpdateDate, setFileUpdateDate] = useState(new Date());

    const mockUser = {
        name: 'Yannie',
    }

    function handleAcceptedFiles(files: File[]) {
        console.log(files);
    }

    function handleFilesUpdated(updatedfiles: File[]) {
        setFiles([...files,...updatedfiles]);
    }

    function downloadFile(file){
        console.log(file);
    }

    function deleteFileItem(e, key) {
        e.preventDefault();
        console.log(key);

        const tmpList = [];
        for (let i = 0; i < files.length; i++) {
            if (i != key)
                tmpList.push(files[i]);
        }
        setFiles(tmpList);
    }

    function handleExit() {
        router.push(`/summaries/collection?subject=${subject}`);
    }

    function handleSave() {
        const editCheckbox = document.getElementById('detail_edit') as HTMLInputElement;
        editCheckbox.checked = false;
        summary.title = (document.getElementById('SumTitle') as HTMLInputElement).value;
        summary.description = (document.getElementsByClassName(styles.MarkdownEditor)[0] as HTMLInputElement).value;
        summary.files = files;

        setEditMode(false);
        setSummary(summary);
    }

    function handleCancel() {
        setEditMode(false);
        const editCheckbox = document.getElementById('detail_edit') as HTMLInputElement;
        editCheckbox.checked = false;
        setSummary(backupSummary);
    }

    function printDate(date: Date) {
        const year = date.getFullYear();
        const month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth();
        const day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
        const hour = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
        const min = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();

        return `${day}.${month}.${year} ${hour}:${min}`;
    }


    return(
        <div className={styles.container}>
            <div className={styles.header}>
                <input id='detail_edit' type='checkbox' onClick={()=>setEditMode(!editMode)} className={styles.edit}></input>
                    <div>
                        {
                            editMode ?
                            <input id='SumTitle' className={styles.title} defaultValue={summary.title}></input>
                            :
                            <h1>{summary.title}</h1>
                        }
                        
                        <div>
                            <VotingComponent votingId={summary.votingId} withScore={true} itemkey={0}></VotingComponent>
                        </div> 
                    </div>
            </div>
            <div className={styles.MarkdownEditor}>
                <MarkdownEditor containerWidth={editMode?50:80} defaultText={summary.description} isEditable={editMode}></MarkdownEditor>
            </div>

            {
                editMode &&
                <div className={styles.fileUpload}>
                    <FileUpload title={"Upload File"} handleAcceptedFiles={handleAcceptedFiles} handleFilesUpdated={handleFilesUpdated} ></FileUpload>
                </div>
            }

            <div className={styles.files}>
                <div>
                    <div>
                        <p>Files</p>
                        <span>download all Files</span>
                    </div>
                </div>
                
                <div>
                {
                    files.length > 0 ?
                    summary.files.map((file, index) => {
                        return(
                            <FileListObject key={"FileItem"+index} file={file} asCard={false}  downloadabel={!editMode} downloadFunction={()=>downloadFile(file)} deleteFunction={(e)=>deleteFileItem(e,index)} itemKey={index}></FileListObject>
                        );
                    })
                    :
                    <div>
                        <h2>No files</h2>
                        {
                            editMode &&
                            <p>Drag and Drop to Upload Files</p>
                        }
                    </div>
                }
                </div>
                <div>
                    <p>last updated <span>{printDate(fileUpdateDate)}</span></p>
                </div>
            </div>
            
            <div className={styles.buttonArray}>
                
                <div>
                    {
                        editMode ?
                        <>
                            <button onClick={handleCancel} className='btn btn-cancel'>Cancel</button>
                            <button onClick={handleSave} className='btn btn-primary'>Save</button>
                        </>
                        
                    :
                        <button onClick={handleExit} className='btn btn-primary'>Exit</button>
                    
                    }
                    
                </div>

            </div>
                
        </div>
    );
}