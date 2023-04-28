import React, { useEffect, useState } from "react";
import styles from "../styles/Chatroom.module.scss";
import Message from "./Message";
import Image from "next/image";
export default function Chatroom() {
  const mockName = "alo";
  const createdAt = new Date(1, 1, 1, 1, 1);
  const mockuser = { id: 1, name: "alo", color: "red" };
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
  const mockmessages = [
    {
      id: 1,
      author: mockuser,
      text: "Hello World",
      createdAt: new Date(1, 1, 1, 1, 1),
    },
    {
      id: 2,
      author: { id: 2, name: "rsheed", color: "blue" },
      text: "Hello World",
      createdAt: new Date(1, 1, 1, 1, 1),
    },
    {
      id: 3,
      author: { id: 3, name: "sebastian", color: "green" },
      text: "Hello World",
      createdAt: new Date(1, 1, 1, 1, 1),
    },
    {
      id: 4,
      author: { id: 3, name: "sebastian", color: "green" },
      text: "Hello World",
      createdAt: new Date(1, 1, 1, 1, 1),
    },
    {
      id: 4,
      author: { id: 3, name: "sebastian", color: "green" },
      text: "Hello World",
      createdAt: new Date(1, 1, 1, 1, 1),
    },
    {
      id: 4,
      author: { id: 3, name: "sebastian", color: "green" },
      text: "Hello World",
      createdAt: new Date(1, 1, 1, 1, 1),
    },
    {
      id: 4,
      author: { id: 3, name: "sebastian", color: "green" },
      text: "Hello World",
      createdAt: new Date(1, 1, 1, 1, 1),
    },
    {
      id: 4,
      author: { id: 3, name: "sebastian", color: "green" },
      text: "Hello World",
      createdAt: new Date(1, 1, 1, 1, 1),
    },
    {
      id: 4,
      author: { id: 3, name: "sebastian", color: "green" },
      text: "Hello World",
      createdAt: new Date(1, 1, 1, 1, 1),
    },
    {
      id: 4,
      author: { id: 3, name: "sebastian", color: "green" },
      text: "Hello World",
      createdAt: new Date(1, 1, 1, 1, 1),
    },
    {
      id: 4,
      author: { id: 3, name: "sebastian", color: "green" },
      text: "Hello World",
      createdAt: new Date(1, 1, 1, 1, 1),
    },
    {
      id: 4,
      author: { id: 3, name: "sebastian", color: "green" },
      text: "Hello World",
      createdAt: new Date(1, 1, 1, 1, 1),
    },
    {
      id: 4,
      author: { id: 3, name: "sebastian", color: "green" },
      text: "Hello World",
      createdAt: new Date(1, 1, 1, 1, 1),
    },
    {
      id: 4,
      author: { id: 3, name: "sebastian", color: "green" },
      text: "Hello World",
      createdAt: new Date(1, 1, 1, 1, 1),
    },
    {
      id: 4,
      author: { id: 3, name: "sebastian", color: "green" },
      text: "Hello World",
      createdAt: new Date(1, 1, 1, 1, 1),
    },
  ];
  const [messages, setMessages] = useState(mockmessages);
  const [files, setFiles] = useState([]);
  const [infoIsHidden, setInfoIsHidden] = useState(true);
  const [nameEdit, setNameEdit] = useState(false);
  const [name, setName] = useState(mockName);
  const [backUpName, setBackUpName] = useState(mockName);
  const [description, setDescription] = useState(mockDescription);
  const [descriptionIsExtended, setDescriptionIsExtended] = useState(false);


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
    if (message.length > 0) {
      const newMessage = {
        id: messages.length + 1,
        author: mockuser,
        text: message,
        createdAt: new Date(),
        files: files,
      };
      setMessages([...messages, newMessage]);
      input.value = "";
    }
  }

  function scrollDown() {
    const chatroom = document.getElementById("chatBody") as HTMLDivElement;
    chatroom.scrollTop = chatroom.scrollHeight;
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
                  <p>{getDate(message.createdAt)}</p>
                </div>
                <Message
                  key={"message_" + index}
                  author={message.author}
                  text={message.text}
                  createdAt={message.createdAt}
                  displayName={
                    index != 0
                      ? messages[index - 1].author.id != message.author.id
                      : true
                  }
                ></Message>
              </>
            );
          } else {
            return (
              <Message
                key={"message_" + index}
                author={message.author}
                text={message.text}
                createdAt={message.createdAt}
                displayName={
                  index != 0
                    ? messages[index - 1].author.id != message.author.id
                    : true
                }
              ></Message>
            );
          }
        })}
      </>
    );
  }

  function addFiles() {
    const input = document.getElementById("fileInput") as HTMLInputElement;
    input.click();
  }

  function uploadFile(e) {
    setFiles([...files, ...e.target.files]);
    sendMessage();
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

function changeDescriptionHeight(){
    setDescriptionIsExtended(!descriptionIsExtended);
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
            <div>
              <div onClick={addFiles}>
                <div className={styles.dataBtn}></div>
              </div>
              <input
                onKeyDown={(e) => handleInputChange(e)}
                id="messageField"
                type="text"
                placeholder="Type a message..."
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
                <div onClick={changeDescriptionHeight} className={descriptionIsExtended&&styles.fixedHeight}>
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
