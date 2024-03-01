import { CSSProperties, use, useEffect, useState } from 'react';
import styles from '../styles/PollCard.module.scss'
import { useRouter } from 'next/router';
import Poll from '../models/Poll';
import { getUser, getUserById } from '../services/User.service';
import User from '../models/User';
export default function PollCardLoading(){
    const backgroundcolor = 'var(--background_1)';

    return(
        <div style={{ '--cardColor': backgroundcolor } as CSSProperties} className={`${styles.container}`}>
            <div>
                <p className={`${styles.loading_skeleton} ${styles.loadingParagraph}`}></p>
            </div>
            
            <div>
                <h2 className={`${styles.loading_skeleton} ${styles.loadingTitle}`}></h2>
            </div>
            <div>
                <div>
                <p className={`${styles.loading_skeleton} ${styles.loadingParagraph} ${styles.loadingDescription}`}></p>
                </div>
            </div>

            <div>
                <p className={`${styles.loading_skeleton} ${styles.loadingParagraph} ${styles.loadingCountdown}`}></p>
            </div>
        </div>
    )
}