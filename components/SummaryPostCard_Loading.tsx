import Image from 'next/image'
import styles from '../styles/Summary.module.scss'
import FileListObject from './FileListObject'
import { useEffect, useState } from 'react'
import VotingComponent from './VotingComponent'
import { Router, useRouter } from 'next/router'
import Summary from '../models/Summary'
import { getSummaryById } from '../services/Summary.service'
import SummaryVoteDTO from '../models/SumaryVoteDTO'
import VotingComponentLoading from './VotingComponent_Loading'
export default function SummaryPostCardLoading() {
    //<Image alt='profile' src={'/ProfileDemo.svg'} width={200} height={200} />
    return (
        <div className={styles.post}>
            <div className={styles.postHeader}>
                <div className={`${styles.loading_skeleton} ${styles.loadingPostImage}`}></div>
                <div>
                    <label>username</label>
                        <h3 className={`${styles.loading_skeleton} ${styles.loadingTitle}`}></h3>
                        <p className={`${styles.loading_skeleton} ${styles.loadingDescription}`}></p>
                </div>
            </div>
            <div className={styles.postFooter}>
                <VotingComponentLoading></VotingComponentLoading>
            </div>
        </div>
    )
}