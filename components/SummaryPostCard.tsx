import Image from 'next/image'
import styles from '../styles/Summary.module.scss'
import FileListObject from './FileListObject'
import { useEffect, useState } from 'react'
import VotingComponent from './VotingComponent'
import { Router, useRouter } from 'next/router'
import Summary from '../models/Summary'
import { getSummaryById } from '../services/Summary.service'
import SummaryVoteDTO from '../models/SumaryVoteDTO'
export default function SummaryPostCard({ post , color,vote}: { post?: Summary, color?: string,vote?:any}) {
    const router = useRouter();
    const subject = router.query.subjectId;

    function handleOpenDetails(){
        router.push('/summaries/'+subject+'/'+post.id);
    }

    function handleVote(vote:number){
        const tmp : SummaryVoteDTO = {
            summaryId: post.id,
            vote: vote
        }
        this.vote(tmp);
    }

    return (
        <div className={styles.post} onClick={handleOpenDetails}>
            <div className={styles.postHeader}>
                <Image alt='profile' src={'/ProfileDemo.svg'} width={200} height={200} />
                <div>
                    <label>username</label>
                        <h3>{post&&post.title}</h3>
                        <p>{post&&post.description}</p>
                </div>
            </div>
            <div className={styles.postFooter}>
                <VotingComponent vote={handleVote} itemkey={post&&post.id} withScore={true}></VotingComponent>
            </div>
        </div>
    )
}