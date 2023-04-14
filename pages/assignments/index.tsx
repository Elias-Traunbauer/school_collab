import styles from '../../styles/Assignment.module.css'
import { useState, useEffect } from 'react'
import AssignmentCard from '../../components/AssignmentCard';
import Image from 'next/image';
import { useRouter } from 'next/router'

export default function Assignments() {

    const [assignmentData, setAssignmentData] = useState([]);
    const router = useRouter();

    useEffect(() => {
        (async () => {
            const data = await fetch("/api/assignments");
            const json = await data.json();
            setAssignmentData(json.data);
        })();

    }, []);

    return (
        <div className={styles.assignmentcontainer}>
            <div className={styles.plusContainer}>
                <h1>Open Assignments</h1>
                <div className={styles.plus}>
                    <Image src="/plus.svg" alt="plus" width="100" height="100" onClick={() => router.push("assignments/create")} />
                </div>
            </div>
            {
                assignmentData.map((element, i) => {
                    return <AssignmentCard key={i} assignment={element}></AssignmentCard>
                })
            }
        </div>
    );
}
