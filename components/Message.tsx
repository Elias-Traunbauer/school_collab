import React from 'react';
import styles from '../styles/Message.module.scss'
export default function Message({ author, text , createdAt = null } : { author: {name,color}|null, text: string, createdAt?: Date | null }) {
    const mockuser = {name:'alo'};

    return (
       <div className={styles.container}>
            <div className={styles.head}>
                <p>{author.name}</p>
            </div>
            <div className={styles.body}>
                <p>{text}</p>
            </div>
            <div className={styles.foot}>
                <p>{createdAt?.toLocaleString()}</p>
            </div>
       </div>
    );
}