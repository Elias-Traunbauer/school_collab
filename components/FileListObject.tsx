import styles from "../styles/FileListObject.module.scss";
import Image from "next/image";

export default function FileListObject({
  itemKey,
  deleteFunction,
  asCard = true,
  file = { name: "File" },
}: {
  itemKey: number;
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

  function deleteItem(e) {
    e.target.parentElement.parentElement.parentElement.classList.add(
      styles.deleteAnimation
    );
    console.log("delete " + itemKey);
    e.preventDefault();

    deleteFunction && deleteFunction(itemKey);
  }

  return (
    <>
      {asCard ? (
        <div className={styles.Cardcontainer}>
          <Image alt="File" src="/fileIcon.svg" width={80} height={80}></Image>
          <p>{filename}</p>
        </div>
      ) : (
        <div className={styles.Listcontainer}>
          <div>
            <Image
              alt="File"
              src="/fileIcon.svg"
              width={60}
              height={60}
            ></Image>
            <p>{filename}</p>
            {deleteFunction && (
              <div
                onClick={(e) => deleteItem(e)}
                className={styles.deletContainer}
              >
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
