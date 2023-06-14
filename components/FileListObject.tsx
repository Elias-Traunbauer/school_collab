import styles from "../styles/FileListObject.module.scss";
import Image from "next/image";

export default function FileListObject({
  itemKey,
  deleteFunction,
  downloadFunction,
  downloadabel = false,
  asCard = true,
  file = { name: "File" },
}: {
    downloadabel?: boolean;
  itemKey: number;
    downloadFunction?: (key: number) => void | null;
  deleteFunction?: (key: number) => void | null;
  asCard?: boolean;
  file?: { name: string };
}) {
  const filename = GetFilename(file);

  function GetFilename(file) {
    let maxLen = 50;

    if (asCard) maxLen = 10;

    let res = file.name.slice(0, maxLen);
    if (file.name.length > maxLen) res += "...";

    return res;
  }

  function uploadItem() {
    downloadFunction(itemKey);
}

    function deleteItem(e) {
        // select element by id but only in this component
        const element = document.getElementById("listContainer");
        element.classList.add(styles.deleteAnimation);
        setTimeout(() => {
            element.classList.remove(styles.deleteAnimation);
        }, 200);
        deleteFunction(itemKey)
    }
    return (
        <>
            {asCard ?
                <div className={styles.Cardcontainer}>
                    <Image alt='File' src="/fileIcon.svg" width={50} height={50}></Image>
                    <p>{file.name}</p>
                </div>
                :
                <div id="listContainer" className={styles.Listcontainer}>
                    <div className={styles.ListContentcontainer}>
                        <Image alt='File' src="/fileIcon.svg" width={50} height={50}></Image>
                        <p>{file.name}</p>
                        {
                            downloadabel ?
                            <div onClick={uploadItem} className={styles.deletContainer}>
                            <Image alt='download' width={30} height={30} src="/download.svg"></Image>
                        </div>
                        :
                        <div onClick={deleteItem} className={styles.deletContainer}>
                        <Image alt='delete' width={30} height={30} src="/cancelicon.svg"></Image>
                            </div>

                        }

                        
                    </div>
                </div>

            }
        </>
    );
}
