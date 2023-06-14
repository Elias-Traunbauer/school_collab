import React from 'react'
import NewAssignmentCard from '../components/NewAssignmentCard'
import styles from '../styles/CardTest.module.css'

export default function CardTest() {
    return (
        <div className={styles.container}>
            <NewAssignmentCard></NewAssignmentCard>
        </div>
    )
}