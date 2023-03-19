import { useState, useEffect } from "react";
import Countdown from "../components/Countdown";
import styles from "../styles/Assignment.module.css";
import Image from "next/image";
import { useRouter } from "next/router";
import { openDialog } from "../components/Dialog";
import FileListObject from "../components/FileListObject";
import FileUpload from "../components/FileUpload";

export default function AssignmentEdit({ assignmentId }) {
  // TODO: fetch assignment

  //mock
  let assignmentDummy = {
    subject: "DBI",
    title: "JPA Lab 1: Generieren der IDs",
    deadline: new Date(2024, 1, 22, 13, 40),
    set: true,
    description: "dsasdasdadsadsad",
    creator: {
      name: "pfreyteaching",
    },
    instrictionFiles: [],
    uploadFiles: [],
  };

  const currUserDummy = {
    name: "pfreyteaching",
  };

  const [instructionHidden, setInstructionHidden] = useState(false);
  const [descriptionHidden, setDescriptionHidden] = useState(true);
  const [uploadHidden, setUploadHidden] = useState(true);

  const [uploadFiles, setUploadFiles] = useState([]);
  const [assignment, setAssignment] = useState(assignmentDummy);
  const [edditMode, setEdditMode] = useState(false);
  const [assignmentBackup, setAssignmentBackup] = useState(assignmentDummy);
  //const [acceptedFilextentions,setAcceptedFilextentions] = useState([]);
  let acceptedFilextentions = [];
  let deleting = false;
  let currFileIndex = null;
  let instrictionFilesBackup = [];

  const router = useRouter();
  const [currUser, setCurrUser] = useState(true);

  function handleUploadFilesUpdate(list) {
    setAssignment({
      ...assignment,
      uploadFiles: [...assignment.uploadFiles, ...list],
    });
    setUploadHidden(false)
  }
  function handleInstructionFilesUpdate(list) {
    setAssignment({
      ...assignment,
      instrictionFiles: [...assignment.instrictionFiles, ...list],
    });
    setInstructionHidden(false);
  }
  function handleAcceptedFiles(list) {
    acceptedFilextentions = list;
    console.log(acceptedFilextentions);
  }

  function handleUploadFilesDelete(e, key) {
    e.preventDefault();

    //style delete
    const parent = e.target.parentElement.parentElement.parentElement;
    parent.classList.add(styles.filelistitem_close);

    //delete Item
    setTimeout(() => {

      const tmpList = [];
      for (let i = 0; i < assignment.uploadFiles.length; i++) {
        if (i != key) tmpList.push(uploadFiles[i]);
      }
      let tmpAssignment = assignment;
      tmpAssignment.uploadFiles = tmpList;

      setAssignment({
        ...assignment,
        uploadFiles: tmpList,
      });

    }, 500);
  }

  function deleteInstructionItem(e, key) {
    e.preventDefault();
    deleting = true;

    const tmpList = [];
    const parent = e.target.parentElement;
    parent.classList.add(styles.filelistitem_close);

    for (let i = 0; i < assignment.instrictionFiles.length; i++) {
      if (i != key) tmpList.push(instrictionFiles[i]);
    }

    //animation
    setTimeout(() => {
      parent.classList.remove(styles.filelistitem_close);

      let tmpAssignment = assignment;
      tmpAssignment.instrictionFiles = tmpList;
      setAssignment(tmpAssignment);
      deleting = false;
    }, 250);
  }

  let currFileKey = -1;

  function handleSave() {
    const tmpArr = uploadFiles;
    tmpArr[currFileIndex] = new File(
      [tmpArr[currFileIndex]],
      document.getElementById("fileName").value
    );
    let tmpAssignment = assignment;
    tmpAssignment.uploadFiles = [...tmpArr];
    setAssignment(tmpAssignment);
  }

  function handleSaveInstruction() {
    const tmpArr = instrictionFiles;
    tmpArr[currFileIndex] = new File(
      [tmpArr[currFileIndex]],
      document.getElementById("instructionFileName").value
    );
    let tmpAssignment = assignment;
    tmpAssignment.instrictionFiles = [...tmpArr];
    setAssignment(tmpAssignment);
  }

  function handleOpenDialog(id, i) {
    if (deleting) return;
    currFileIndex = i;
    openDialog(id);
    document.getElementById("fileName").value = uploadFiles[i].name;
  }

  function handleOpenInstructionDialog(id, i) {
    if (deleting) return;
    currFileIndex = i;
    openDialog(id);
    document.getElementById("instructionFileName").value =
      instrictionFiles[i].name;
  }

  function handleCancelEdit() {
    setAssignment(assignmentBackup);
    setEdditMode(false);
    document.getElementById("titleInput").value = assignmentBackup.title;
    document.getElementById("descriptionInput").value =
      assignmentBackup.description;
  }

  function handleEddit() {
    setAssignmentBackup(assignment);
    setEdditMode(true);
  }

  function handleSaveEdit() {
    setEdditMode(false);
    setAssignment(assignment);
  }

  function handleSaveAssignment() {
    // TODO: Backend anbindung
    router.push("./assignments");
  }

  function handleCancelAssignment() {
    router.push("./assignments");
  }

  function ExpandDescription() {
    const description = document.getElementById("descriptionInputContainer");
    if (description.classList.contains(styles.hidden)) {
      description.classList.remove(styles.hidden);
      setDescriptionHidden(false);
    } else {
      description.classList.add(styles.hidden);
      setDescriptionHidden(true);
    }
  }
  function ExpandInstruction() {
    const description = document.getElementById("instructionInputContainer");
    if (description.classList.contains(styles.hidden)) {
      description.classList.remove(styles.hidden);
      setInstructionHidden(false);
    } else {
      description.classList.add(styles.hidden);
      setInstructionHidden(true);
    }
  }

  function ExpandFiles() {
    setUploadHidden(!uploadHidden);
  }

  return (
    <>
      <div className={styles.editcontainer}>
        <div className={styles.editheadContainer}>
          <div className={styles.edithead}>
            <input
              className={`${edditMode ? styles.edditOn : styles.edditOff}`}
              readOnly={!edditMode}
              defaultValue={assignment.title}
              id="titleInput"
            ></input>
          </div>
        </div>
        <div className={styles.countdownContainer}>
          <div>
            <Countdown date={assignment.deadline}></Countdown>
          </div>
        </div>
        <div className={styles.descriptioncontainer}>
          <div className={styles.descriptionwrapper}>
            <div
              onClick={
                assignment.description.length == 0 && !edditMode
                  ? (e) => e.preventDefault()
                  : () => ExpandDescription()
              }
              className={styles.descriptionExpander}
            >
              <p>
                {assignment.description.length == 0 ? "No " : ""}Description
              </p>
              {assignment.description.length == 0 && !edditMode ? (
                ""
              ) : (
                <Image
                  className={styles.expandImg}
                  alt="expand"
                  src="/expand.svg"
                  width={20}
                  height={20}
                ></Image>
              )}
            </div>
            {descriptionHidden ||
              (assignment.description.length == 0 && !edditMode) ? (
              ""
            ) : (
              <div className={styles.seperator}></div>
            )}
            {assignment.description.length == 0 && !edditMode ? (
              ""
            ) : (
              <div
                id="descriptionInputContainer"
                className={`${styles.hidden} ${styles.descriptionInputContainer}`}
              >
                <input
                  className={` ${edditMode ? styles.descriptionOn : styles.descriptionOff
                    }`}
                  readOnly={!edditMode}
                  defaultValue={assignment.description}
                  id="descriptionInput"
                ></input>
              </div>
            )}
          </div>
          {assignment.instrictionFiles.length == 0 ? (
            <div className={styles.descriptionwrapper}>
              <div className={styles.descriptionExpander}>
                <p>No Instructions</p>
              </div>
            </div>
          ) : (
            <div className={styles.descriptionwrapper}>
              <div
                onClick={() => ExpandInstruction()}
                className={styles.descriptionExpander}
              >
                <p>Instructions</p>
                <Image
                  className={styles.expandImg}
                  alt="expand"
                  src="/expand.svg"
                  width={20}
                  height={20}
                ></Image>
              </div>

              {instructionHidden ? (
                ""
              ) : (
                <div className={styles.seperator}></div>
              )}

              <div
                id="instructionInputContainer"
                className={`${styles.descriptionInputContainer}`}
              >
                {assignment.instrictionFiles.map((file, i) => {
                  return (
                    <FileListObject
                      key={i}
                      file={{ name: file.name }}
                      asCard={true}
                    ></FileListObject>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        <FileUpload
          edittmode={edditMode}
          handleAcceptedFiles={(acceptedFiles) => handleAcceptedFiles(acceptedFiles)}
          title={edditMode ? "Upload Instructions" : "Upload Files"}
          handleFilesUpdated={
            edditMode
              ? (instrictionFiles) =>
                handleInstructionFilesUpdate(instrictionFiles)
              : (uploadFiles) => handleUploadFilesUpdate(uploadFiles)
          }
        ></FileUpload>
        

        <div className={styles.uploadFileContainer}>
          <div className={styles.filesWrapper}>
            <div onClick={() => ExpandFiles()} className={styles.filesExpander}>
              <p>{assignment.uploadFiles.length == 0 ? "no Files" : "your Files"}</p>
              {
                assignment.uploadFiles.length == 0 ? "" :
                  <Image
                    className={styles.expandImg}
                    alt="expand"
                    src="/expand.svg"
                    width={20}
                    height={20}
                  ></Image>
              }

            </div>
            {uploadHidden || assignment.uploadFiles == 0 ? "" :
              <>
                <div className={styles.seperator}></div>
                <div className={styles.fileDisplayContainer}>
                  {assignment.uploadFiles.map((file, i) => {
                    return (
                      <FileListObject
                        deleteFunction={handleUploadFilesDelete}
                        key={i}
                        file={{ name: file.name }}
                        asCard={false}
                      ></FileListObject>
                    );
                  })}
                </div>
              </>


            }

          </div>
        </div>

        <div className={styles.editButton}>
          <div >
            {edditMode ? null : (
              <>
                <button className="btn btn-primary" type="right" onClick={handleSaveAssignment}>Save</button>
                <button className="btn btn-cancel" type="right" onClick={handleCancelAssignment}>Cancel</button>
              </>

            )}
            {assignment.creator.name == currUserDummy.name ? (
              <>
                {edditMode ? (
                  <>
                    <button className="btn btn-primary" type="right" onClick={handleSaveEdit}>Change</button>
                    <button className="btn btn-cancel" type="right" onClick={handleCancelEdit}>Discard</button>
                  </>
                ) : (
                  <button className="btn btn-seconday" type="left" onClick={handleEddit}>Edit</button>
                )}
              </>
            ) : (
              <></>
            )}
          </div>
        </div>

      </div>
    </>
  );
}
