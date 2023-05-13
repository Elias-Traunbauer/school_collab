import React, { useState } from 'react';
import MarkdownEditor from '../components/MarkdoenEditor';
import Voting from './voting';
import VotingComponent from '../components/VotingComponent';
import styles from '../styles/SummaryDetail.module.scss';
import FileUpload from '../components/FileUpload';
import FileListObject from '../components/FileListObject';
export default function SummaryDetail({ post = {author:'Yannie',title:'Info Teamssssssssssssssssssssssssssssssssssssssssssssssssssssssssss sssssssssss',description: 'asddad', files: [{name : "suee"},{name : "suee"}], publishDate: new Date(),subject: "DBI",votingId: 1}}) {
    const [editMode, setEditMode] = useState(false);
    const [files, setFiles] = useState(post.files);

    const mockUser = {
        name: 'Yannie',
    }

    function handleAcceptedFiles(files: File[]) {
        console.log(files);
    }

    function handleFilesUpdated(updatedfiles: File[]) {
        setFiles([...files,...updatedfiles]);
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

    function handleSave() {
        setEditMode(false);
        const editCheckbox = document.getElementById('detail_edit') as HTMLInputElement;
        editCheckbox.checked = false;
    }

    function handleCancel() {
        setEditMode(false);
        const editCheckbox = document.getElementById('detail_edit') as HTMLInputElement;
        editCheckbox.checked = false;
    }


    return(
        <div className={styles.container}>
            <div className={styles.header}>
                <input id='detail_edit' type='checkbox' onClick={()=>setEditMode(!editMode)} className={styles.edit}></input>
                    <div>
                        <h1>{post.title}</h1>
                        <div>
                            <VotingComponent votingId={post.votingId} withScore={true} itemkey={0}></VotingComponent>
                        </div> 
                    </div>
            </div>
            <div className={styles.MarkdownEditor}>
                <MarkdownEditor text={post.description}></MarkdownEditor>
            </div>

            {
                editMode &&
                <div className={styles.fileUpload}>
                    <FileUpload title={"das"} handleAcceptedFiles={handleAcceptedFiles} handleFilesUpdated={handleFilesUpdated} ></FileUpload>
                </div>
            }

            <div className={styles.files}>
                <div>
                    <div>
                        <p>Files</p>
                        <span>download Files</span>
                    </div>
                </div>
                
                <div>
                {
                    files.length > 0 ?
                    files.map((file, index) => {
                        return(
                            <FileListObject key={"FileItem"+index} file={file} asCard={false}  deleteFunction={deleteFileItem} itemKey={index}></FileListObject>
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
                        <button className='btn btn-primary'>Exit</button>
                    
                    }
                    
                </div>

            </div>
                
        </div>
    );
}