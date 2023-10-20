import { useRouter } from 'next/router';
import styles from '../styles/SubjectItem.module.scss'
import Image from "next/image";
import Subject from '../models/Subject';
export default function SubjectItem({subject,picture,link}: {subject: Subject, picture?: boolean, link?: string}) {
    const router = useRouter();
    function openCollection() {
        router.push(`${link}/${subject.id}`);
    }
    return (
        <div className={styles.container} onClick={openCollection}>
            {
                picture ? 
                <Image width={50} height={50} alt='subj' src={"/add.svg"}></Image>
                :
                <>
                    <div className={styles.picturePlaceholder}>
                        <h1>{subject[0]}</h1>
                    </div>
                </>
            }
            
            <h1>{subject.name}</h1>
        </div>
    )
}