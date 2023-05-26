import React from 'react';
import styles from '../../styles/PollList.module.scss';
import PollCard from '../../components/Pollcard';
export default function PollList(){
    return(
        <div className={styles.container}>
            <PollCard></PollCard>
        </div>
    )
}