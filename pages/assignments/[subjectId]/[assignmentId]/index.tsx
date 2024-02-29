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
import { getAssignmentById, updateAssignment } from '../../../../services/Assignment.service';
import { deleteFilesByIds, getFileInfosById, getFilesByIds, postFiles } from "../../../../services/File.service";
import FileObject from "../../../../models/File";
import FileDisplayObject from "../../../../models/FileDisplayObject";

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
  const subjectId = router.query.subjectId;

  const [files, setFiles] = useState<FileDisplayObject[]>([]);
  const [instructionFiles, setInstructionFiles] = useState<FileDisplayObject[]>([]);
  const [filesToDelete, setFilesToDelete] = useState<number[]>([]);
  const [filesAdded, setFilesAdded] = useState<number[]>([]);


  useEffect(() => {
    async function fetchDataAsync() {
      const assignmentIdAsNumber = parseInt(assignmentId as string);

      if (isNaN(assignmentIdAsNumber)) {
        return;
      }

      const res = await getAssignmentById(assignmentIdAsNumber);
      setAssignment(res);
      setAssignmentBackup(res);
      setDueDate(res.due);
      setContent(res.content);
        
        if (res.files&&res.files.length > 0) {
          const tmpFiles: FileDisplayObject[] = [];

          for (const iterator of res.files) {
            try {
              const tmpFileInfo = await getFileInfosById(iterator);
              tmpFiles.push({ id: iterator, name: tmpFileInfo.name });
            }
            catch (err) {
              console.log("GETFILENAMEERROR", err);
            }
          }
          setFiles(tmpFiles);
        }

        if(res.instructions&&res.instructions.length > 0){
          const tmpInstructionFiles: FileDisplayObject[] = [];
          
          for (const iterator of res.instructions) {
            try {
              const tmpFileInfo = await getFileInfosById(iterator);
              tmpInstructionFiles.push({ id: iterator, name: tmpFileInfo.name });
            }
            catch (err) {
              console.log("GETFILENAMEERROR", err);
            }
          }
  
          setInstructionFiles(tmpInstructionFiles);
        }
        
        
    }

    fetchDataAsync();
  }, [router.query]);

  useEffect(() => {
    console.log("CONTENT:",content);
  }, [content,dueDate]);


  async function handleUploadFilesUpdate(list: any[]) {
    try {
      const tmpFiles: number[] = await postFiles(list);
      const tmpFileObjects: FileDisplayObject[] = [];
      setFilesAdded([...filesAdded, ...tmpFiles]);
      for (const iterator of tmpFiles) {
        try {
          const tmpFileInfo = await getFileInfosById(iterator);
          tmpFileObjects.push({ id: iterator, name: tmpFileInfo.name });
        }
        catch (err) {
          console.log("GETFILENAMEERROR", err);
        }
      }

      setFiles([...files, ...tmpFileObjects]);
    }
    catch (err) {
      console.error(err);
    }
  }

  async function handleInstructionFilesUpdate(list: File[]) {
    try {
      const tmpFiles: number[] = await postFiles(list);
      const tmpFileObjects: FileDisplayObject[] = [];
      setFilesAdded([...filesAdded, ...tmpFiles]);
      for (const iterator of tmpFiles) {
        try {
          const tmpFileInfo = await getFileInfosById(iterator);
          tmpFileObjects.push({ id: iterator, name: tmpFileInfo.name });
        }
        catch (err) {
          console.log("GETFILENAMEERROR", err);
        }
      }

      setInstructionFiles([...instructionFiles, ...tmpFileObjects]);
    }
    catch (err) {
      console.error(err);
    }
  }

  function handleAcceptedFiles(list) {
    setAcceptedFilextentions(list);
  }

  async function handleCancelEdit() {
    setEdditMode(false);
    (document.getElementById("titleInput") as HTMLInputElement).value =
      assignmentBackup.title;
    const textarea = document.getElementById("textArea") as HTMLTextAreaElement;

    await restoreFiles(filesToDelete);
    await executeDeleteFiles(filesAdded);
    setFilesAdded([]);
    setFilesToDelete([]);

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


  async function handleSaveEdit() {
    const textarea = document.getElementById("textArea") as HTMLTextAreaElement;
    const descriptionInput = document.getElementById("descriptionInput") as HTMLInputElement;
    const fileIds = files.map((file) => file.id);
    const instructionFileIds = instructionFiles.map((file) => file.id);

    await executeDeleteFiles(filesToDelete);
    setFilesToDelete([]);
    setFilesAdded([]);

    console.log("SAVE",dueDate);

    const tmpAssignment:Assignment = {
        ...assignment,
        content: textarea.value,
        due: dueDate,
        title: (document.getElementById("titleInput") as HTMLInputElement).value,
        files: fileIds,
        instructions: instructionFileIds,
        description: descriptionInput.value
      }

    setAssignment(tmpAssignment);
    await updateAssignment(tmpAssignment);
    setEdditMode(false);
  }

  async function handleSaveAssignment() {
    console.log("UPDATE");
    assignment.files = files.map((file) => file.id);
    assignment.instructions = instructionFiles.map((file) => file.id);
    await executeDeleteFiles(filesToDelete);
    setFilesToDelete([]);
    setFilesAdded([]);

    updateAssignment(assignment).then((res) => {
      router.push("/assignments/" + assignment.subjectId);
    }).catch((err) => {
      console.error(err);
    });
  }

  async function executeDeleteFiles(fileIds:number[],isInstruction:boolean = true){
    //TODO: delete files
    await deleteFilesByIds(fileIds);
    if(isInstruction){
      const tmpList = [];
      for (const file of instructionFiles) {
        if (!fileIds.includes(file.id))
          tmpList.push(file);
      }
      setInstructionFiles(tmpList);
    }
    else{
      const tmpList = [];
      for (const file of files) {
        if (!fileIds.includes(file.id))
          tmpList.push(file);
      }
      setFiles(tmpList);
    }
  }

  async function restoreFiles(fileIds:number[],isInstruction:boolean = true){
    //TODO: restore files
    const restoredFiles: FileDisplayObject[] = [];
    for (const iterator of fileIds) {
      const tmpFileInfo = await getFileInfosById(iterator);
      restoredFiles.push({ id: iterator, name: tmpFileInfo.name });
    }

    if(isInstruction){
      setInstructionFiles([...instructionFiles, ...restoredFiles]);
    }
    else{
      setFiles([...files, ...restoredFiles]);
    }
  }

  async function handleCancelAssignment() {
    await restoreFiles(filesToDelete,false);
    await executeDeleteFiles(filesAdded);
    setFilesAdded([]);
    setFilesToDelete([]);
    router.push("/assignments/" + subjectId);
  }

  function handleDateChange(date) {
    setDueDate(date);
  }

  function handleDeleteUploadFile(key) {
    //TODO: change this
  }

  function handleDeleInstructionFile(key) {
    //TODO: change this
  }

  return (
    <>
      <div className={styles.editcontainer}>
        <div className={styles.editheadContainer}>
          <div className={styles.edithead}>
            <input
              className={`${edditMode ? styles.edditOn : styles.edditOff}`}
              readOnly={!edditMode}
              defaultValue={assignment && assignment.title}
              id="titleInput"
            ></input>
            {
              !edditMode && assignment && assignment.userId == context.userContext.id &&
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
                  <Countdown date={dueDate}></Countdown>
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
                <input id='descriptionInput' type="text" placeholder="Description" defaultValue={assignment && assignment.description && assignment.description}></input>
                :
                <p>{assignment && assignment.description && assignment.description}</p>
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
          instructionFiles.length > 0 &&
          <>
            <div className={styles.instructionHeader}>
              <div>
                <h1>Instructions</h1>
              </div>
            </div>
            <div className={styles.instructionWrapper}>
              <div className={styles.instructionContainer}>
                {instructionFiles.map((file, i) => {
                  return (
                    <FileListObject
                      key={"FileObj_" + i}
                      file={file}
                      asCard={true}
                      deleteFunction={handleDeleInstructionFile}
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

            <div className={styles.uploadfileWrapper}>
              {
                files.length == 0 ?
                  <>
                    <h3>no Files Uploaded!</h3>
                    <p>Drag and drop Files to upload them</p>
                  </>
                  :
                  <>
                    <div className={styles.uploadfileheader}>
                      {files.length != 0 && <h1>Upload Files</h1>}
                    </div>
                    <div className={styles.uploadfileContainer}>
                      {files.map((file, index) => {
                        return (
                          <FileListObject
                            key={index}
                            file={file}
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
