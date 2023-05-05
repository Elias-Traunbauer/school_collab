import React, { CSSProperties, useEffect, useState } from "react";
import styles from "../styles/Chatroom.module.scss";
import MessageComponent from "./MessageComponent";
import Image from "next/image";
import FileListObject from "./FileListObject";
import Message from "../models/Message";
export default function Chatroom() {
  const mockName = "alo";
  const createdAt = new Date(1, 1, 1, 1, 1);
  const mockuser = { id: 2, name: "alo", color: "red" };
  const mockMemberList = [
    {
      name: "rsheed",
      color: "blue",
    },
    {
      name: "sebastian",
      color: "green",
    },
  ];
  const mockDescription = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
const mockProfile = "person.svg";
  const [profile, setProfile] = useState(mockProfile);
  // Message Mock using the interface
  const mockmessages: Message[] = [
    {
      id: 1,
      text: "Hello",
      author: {id: 1, name: "tomas", color: "green"},
      createdAt: new Date(2021, 1, 1, 1, 1),
      files: [],
      answer: null,
    },
    {
      id: 2,
      text: "Hello",
      author: {id: 1, name: "tomas", color: "green"},
      createdAt: new Date(2021, 1, 1, 1, 1),
      files: [],
      answer: null,
    }
  ];

      
  const [messages, setMessages] = useState(mockmessages);
  const [files, setFiles] = useState([]);
  const [infoIsHidden, setInfoIsHidden] = useState(true);
  const [nameEdit, setNameEdit] = useState(false);
  const [name, setName] = useState(mockName);
  const [backUpName, setBackUpName] = useState(mockName);
  const [description, setDescription] = useState(mockDescription);
  const [answer, setAnswer] = useState(null);


  useEffect(() => {
    scrollDown();
  }, []);

  useEffect(() => {
    scrollDown();
  }, [messages]);

  function compareDate(currentDate: Date, date: Date) {
    if (
      currentDate.getDate() == date.getDate() &&
      currentDate.getMonth() == date.getMonth() &&
      currentDate.getFullYear() == date.getFullYear()
    ) {
      return true;
    } else {
      return false;
    }
  }

  function getDate(date: Date) {
    const month = date.getMonth().toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const year = date.getFullYear();

    if (
      year == new Date().getFullYear() &&
      month == new Date().getMonth().toString().padStart(2, "0") &&
      day == new Date().getDate().toString().padStart(2, "0")
    )
      return "Today";
    else if (
      year == new Date().getFullYear() &&
      month == new Date().getMonth().toString().padStart(2, "0") &&
      day == (new Date().getDate() - 1).toString().padStart(2, "0")
    )
      return "Yesterday";
    else return `${day}.${month}.${year}`;
  }

  function handleInputChange(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      sendMessage();
    }
  }

  function sendMessage() {
    const input = document.getElementById("messageField") as HTMLInputElement;
    const message = input.value;
    if (message.length > 0 || files.length > 0) {
      const newMessage = {
        id: messages.length + 1,
        author: mockuser,
        text: message,
        createdAt: new Date(),
        files: files,
        answer: answer,
      };
      setMessages([...messages, newMessage]);
      input.value = "";
      setFiles([]);
      setAnswer(null);
    }
  }

  function scrollDown() {
    const chatroom = document.getElementById("chatBody") as HTMLDivElement;
    chatroom.scrollTop = chatroom.scrollHeight;
  }

  function displayAnswer(answer:Message){
    setAnswer(answer);
  }

  function printMessages() {
    let currentDate = messages[0].createdAt;
    return (
      <>
        {messages.map((message, index) => {
          if (!compareDate(currentDate, message.createdAt) || index == 0) {
            currentDate = message.createdAt;
            return (
              <>
                <div key={"date_" + index} className={styles.dateSection}>
                  <div>
                    <div></div>
                    <p>{getDate(message.createdAt)}</p>
                    <div></div>
                  </div>

                </div>
                <MessageComponent
                  key={"message_" + index}
                  handleAnswer={displayAnswer}
                  displayName={index != 0
                    ? messages[index - 1].author.id != message.author.id
                    : true} 
                    message={message}                
                    ></MessageComponent>
              </>
            );
          } else {
            return (
              <MessageComponent
                key={"message_" + index}
                handleAnswer={displayAnswer}
                displayName={index != 0
                  ? messages[index - 1].author.id != message.author.id
                  : true} 
                  message={message}             
                ></MessageComponent>
            );
          }
        })}
      </>
    );
  }

  function addFiles() {
    const input = document.getElementById("fileInput") as HTMLInputElement;
    input.click();
    console.log(answer != null || files.length > 0)
  }

  function uploadFile(e) {
    setFiles([...files, ...e.target.files]);
    e.target.value = "";
    const input = document.getElementById("messageField") as HTMLInputElement;
    input.focus();
  }

  function uploadProfile(e) {
    console.log("change Profile");
  }

  function toggleInfo() {
    const info = document.getElementById("info") as HTMLDivElement;

    if (infoIsHidden) {
      info.classList.remove(styles.slideOut);
      info.classList.add(styles.slideIn);
    } else {
      info.classList.remove(styles.slideIn);
      info.classList.add(styles.slideOut);
    }

    setInfoIsHidden(!infoIsHidden);
  }

