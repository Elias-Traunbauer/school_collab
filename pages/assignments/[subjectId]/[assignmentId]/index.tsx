import { useState, useEffect, useContext } from "react";
import Countdown from "../../../../components/Countdown";
import styles from "../../../../styles/Assignment.module.scss";
import Image from "next/image";
import { useRouter } from "next/router";
import FileListObject from "../../../../components/FileListObject";
import FileUpload from "../../../../components/FileUpload";
import MarkdownEditor from "../../../../components/MarkdownEditor";
import Assignment from "../../../../models/Assignment";
import Group from "../../../../models/Group";
import Subject from "../../../../models/Subject";
import UserContext from '../../../../components/UserContext'
import Datepicker from "../../../../components/Datepicker";
import { getAssignmentById,updateAssignment } from '../../../../services/Assignment.service';
import { getFilesByIds, postFiles } from "../../../../services/File.service";
import FileObject from "../../../../models/File";

export default function AssignmentEdit() {
  // TODO: fetch assignment
  const context = useContext(UserContext);

  const [assignment, setAssignment] = useState<Assignment>();
  const [edditMode, setEdditMode] = useState(false);
  const [assignmentBackup, setAssignmentBackup] = useState<Assignment>();
  const [dueDate, setDueDate] = useState<Date>();
  const [content, setContent] = useState<string>();
  const [acceptedFilextentions, setAcceptedFilextentions] = useState([]);
  const router = useRouter();
  const assignmentId = router.query.assignmentId;


  useEffect(() => {
    async function fetchDataAsync() {
      const assignmentIdAsNumber = parseInt(assignmentId as string);

      if(isNaN(assignmentIdAsNumber)){
        return;
      }

      getAssignmentById(assignmentIdAsNumber).then((res) => {
        setAssignment(res);
        setAssignmentBackup(res);
        setDueDate(res.due);
        setContent(res.content);
      }).catch((err) => {
        console.error(err);
      });
    }

    fetchDataAsync();
  }, []);


  async function handleUploadFilesUpdate(list:File[]) {
    const tmpFiles:number[] = await postFiles(list);
    const tmpFileObjects:FileObject[] = [];
    for (const iterator of tmpFiles) {
      const obj:FileObject = {
        content: "",
        name: "",
        contentType: "",
        mimeType: "",
        size: 0,
        uploadedById: context.userContext.id,
        id: iterator,
        version: ""
      }
      tmpFileObjects.push(obj);
    }
    setAssignment({
      ...assignment,
      files: [...assignment.files, ...tmpFileObjects],
    });
  }
  async function handleInstructionFilesUpdate(list:File[]) {
    const tmpFiles:number[] = await postFiles(list);
    const tmpFileObjects:FileObject[] = [];
    for (const iterator of tmpFiles) {
      const obj:FileObject = {
        content: "",
        name: "",
        contentType: "",
        mimeType: "",
        size: 0,
        uploadedById: context.userContext.id,
        id: iterator,
        version: ""
      }
      tmpFileObjects.push(obj);
    }
    setAssignment({
      ...assignment,
      instructions: [...assignment.instructions, ...tmpFileObjects],
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
    setAssignment({ ...assignmentBackup, content: assignmentBackup.content });
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
    console.log("UPDATE");
    updateAssignment(assignment).then((res) => {
      router.push("/assignments/"+assignment.subjectId);
    }).catch((err) => {
      console.error(err);
    });
  }

  function handleCancelAssignment() {
    router.push("/assignments/"+assignment.subjectId);
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
              defaultValue={assignment&&assignment.title}
              id="titleInput"
            ></input>
            {
              !edditMode && assignment &&  assignment.userId == context.userContext.id &&
              <button onClick={handleEddit}>
                <Image src="/edit.svg" width={20} height={20} alt={"edit"}></Image>
              </button>
            }
          </div>
        </div>
        <div className={styles.countdownContainer}>
          <div>
            {
              edditMode ?
                <Datepicker dateParam={new Date(assignment.due)} inputChanged={handleDateChange}></Datepicker>
                :
                assignment && assignment.due > new Date() ?
                  <Countdown date={assignment.due}></Countdown>
                  :
                  <p>Abgelaufen</p>
            }
          </div>
        </div>

        <div className={styles.descriptionContainer}>
              <div className={styles.descriptionTextContainer}>
                <label>Description</label>
                {
                   edditMode ?
                   <input id='descriptionInput' type="text" placeholder="Description" defaultValue={assignment&&assignment.description&&assignment.description}></input>
                   :
                  <p>{assignment&&assignment.description&&assignment.description}</p>
                }
              </div>
          <MarkdownEditor
            handleFromOutside={true}
            setText={(text) => setContent(text)}
            defaultText={content}
            containerWidth={100}
            isEditable={edditMode}
          ></MarkdownEditor>
        </div>

        {
          assignment&&assignment.instructions&&assignment.instructions.length > 0 &&
          <>
            <div className={styles.instructionHeader}>
              <div>
                <h1>Instructions</h1>
              </div>
            </div>
            <div className={styles.instructionWrapper}>
              <div className={styles.instructionContainer}>
                {assignment.instructions.map((file, i) => {
                  return (
                    <FileListObject
                      key={"FileObj_" + i}
                      itemKey={i}
                      file={file}
                      asCard={true}
                      deleteFunction={() => handleDeleInstructionFile(i)}
                    ></FileListObject>
                  );
                })}
              </div>
            </div>
          </>
        }



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
          assignment&&assignment.due > new Date() ?
          <div className={styles.uploadfileWrapper}>
          {
            assignment.files.length == 0 ?
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
                        file={file}
                        asCard={false}
                        deleteFunction={handleDeleteUploadFile}
                      ></FileListObject>
                    );
                  })}
                </div></>
          }
        </div>
        :
        <>
          <div className={styles.solutionWrapper}>
            <h1>Not Implementet yet</h1>
          </div>
        </>
        }
        

        <div className={styles.editButton}>
          <div>
            <button
              className="btn btn-primary"
              style={{ float: "right" }}
              onClick={!edditMode ? handleSaveAssignment : handleSaveEdit}
            >
              {
                !edditMode ?
                  "Spechern"
                  :
                  "Änderungen Speichern"
              }
            </button>
            <button
              className="btn btn-cancel"
              style={{ float: "right" }}
              onClick={!edditMode ? handleCancelAssignment : handleCancelEdit}
            >
              {
                !edditMode ?
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
