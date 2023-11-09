import React, { useContext, useEffect, useState } from 'react';
import MarkdownEditor from '../../../../components/MarkdownEditor';
import Voting from '../../../voting';
import VotingComponent from '../../../../components/VotingComponent';
import styles from "../../../../styles/SummaryDetail.module.scss";
import FileUpload from '../../../../components/FileUpload';
import FileListObject from '../../../../components/FileListObject';
import { useRouter } from 'next/router';
import Summary from '../../../../models/Summary';
import { getSummaryById , updateSummary} from '../../../../services/Summary.service';
import Subject from '../../../../models/Subject';
import { getSubjectById } from '../../../../services/Subject.service';
import { postFiles } from '../../../../services/File.service';
import FileObject from '../../../../models/File';
import UserContext from '../../../../components/UserContext';
export default function SummaryDetail(){
    const [editMode, setEditMode] = useState(false);
    const [files, setFiles] = useState<FileObject[]>();
    const [summary, setSummary] = useState<Summary>();
    const [backupSummary, setBackupSummary] = useState<Summary>();
    const router = useRouter(); 
    const subjectId = router.query.subjectId;
    const [fileUpdateDate, setFileUpdateDate] = useState(new Date());
    const summaryId = router.query.summaryId;
    const [subject, setSubject] = useState<Subject>();

    const context = useContext(UserContext);

    useEffect(() => {
        async function fetchData() {
            const subjectIdAsNumber = parseInt(subjectId as string);
            if(isNaN(subjectIdAsNumber)) {
                return;
            }
            const tmpSubject = await getSubjectById(subjectIdAsNumber);
            setSubject(tmpSubject);

            const summaryIdAsNumber = parseInt(summaryId as string);
            if(isNaN(summaryIdAsNumber)) {
                return;
            }
            const tmpSummary = await getSummaryById(summaryIdAsNumber);
            setSummary(tmpSummary);
            setBackupSummary(tmpSummary);
        }
    }, []);

    function handleAcceptedFiles(files: string[]) {
        console.log(files);
    }

    async function handleFilesUpdated(updatedfiles: File[]) {
        const res:number[] = await postFiles(updatedfiles);
        const tmpFiles: FileObject[] = [];
        for (const iterator of res) {
            const obj:FileObject = {
                content: '',
                name: '',
                contentType: '',
                mimeType: '',
                size: 0,
                uploadedById: context.userContext.id,
                id: iterator,
                version: ''
            }
            tmpFiles.push(obj);
        }

        setFiles([...files,...tmpFiles]);
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
        updateSummary(summary).then((res) => {
            router.push(`/summaries/${subject}`);
        });
        
    }

    function handleSave() {
        const editCheckbox = document.getElementById('detail_edit') as HTMLInputElement;
        editCheckbox.checked = false;
        summary.title = (document.getElementById('SumTitle') as HTMLInputElement).value;
        summary.descritpion = (document.getElementsByClassName(styles.MarkdownEditor)[0] as HTMLInputElement).value;
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
                            <input id='SumTitle' className={styles.title} defaultValue={summary&&summary.title}></input>
                            :
                            <h1>{summary&&summary.title}</h1>
                        }
                        
                        <div>
                            <VotingComponent votingId={summary&&summary.id} withScore={true} itemkey={0}></VotingComponent>
                        </div> 
                    </div>
            </div>
            <div className={styles.MarkdownEditor}>
                <MarkdownEditor containerWidth={editMode?50:80} defaultText={summary.descritpion} isEditable={editMode}></MarkdownEditor>
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
                    summary&&summary.files&&summary.files.map((file, index) => {
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