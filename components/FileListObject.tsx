import styles from '../styles/FileListObject.module.scss';
import Image from 'next/image';

export default function FileListObject({itemKey, deleteFunction, asCard = true, file = { name: "File" }}) {
    const filename = GetFilename(file);

    function GetFilename(file) {
        let maxLen = 50;

        if (asCard) maxLen = 10;

        let res = file.name.slice(0, maxLen);
        if (file.name.length > maxLen)
            res += "...";

        return res;
    }

    function deleteItem(e) {
        e.target.parentElement.parentElement.parentElement.classList.add(styles.deleteAnimation);
        console.log("delete " + itemKey);
        e.preventDefault();
        deleteFunction(itemKey);
        
    }
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