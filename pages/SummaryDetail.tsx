import React, { useState } from 'react';
import MarkdownEditor from '../components/MarkdoenEditor';
import Voting from './voting';
import VotingComponent from '../components/VotingComponent';
import styles from '../styles/SummaryDetail.module.scss';
export default function SummaryDetail({ post = {author:'Yannie',title:'Info Team',description: 'asddad', files: [{name : "suee"},{name : "suee"}], publishDate: new Date(),subject: "DBI",votingId: 1}}) {
    const [editMode, setEditMode] = useState(false)

    return(
        <>
            <div className={styles.header}>
                <div className={styles.edit} hidden={true}></div>
                <div>
                    <input className={editMode?styles.active:styles.inActive} type='text' defaultValue={post.title}></input>
                    <div>
                        <VotingComponent votingId={post.votingId} withScore={true}></VotingComponent>
                    </div>
                </div>
                
            </div>
            <MarkdownEditor text={post.description}></MarkdownEditor>
        </>
    );
}