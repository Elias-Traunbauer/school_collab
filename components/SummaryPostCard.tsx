import Image from 'next/image'
import styles from '../styles/Summary.module.scss'
import FileListObject from './FileListObject'
import { useState } from 'react'
import VotingComponent from './VotingComponent'
import { Router, useRouter } from 'next/router'
export default function SummaryPostCard({ post = {author:'Yannie',title:'Info Team',description: 'asddad', files: [{name : "suee"},{name : "suee"}], publishDate: new Date(),subject: "DBI",votingId: 1}}: { post?: any }) {

    const router = useRouter();
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
        router.push('/SummaryDetail');
    }

    return (
        <div className={styles.post} onClick={handleOpenDetails}>
            <div className={styles.postHeader}>
                <Image alt='profile' src={'/ProfileDemo.svg'} width={200} height={200} />
                <div>
                    <div>
                        <p>{post.author}</p>
                        <span>{lastModified.modified? "last modified: " : "published: " } {getTimestamp()}</span>
                    </div>
                        
                        <h3>{post.title}</h3>
                        <p>If you&apos;re tired of using outline styles for secondary buttons, a soft solid background based on the text color can be a great alternative.</p>
                </div>
            </div>
            <div className={styles.postFooter}>
                <VotingComponent itemkey={post.votingId} withScore={true}></VotingComponent>
            </div>
        </div>
    )
}