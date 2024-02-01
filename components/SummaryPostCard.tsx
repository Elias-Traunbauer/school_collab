import Image from 'next/image'
import styles from '../styles/Summary.module.scss'
import FileListObject from './FileListObject'
import { useEffect, useState } from 'react'
import VotingComponent from './VotingComponent'
import { Router, useRouter } from 'next/router'
import Summary from '../models/Summary'
import { getSummaryById } from '../services/Summary.service'
export default function SummaryPostCard({ post }: { post?: Summary }) {

    const router = useRouter();
    const subject = router.query.subjectId;
    console.log("SUB",subject);
    useEffect(() => {
        console.log("POST", post);
        //getSummaryById(post.id).then((res) => {
            
        //}).catch((err) => {
          //  console.log("ERROR", err);
        //});
    }, [])
    const [editMode, setEditMode] = useState(false)
    let backup = post;

    function downloadFiles() {
        alert("download files")
    }

    function changeEditMode(mode) {
        setEditMode(mode)
    }

    function handleEditSave(){
        const tmp = {date: new Date(),modified: true};
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
                        <h3>{post&&post.title}</h3>
                        <p>{post&&post.description}</p>
                </div>
            </div>
            <div className={styles.postFooter}>
                <VotingComponent itemkey={post&&post.id} withScore={true}></VotingComponent>
            </div>
        </div>
    )
}