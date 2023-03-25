import Image from 'next/image'
import styles from '../styles/Summary.module.scss'
import FileListObject from './FileListObject'
import { useState } from 'react'
export default function SummaryPost({ post = {author:'Yannie',description: 'asddad', files: [{name : "suee"},{name : "suee"}], publishDate: new Date(),subject: "DBI"}}) {

    const userDummy = {
        name: 'Yannie',
    }
    const [editMode, setEditMode] = useState(false)
    const [lastModified, setLastModified] = useState({date: post.publishDate, modified: false})
    let backup = post;

    function downloadFiles() {
        alert("download files")
    }

    function changeEditMode(mode) {
        setEditMode(mode)
    }

    function handleEditSave(){
        const tmp = {date: new Date(),modified: true};
        setLastModified(tmp);
        changeEditMode(false);
    }
    function handleEditCancel(){
        post = backup;
        changeEditMode(false)
    }

    function handleEnableEdditmode(){
        backup = post;
        changeEditMode(true);
    }

    function getTimestamp(){
        let date = lastModified.date;
        let hours = date.getHours()
        let minutes = date.getMinutes()
        let ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        hours = hours < 10 ? '0'+hours : hours;
        minutes = minutes < 10 ? '0'+minutes : minutes;
        let strTime = date.toDateString() + hours + ':' + minutes + ' ' + ampm;
        return strTime
    }

    function handleUpload(){
        alert("upload files")
    }

    return (
        <div className={styles.post}>
            <div className={styles.postHeader}>
                <Image alt='profile' src={'/ProfileDemo.svg'} width={200} height={200} />
                <div>
                        {post.author}
                        <span>{lastModified.modified? "last modified: " : "published: " } {getTimestamp()}</span>
                        <p>If you're tired of using outline styles for secondary buttons, a soft solid background based on the text color can be a great alternative.</p>
                </div>
            </div>
            <div className={styles.postContent}>
                <div>
                    {post.files.map((file, index) => {
                            return <FileListObject key={index} asCard={true} file={file}></FileListObject>
                    })}
                </div>
            </div>
            <div className={styles.postFooter}>
                {editMode?
                    <button id='uploadBtn' onClick={handleUpload} className='btn btn-primary'>Upload</button>    
                    :""
                }
                <div>
                    {
                        !editMode?
                        <>
                            {
                                userDummy.name == post.author?
                                <Image alt='edit' onClick={handleEnableEdditmode} src={'/edit.svg'} width={30} height={30} />
                                :""
                            }
                            <Image alt='download' onClick={downloadFiles} src={'/download.svg'} width={30} height={30} />
                        </>
                        :
                        <>
                            <button onClick={handleEditCancel} style={{marginBottom: '.2em'}} className='btn btn-cancel'>Cancel</button>
                            <button onClick={handleEditSave} style={{marginBottom: '.2em'}} className='btn btn-primary'>Save</button>
                        </>
                    }
                    
                </div>
            </div>
        </div>
    )
}