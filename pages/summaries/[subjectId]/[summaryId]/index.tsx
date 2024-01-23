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
import { getFileById, getFileNameById, getFileNamesByIds, getFilesByIds, postFiles } from '../../../../services/File.service';
import FileObject from '../../../../models/File';
import UserContext from '../../../../components/UserContext';
import Image from 'next/image';
import FileDisplayObject from '../../../../models/FileDisplayObject';

export default function SummaryDetail(){
    const [editMode, setEditMode] = useState(false);
    const [files, setFiles] = useState<FileDisplayObject[]>([]);
    const [summary, setSummary] = useState<Summary>();
    const [backupSummary, setBackupSummary] = useState<Summary>();
    const router = useRouter(); 
    const subjectId = router.query.subjectId;
    const [fileUpdateDate, setFileUpdateDate] = useState(new Date());
    const summaryId = router.query.summaryId;
    const [subject, setSubject] = useState<Subject>();
    const [description, setDescription] = useState('');

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
        fetchData();
    }, [router]);

    function handleAcceptedFiles(files: string[]) {
        console.log(files);
    }

    useEffect(() => {
        console.log("summary",summary);
        setDescription(summary&&summary.description);
    }, [summary]);

    async function handleFilesUpdated(updatedfiles: any[]) {
        postFiles(updatedfiles).then((res) => {
            const tmpFiles:FileDisplayObject[] = [];
            for (const fileId of res) {
                getFileNameById(fileId).then((fileName) => {
                    tmpFiles.push({id: fileId, name: fileName});
                }).catch((err) => {
                    console.log("GETFILENAMEERROR",err);
                });
            }
            console.log("result",tmpFiles);
            setFiles(tmpFiles);
        }).catch((err) => {
            console.log("POSTERROR",err);
        });
        setFileUpdateDate(new Date());
    }

    useEffect(() => {
        console.log("files",files);
    }, [files]);

    function downloadFile(fileId: number){
        //downloadFileByID(fileId);
        console.log(fileId);
    }

    function deleteFileItem(fileId: number) {
        const tmpList = [];
        for (const file of files) {
            if (file.id != fileId)
                tmpList.push(file);
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
        summary.description = (document.getElementById('textArea') as HTMLTextAreaElement).value;
        const fileIds: number[] = [];
        files.map((file) => {
            fileIds.push(file.id);
        });
        summary.files = fileIds;

        console.log("SAVESUMMARY",summary);

        updateSummary(summary).then((res) => {
            /**
             * setEditMode(false);
            setBackupSummary({...summary});
            setSummary({...summary});
             */
            router.push(`/summaries/${subjectId}/${summaryId}`);
            setEditMode(false);
        });
        
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
                <MarkdownEditor containerWidth={editMode?50:80} defaultText={description} isEditable={editMode}></MarkdownEditor>
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
                        {
                            files&&files.length > 0 &&
                            <button>
                                <Image width={20} height={20} src={'/download.svg'} alt={'download'} ></Image>
                            </button>
                        }
                        
                    </div>
                </div>
                
                <div>
                {
                    files&&files.length > 0 ?
                    files&&files.map((file, index) => {
                        return(
                            <FileListObject key={"FileItem_"+file.id} file={file} asCard={false}  downloadabel={!editMode} downloadFunction={(fileId)=>downloadFile(fileId)} deleteFunction={(fileId)=>deleteFileItem(fileId)}></FileListObject>
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