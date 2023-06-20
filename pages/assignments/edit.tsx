import { useState, useEffect, useContext } from "react";
import Countdown from "../../components/Countdown";
import styles from "../../styles/Assignment.module.scss";
import Image from "next/image";
import { useRouter } from "next/router";
import FileListObject from "../../components/FileListObject";
import FileUpload from "../../components/FileUpload";
import MarkdownEditor from "../../components/MarkdownEditor";
import Assignment from "../../models/Assignment";
import Group from "../../models/Group";
import Subject from "../../models/Subject";
import UserContext from '../../components/UserContext'

export default function AssignmentEdit({ assignmentId }) {
  // TODO: fetch assignment
  const context = useContext(UserContext);

  const mockGroup:Group ={
    creatorUserId: 0,
    description: "",
    name: "",
    id: 0,
    version: ""
  };
  const mockSubject:Subject = {
    name: "",
    id: 0,
    version: ""
  };
  //mock
  let assignmentDummy:Assignment = {
    title: "...",
    description: "",
    content: "",
    created: new Date(),
    modified: new Date(),
    due: new Date(),
    group: mockGroup,
    subject: mockSubject,
    user: context.userContext,
    userId: 0,
    groupId: 0,
    subjectId: 0,
    id: 0,
    version: "0",
    files: [],
    instructions: [],
  };

  const currUserDummy = {
    name: "pfreyteaching",
  };

  const [assignment, setAssignment] = useState<Assignment>(assignmentDummy);
  const [edditMode, setEdditMode] = useState(false);
  const [assignmentBackup, setAssignmentBackup] = useState<Assignment>(assignmentDummy);
  //const [acceptedFilextentions,setAcceptedFilextentions] = useState([]);
  let acceptedFilextentions = [];
  const router = useRouter();
  console.log("assignment", assignment);


  function handleUploadFilesUpdate(list) {
    setAssignment({
      ...assignment,
      files: [...assignment.files, ...list],
    });
  }
  function handleInstructionFilesUpdate(list) {
    setAssignment({
      ...assignment,
      instructions: [...assignment.instructions, ...list],
    });
  }
  function handleAcceptedFiles(list) {
    acceptedFilextentions = list;
    console.log(acceptedFilextentions);
  }

  function handleCancelEdit() {
    setAssignment(assignmentBackup);
    setEdditMode(false);
    (document.getElementById("titleInput") as HTMLInputElement).value =
      assignmentBackup.title;
  }

  function handleEddit() {
    setAssignmentBackup(assignment);
    setEdditMode(true);
  }

  function handleSaveEdit() {
    const textarea = document.querySelector(
      "." + styles.descriptionContainer + "textarea"
    ) as HTMLTextAreaElement;
    setEdditMode(false);
  }

  function handleSaveAssignment() {
    // TODO: Backend anbindung
    const textarea = document.querySelector(
      "." + styles.descriptionContainer + "textarea"
    ) as HTMLTextAreaElement;
    router.push("/assignments");
  }

  function handleCancelAssignment() {
    router.push("/assignments");
  }

  function handleDeleteUploadFile(key) {
    const newList = assignment.files
      .slice(0, key)
      .concat(assignment.files.slice(key + 1));
      setAssignment({
        ...assignment,
        files: newList,
      });
  }

  function handleDeleInstructionFile(key) {
    const newList = assignment.instructions
      .slice(0, key)
      .concat(assignment.instructions.slice(key + 1));
    setTimeout(() => {
      setAssignment({
        ...assignment,
        instructions: newList,
      });
    }, 500);
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
            <Countdown date={assignment.due}></Countdown>
          </div>
        </div>

        <div className={styles.descriptionContainer}>
          <MarkdownEditor
            containerWidth={100}
            isEditable={edditMode}
          ></MarkdownEditor>
        </div>

        <div className={styles.instructionHeader}>
          <div>
            {assignment.instructions.length > 0 && <h1>Instructions</h1>}
          </div>
        </div>
        <div className={styles.instructionWrapper}>
          <div className={styles.instructionContainer}>
            {assignment.instructions.map((file, i) => {
              return (
                <FileListObject
                  key={"FileObj_" + i}
                  itemKey={i}
                  file={{ name: file.name }}
                  asCard={true}
                  deleteFunction={() => handleDeleInstructionFile(i)}
                ></FileListObject>
              );
            })}
          </div>
        </div>

        <FileUpload
          edittmode={edditMode}
          handleAcceptedFiles={(acceptedFiles) =>
            handleAcceptedFiles(acceptedFiles)
          }
          title={edditMode ? "Upload Instructions" : "Upload Files"}
          handleFilesUpdated={
            edditMode
              ? (instructions) =>
                  handleInstructionFilesUpdate(instructions)
              : (files) => handleUploadFilesUpdate(files)
          }
        ></FileUpload>

{

}
        <div className={styles.uploadfileWrapper}>
          {
            assignment.files.length == 0?
<>
              <h3>no Files Uploaded!</h3>
              <p>Drag and drop Files to upload them</p>
            </>
            :
            <>
            <div className={styles.uploadfileheader}>
            {assignment.files.length != 0 && <h1>Upload Files</h1>}
          </div>
          <div className={styles.uploadfileContainer}>
            {assignment.files.map((file, index) => {
              return (
                <FileListObject
                  key={index}
                  itemKey={index}
                  file={{ name: file.name }}
                  asCard={false}
                  deleteFunction={handleDeleteUploadFile}
                ></FileListObject>
              );
            })}
          </div></>
          }
        </div>

        <div className={styles.editButton}>
          <div>
            {edditMode ? null : (
              <>
                <button
                  className="btn btn-primary"
                  style={{ float: "right" }}
                  onClick={handleSaveAssignment}
                >
                  Save
                </button>
                <button
                  className="btn btn-cancel"
                  style={{ float: "right" }}
                  onClick={handleCancelAssignment}
                >
                  Cancel
                </button>
              </>
            )}
            {assignment.user.username == context.userContext.username ? (
              <>
                {edditMode ? (
                  <>
                    <button
                      className="btn btn-primary"
                      style={{ float: "right" }}
                      onClick={handleSaveEdit}
                    >
                      Change
                    </button>
                    <button
                      className="btn btn-cancel"
                      style={{ float: "right" }}
                      onClick={handleCancelEdit}
                    >
                      Discard
                    </button>
                  </>
                ) : (
                  <button
                    className="btn btn-secondary"
                    style={{ float: "left" }}
                    onClick={handleEddit}
                  >
                    Edit
                  </button>
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
