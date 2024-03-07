import { useState, useEffect, useRef, useContext } from 'react'
import Countdown from './Countdown';
import styles from '../styles/Assignment.module.scss'
import { useRouter } from 'next/router'
import Assignment from '../models/Assignment';
import Group from '../models/Group';
import Subject from '../models/Subject';
import UserContext from '../components/UserContext'
import { symlink } from 'fs';

export default function AssignmentCardLoading() {
    return (
        <div className={`${styles.assignmentcontainer}`} >
            <div className={`${styles.assignmentcard_loading} ${styles.assignmentcard}`}>
                <div className={styles.assignmenthead}>
                    <p className={`${styles.loading_skeleton} ${styles.loadingSubject}`}></p>
                </div>
                <div className={`${styles.assignmentbody}`}>
                    <h1 className={`${styles.loading_skeleton} ${styles.loadingTitle}`}></h1>
                    <p className={`${styles.loading_skeleton} ${styles.loadingDescription}`}></p>
                </div>
                <div className={styles.assignmentfoot}>
                    <p className={`${styles.loading_skeleton} ${styles.loadingCounter}`}></p>
                </div>
            </div>
        </div>

    );
}