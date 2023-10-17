import Image from 'next/image'
import styles from '../styles/Summary.module.scss'
import FileListObject from './FileListObject'
import { useState } from 'react'
import VotingComponent from './VotingComponent'
import { Router, useRouter } from 'next/router'
import Summary from '../models/Summary'
export default function SummaryPostCard({ post = {
    id: 0,
    title: 'Test',
    descritpion: 'nix',
    publishdate: new Date(),
    subject: {
        name: 'DBI',
        id: 1,
        version: ''
    },
    author: {
        username: 'Test',
        firstName: 'Test',
        lastName: 'Test',
        email: 'Test',
        id: 0,
        version: ''
    }
}}: { post?: Summary }) {

    const router = useRouter();
    const subject = router.query.subjectId;
    console.log("SUB",subject);
    const userDummy = {
        name: 'Yannie',
    }
    const [editMode, setEditMode] = useState(false)
    const [lastModified, setLastModified] = useState({date: post.publishdate, modified: false})
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
        let hours = date.getHours();
        let minutes = date.getMinutes()
        let ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        let hoursDisplay:string = hours < 10 ? '0'+hours : hours.toString();
        let minutesDisplay:string = minutes < 10 ? '0'+minutes : minutes.toString();
        let strTime = date.toDateString() + hoursDisplay + ':' + minutesDisplay + ' ' + ampm;
        return strTime
    }

    function handleUpload(){
        alert("upload files")
    }

    function handleOpenDetails(){
        router.push('/summaries/'+subject+'/'+post.id);
    }

    return (
        <div className={styles.post} onClick={handleOpenDetails}>
            <div className={styles.postHeader}>
                <Image alt='profile' src={'/ProfileDemo.svg'} width={200} height={200} />
                <div>
                    <div>
                        <p>{post.author.username}</p>
                        <span>{lastModified.modified? "last modified: " : "published: " } {getTimestamp()}</span>
                    </div>
                        
                        <h3>{post.title}</h3>
                        <p>If you&apos;re tired of using outline styles for secondary buttons, a soft solid background based on the text color can be a great alternative.</p>
                </div>
            </div>
            <div className={styles.postFooter}>
                <VotingComponent itemkey={post.id} withScore={true}></VotingComponent>
            </div>
        </div>
    )
}