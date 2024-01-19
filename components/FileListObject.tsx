import { useEffect, useState } from "react";
import styles from "../styles/FileListObject.module.scss";
import Image from "next/image";
import { getFileById } from "../services/File.service";
import FileObject from "../models/File";
import FileDisplayObject from "../models/FileDisplayObject";
export default function FileListObject({
  itemKey,
  deleteFunction,
  downloadFunction,
  downloadabel = false,
  asCard = true,
  file,
}: {
  downloadabel?: boolean;
  itemKey: number;
  downloadFunction?: (key: number) => void | null;
  deleteFunction?: (key: number) => void | null;
  asCard?: boolean;
  file: FileDisplayObject;
}) {
  const [displayFile, setDisplayFile] = useState<File>();

  useEffect(() => {
    async function fetchData() {
      const tmpFile = await getFileById(file.id);
      setDisplayFile(tmpFile);
    }
    fetchData();
  }, []);

  function GetFilename(file) {
    let maxLen = 50;

    if (asCard) maxLen = 10;

    let res = file.name.slice(0, maxLen);
    if (file.name.length > maxLen) res += "...";

    return res;
  }

  function uploadItem(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    downloadFunction(itemKey);
    
    // get child element
    const element = e.target as HTMLElement;
    const child = element.children[0] as HTMLImageElement;
    // change image to check.svg
    child.src = "/checklist.svg";
  }

  function deleteItem(e) {
    // select element by id but only in this component
    const element = document.getElementById("listContainer");
    element.classList.add(styles.deleteAnimation);
    setTimeout(() => {
      element.classList.remove(styles.deleteAnimation);
    }, 200);
    deleteFunction(itemKey);
  }
  return (
    <>
      {asCard ? (
        <div className={styles.Cardcontainer}>
          <Image alt="File" src="/fileIcon.svg" width={60} height={60}></Image>
          <p>{GetFilename(displayFile)}</p>
        </div>
      ) : (
        <div id="listContainer" className={styles.Listcontainer}>
          <div className={styles.ListContentcontainer}>
            <Image
              alt="File"
              src="/fileIcon.svg"
              width={50}
              height={50}
            ></Image>
            <p>{GetFilename(displayFile)}</p>
            {downloadabel ? (
              <div onClick={(e)=>uploadItem(e)} className={styles.deletContainer}>
                <Image
                  alt="download"
                  width={30}
                  height={30}
                  src="/download.svg"
                ></Image>
              </div>
            ) : (
              <div onClick={deleteItem} className={styles.deletContainer}>
                <Image
                  alt="delete"
                  width={30}
                  height={30}
                  src="/cancelicon.svg"
                ></Image>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
