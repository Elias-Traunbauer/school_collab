import { useRouter } from 'next/router';
import styles from '../styles/SubjectItem.module.scss'
import Image from "next/image";
export default function SubjectItem({subject = "DBI",picture}: {subject: string, picture?: boolean}) {
    const router = useRouter();
    function openCollection() {
        router.push(`/summaries/collection?subject=${subject}`);
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
            
            <h1>{subject}</h1>
        </div>
    )
}