import styles from '../styles/assignment.module.css';
import Image from 'next/image';

export default function Plus() {
    return (
            <div className={styles.plusContainer}>
                <div className={styles.plus}>
                    <Image src="/plus.svg" alt="plus" width="100" height="100"/>
                </div>  
            </div>
    );
}