function changeNameEditMode(){

    if(!nameEdit){
        setBackUpName(name);
    }
    setNameEdit(!nameEdit);
}

function changeName(change:boolean){
    if(change){
        const input = document.getElementById("nameInput") as HTMLInputElement;
        setName(input.value);
    }
    else
        setName(backUpName);

    changeNameEditMode();
}

function deleteFileItem(itemKey = 0){
  const newFiles = files.filter((file,index) => {
    return index != itemKey;
} );
  setTimeout(() => {
    setFiles(newFiles);
  }, 200);
    
}


  function handleInfoProfileClick() {
    const input = document.getElementById(
      "infoProfileInput"
    ) as HTMLInputElement;
    input.click();
  }

  return (
    <div className={styles.container}>

      <div className={styles.contentWrapper}>
        <div className={styles.contentContainer}>
          <div id="chatBody" className={styles.body}>
            <div>
              {printMessages()}
              <p></p>
            </div>
          </div>
          <div className={styles.foot}>
            {
                answer &&
                <div style={{'--answerColor': answer.author.color} as CSSProperties}  className={styles.answer}>
                <div>
                <div>
                  <p>{answer.author.name}</p>
                  <p>{answer.text}</p>
                </div>
                <button onClick={() => setAnswer(null)}>
                  <div></div>
                  </button>
                </div>
              </div>
            }

            {
                files.length>0 &&
                <div className={`${styles.fileContainer} ${answer && styles.extention}`}>
                  <div>
                    <p>{files.length} Files</p>
                    <div>
                    {
                     files.map((file,index) => {
                        return (
                            <FileListObject deleteFunction={deleteFileItem} key={"file_"+index} itemKey={index} asCard={false} file={{name:file.name}}></FileListObject>
                        );
                    })
                }
                    </div>
                  
                  </div>
                
            </div>
            }
            
            <div className={answer != null || files.length > 0 ? styles.extention : "" }>
              <div onClick={addFiles}>
                <div className={styles.dataBtn}></div>
              </div>
              <input
                onKeyDown={(e) => handleInputChange(e)}
                id="messageField"
                type="text"
                placeholder="Type a message..."
                autoComplete="off"
              ></input>
              <div onClick={sendMessage}>
                <div className={styles.sendBtn}></div>
              </div>
            </div>
          </div>
        </div>

        <div id="info" className={styles.info}>
            <div>
                <Image src={'/'+profile} width={20} height={20} alt='Profile'></Image>
                <button>Change</button>
            </div>
            
            <div>
            <div>
            {!nameEdit ? (
              <>
                <h1>{name}</h1>
                <div>
                    <button onClick={changeNameEditMode} className={styles.editName}></button>
                </div>
              </>
            ) : (
              <>
                <input id="nameInput" type="text" defaultValue={name}></input>
                <div>
                    <button onClick={()=>changeName(true)} className={styles.check}></button>
                </div>
                <div>
                    <button onClick={()=>changeName(false)} className={styles.cancel}></button>
                </div>
              </>
            )}
          </div>
            </div>
          

            <div>
                <div>
                    <h1>Description</h1>
                    <p>{description.length>0?description:<span>No Description</span>}</p>
                </div>
            </div> 



            <div>
                <div>
                    <button>Verlassen</button>
                    <button>Melden</button>
                </div>
            </div>   
        </div>
      </div>

      <input
        onChange={(e) => uploadProfile(e)}
        id="infoProfileInput"
        type="file"
        hidden={true}
      ></input>
      <input
        onChange={(e) => uploadFile(e)}
        id="fileInput"
        type="file"
        hidden={true}
      ></input>
    </div>
  );
}
