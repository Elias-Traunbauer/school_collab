import React, { CSSProperties, useEffect, useState } from "react";
import styles from "../styles/Chatroom.module.scss";
import MessageComponent from "./MessageComponent";
import Image from "next/image";
import FileListObject from "./FileListObject";
import Chat from "../models/Chat";
import ChatMessage from "../models/ChatMessage";
import { getMessages, readChat, sendMessage, updateChat, updateMessage } from "../services/Chat.service";
import { get } from "http";
export default function Chatroom({ chat }: { chat: Chat | undefined }) {
  const defaultProfile = "person.svg";
  const [infoIsHidden, setInfoIsHidden] = useState(true);
  const [nameEdit, setNameEdit] = useState(false);
  const [answer, setAnswer] = useState<ChatMessage>(null);
  const [scrollBody, setScrollBody] = useState(false);
  const [backUpName, setBackUpName] = useState(chat&&chat.name);
  const [name, setName] = useState(chat&&chat.name);
  const [loadNewMessages, setLoadNewMessages] = useState(false);


  useEffect(() => {
    async function fetchData() {
      console.log("CHATROOM",chat);
      setName(chat&&chat.name);

      if (!chat || !chat.chatMessages) {
        return;
      }
      getMessages(chat.id).then((firstMessages) => {
        chat.chatMessages = firstMessages;
        if(chat.chatMessages.length > 0)
        readChat(chat.id, chat.chatMessages[chat.chatMessages.length - 1].id);
      });
    }
    fetchData();
    scrollDown();
  }, [chat]);

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
      handleSendMessage();
    }
  }

  async function handleSendMessage() {
    const input = document.getElementById("messageField") as HTMLInputElement;
    const message = input.value;
    if (message.length > 0) {
      input.value = "";
      await sendMessage(chat.id, message, answer && answer.id);
      setAnswer(null);
    }
  }

  function scrollDown() {
    const chatroom = document.getElementById("chatBody") as HTMLDivElement;
    chatroom.scrollTo({
      top: chatroom.scrollHeight,
      behavior: "smooth"
    });
  }

  function displayAnswer(answer: ChatMessage) {
    setAnswer(answer);
    const input = document.getElementById("messageField") as HTMLInputElement;
    input.focus();
  }

  function scrollToMessage(id: number) {
    //TODO:Scroll to message
  }

  function printMessages() {
    if (!chat || !chat.chatMessages) {
      return <></>;
    }
    let currentDate = chat.chatMessages[0].created;
    return (
      <>
        {chat.chatMessages.map((message, index) => {
          if (!compareDate(currentDate, message.created) || index == 0) {
            currentDate = message.created;
            return (
              <>
                <div key={"date_" + index} className={styles.dateSection}>
                  <div>
                    <div></div>
                    <p>{getDate(message.created)}</p>
                    <div></div>
                  </div>

                </div>
                <MessageComponent
                  callBackAnswerClicked={scrollToMessage}
                  key={"message_" + index}
                  handleAnswer={displayAnswer}
                  displayName={index != 0
                    ? chat.chatMessages[index - 1].userId != message.userId
                    : true}
                  message={message}
                ></MessageComponent>
              </>
            );
          } else {
            return (
              <MessageComponent
                callBackAnswerClicked={scrollToMessage}
                key={"message_" + index}
                handleAnswer={displayAnswer}
                displayName={index != 0
                  ? chat.chatMessages[index - 1].userId != message.userId
                  : true}
                message={message}
              ></MessageComponent>
            );
          }
        })}
      </>
    );
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

  function changeNameEditMode() {
    if (!nameEdit) {
      setBackUpName(chat.name);
    }
    setNameEdit(!nameEdit);
  }

  async function changeName(change: boolean) {
    if (change) {
      const input = document.getElementById("nameInput") as HTMLInputElement;
      setName(input.value);
      chat.name = input.value;
      await updateChat(chat);
    }
    else
      setName(backUpName);

    changeNameEditMode();
  }

  function handleDragged() {
    console.log("dragged");
    const chatBody = document.getElementById("chatBody") as HTMLDivElement;
    chatBody.classList.add(styles.dragged);
  }

  function handleLeave() {
    console.log("leave");
    const chatBody = document.getElementById("chatBody") as HTMLDivElement;
    chatBody.classList.remove(styles.dragged);
  }

  function handleDropped(e) {
    e.preventDefault();
    console.log("droped " + e.dataTransfer.files);
    const chatBody = document.getElementById("chatBody") as HTMLDivElement;
    chatBody.classList.remove(styles.dragged);
    const files = e.dataTransfer.files;
  }

  function handleScroll() {
    // if position is at the bottom
    const chatBody = document.getElementById("chatBody") as HTMLDivElement;
    const scrollBodyBtn = document.getElementById("scrollBodyBtn") as HTMLButtonElement;
    if (chatBody.scrollTop + chatBody.clientHeight >= chatBody.scrollHeight) {
      setScrollBody(false);
    }
    else {
      setScrollBody(true);
    }

    // if position is at the top
    if (chatBody.scrollTop == 0 || !loadNewMessages) {
      getMessages(chat.id, chat.chatMessages.length).then((messages) => {
        if(messages.length == 0){
          setLoadNewMessages(false);
          return;
        }
        const tmpMessages = messages;
        tmpMessages.push(...chat.chatMessages);
        chat.chatMessages = tmpMessages;
        setLoadNewMessages(true);
      });
    }
  }

  return (
    <div onDragOver={handleDragged} onDragLeave={handleLeave} className={styles.container}>

      <div className={styles.contentWrapper}>
        <div className={styles.contentContainer}>
          <div onScroll={handleScroll} onDrop={(e) => handleDropped(e)} id="chatBody" className={styles.body}>
            <div>
              {printMessages()}
              <p></p>
            </div>
          </div>
          <div className={styles.foot}>
            {
              scrollBody &&
              <button onClick={scrollDown} id='scrollBodyBtn' className={styles.scrollBodyButton}>
                <Image width={25} height={25} alt="dasd" src={"/arrow_left.svg"}></Image>
              </button>
            }
            {
              answer &&
              <div className={styles.answer}>
                <div>
                  <div>
                    <p>{answer.user.username}</p>
                    <p>{answer.content}</p>
                  </div>
                  <button onClick={() => setAnswer(null)}>
                    <div></div>
                  </button>
                </div>
              </div>
            }

            <div className={answer != null ? styles.extention : ""}>
              <input
                onKeyDown={(e) => handleInputChange(e)}
                id="messageField"
                type="text"
                placeholder="Type a message..."
                autoComplete="off"
              ></input>
              <div onClick={handleSendMessage}>
                <div className={styles.sendBtn}></div>
              </div>
            </div>
          </div>
        </div>

        <div id="info" className={styles.info}>
          {
            chat &&
            <>
              <div>
                <Image className={chat.picture == defaultProfile && styles.defaultProfile} src={'/' + chat.picture} width={20} height={20} alt='Profile'></Image>
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
                        <button onClick={() => changeName(true)} className={styles.check}></button>
                      </div>
                      <div>
                        <button onClick={() => changeName(false)} className={styles.cancel}></button>
                      </div>
                    </>
                  )}
                </div>
              </div>

              <div>
                <div>
                  <h1>Description</h1>
                  <p>{chat&&chat.description&&chat.description.length > 0 ? chat.description : <span>No Description</span>}</p>
                </div>
              </div>

              <div>
                <div>
                  <button><span>Verlassen</span></button>
                  <button><span>Melden</span></button>
                </div>
              </div>
            </>
          }

        </div>
      </div>

      <input
        onChange={(e) => uploadProfile(e)}
        id="infoProfileInput"
        type="file"
        hidden={true}
      ></input>
    </div>
  );
}
