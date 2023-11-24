import { useRouter } from 'next/router';
import styles from '../styles/SubjectItem.module.scss'
import Image from "next/image";
import Subject from '../models/Subject';
export default function SubjectItem({key,subject,picture,link}: {key:any,subject: Subject, picture?: boolean, link?: string}) {
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
                        <h1>{subject.shortName}</h1>
                    </div>
                </>
            }
            
            <h1>{subject&&subject.name}</h1>
        </div>
    )
}