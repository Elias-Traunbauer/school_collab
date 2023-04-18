import styles from '../styles/FileListObject.module.scss';
import Image from 'next/image';

export default function FileListObject({indx = -1, deleteFunction, asCard = true, file = { name: 'test' }}) {
    return (
        <>
            {asCard ?
                <div className={styles.Cardcontainer}>
                    <Image alt='File' src="/fileIcon.svg" width={50} height={50}></Image>
                    <p>{file.name}</p>
                </div>
                :
                <div className={styles.Listcontainer}>
                    <div className={styles.ListContentcontainer}>
                        <Image alt='File' src="/fileIcon.svg" width={50} height={50}></Image>
                        <p>{file.name}</p>
                        <div onClick={(e) => deleteFunction(e, indx)} className={styles.deletContainer}>
                            <Image alt='delete' width={30} height={30} src="/cancelicon.svg"></Image>
                        </div>
                    </div>
                </div>

            }
        </>
    );
}