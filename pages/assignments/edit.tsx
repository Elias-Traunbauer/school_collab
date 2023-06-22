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
import Datepicker from "../../components/Datepicker";

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
    content: "dasdassd",
    created: new Date(),
    modified: new Date(),
    due: new Date(),
    group: mockGroup,
    subject: mockSubject,
    user: context.userContext,
    userId: 4,
    groupId: 0,
    subjectId: 0,
    id: 0,
    version: "0",
    files: [],
    instructions: [],
  };


  const [assignment, setAssignment] = useState<Assignment>(assignmentDummy);
  const [edditMode, setEdditMode] = useState(false);
  const [assignmentBackup, setAssignmentBackup] = useState<Assignment>(assignmentDummy);
  const [dueDate, setDueDate] = useState<Date>(assignmentDummy.due);
  const [content, setContent] = useState<string>(assignmentDummy.content);
  const [acceptedFilextentions,setAcceptedFilextentions] = useState([]);
  const router = useRouter();


  useEffect(() => {
    console.log("content changed");
  }, [content]);
  


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
    setAcceptedFilextentions(list);
    
  }

  function handleCancelEdit() {
    setEdditMode(false);
    (document.getElementById("titleInput") as HTMLInputElement).value =
      assignmentBackup.title;
    const textarea = document.getElementById("textArea") as HTMLTextAreaElement;
    setDueDate(assignmentBackup.due); 
    setContent(assignmentBackup.content);
    setAssignment({...assignmentBackup,content: assignmentBackup.content});
  }

  function handleEddit() {
    let backup = assignment;
    const textarea = document.getElementById("textArea") as HTMLTextAreaElement;
    backup.content = textarea.value;
    backup.due = dueDate;
    backup.title = (document.getElementById("titleInput") as HTMLInputElement).value;
    
    setAssignmentBackup(backup);
    setEdditMode(true);
  }

  function handleSaveEdit() {
    const textarea = document.getElementById("textArea") as HTMLTextAreaElement;
    setAssignment({
      ...assignment,
      content: textarea.value,
      due: dueDate,
      title: (document.getElementById("titleInput") as HTMLInputElement).value,
    });
    setEdditMode(false);
  }

  function handleSaveAssignment() {
    // TODO: Backend anbindung
    const textarea = document.getElementById("textArea") as HTMLTextAreaElement;
    const title = (document.getElementById("titleInput") as HTMLInputElement)
    const dueDate = new Date();
    
    router.push("/assignments");
  }

  function handleCancelAssignment() {
    router.push("/assignments");
  }

  function handleDateChange(date) {
    setDueDate(date);
    
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
            {
              !edditMode&&
              <button onClick={handleEddit}>
              <Image src="/edit.svg" width={20} height={20} alt={"edit"}></Image>
            </button>
            }
            
          </div>
        </div>
        <div className={styles.countdownContainer}>
          <div>
            {
              !edditMode?
              <Countdown date={assignment.due}></Countdown>
              :
              <Datepicker dateParam={assignment.due} inputChanged={handleDateChange}></Datepicker>
            }
            
          </div>
        </div>

        <div className={styles.descriptionContainer}>
          <MarkdownEditor
            handleFromOutside={true}
            setText={(text)=>setContent(text)}
            defaultText={content}
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
                <button
                  className="btn btn-primary"
                  style={{ float: "right" }}
                  onClick={!edditMode?handleSaveAssignment:handleSaveEdit}
                >
                  {
                    !edditMode?
                    "Spechern"
                    :
                    "Änderungen Speichern"
                  }
              </button>
              <button
                  className="btn btn-cancel"
                  style={{ float: "right" }}
                  onClick={!edditMode?handleCancelAssignment:handleCancelEdit}
                >
                  {
                    !edditMode?
                    "Abbrechen"
                    :
                    "Änderungen Verwerfen"
                  }
                </button>
          </div>
        </div>
      </div>
    </>
  );
}
