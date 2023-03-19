import styles from '../styles/FileListObject.module.scss';
import Image from 'next/image';

export default function FileListObject({ key, deleteFunction, asCard = true, file = { name: "File" } }) {
    const filename = GetFilename(file);

    function GetFilename(file) {
        let maxLen = 50;

        if (asCard) maxLen = 5;

        let res = file.name.slice(0, maxLen);
        if (file.name.length > maxLen)
            res += "...";

        return res;
    }

    return (
        <>
            {asCard ?
                <div className={styles.Cardcontainer}>
                    <Image alt='File' src="/fileIcon.svg" width={50} height={50}></Image>
                    <p>{filename}</p>
                </div>
                :
                <div className={styles.Listcontainer}>
                    <div className={styles.ListContentcontainer}>
                        <Image alt='File' src="/fileIcon.svg" width={50} height={50}></Image>
                        <p>{filename}</p>
                        <div onClick={(e) => deleteFunction(e, key)} className={styles.deletContainer}>
                            <Image alt='delete' width={30} height={30} src="/cancelicon.svg"></Image>
                        </div>
                    </div>
                </div>

            }
        </>
    );
}