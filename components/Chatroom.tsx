import React, { CSSProperties, useEffect, useState } from "react";
import styles from "../styles/Chatroom.module.scss";
import MessageComponent from "./MessageComponent";
import Image from "next/image";
import FileListObject from "./FileListObject";
import Chat from "../models/Chat";
import ChatMessage from "../models/ChatMessage";
import {
  getMessages,
  readChat,
  sendMessage,
  subscribeToNewMessages,
  updateChat,
  updateMessage,
} from "../services/Chat.service";
import { get } from "http";
export default function Chatroom({
  chatParam,
  insertMessage,
}: {
  chatParam: Chat | undefined;
  insertMessage: Function;
}) {
  const defaultProfile = "person.svg";
  const [infoIsHidden, setInfoIsHidden] = useState(true);
  const [nameEdit, setNameEdit] = useState(false);
  const [answer, setAnswer] = useState<ChatMessage>(null);
  const [scrollBody, setScrollBody] = useState(false);
  const [backUpName, setBackUpName] = useState(chatParam && chatParam.name);
  const [name, setName] = useState(chatParam && chatParam.name);
  const [description, setDescription] = useState(chatParam && chatParam.description);
  const [loadNewMessages, setLoadNewMessages] = useState(false);
  const [chat, setChat] = useState<Chat>(chatParam);
  const [descriptionbackup, setDescriptionBackup] = useState(chatParam && chatParam.description);

  useEffect(() => {
    console.log("CHATROOM", chatParam);
    async function fetchData() {
      if (!chatParam) {
        return;
      }

      setName(chatParam.name && chatParam.name);
      setDescription(chatParam.description && chatParam.description);
      setBackUpName(chatParam.name && chatParam.name);
      setDescriptionBackup(chatParam.description && chatParam.description);

      getMessages(chatParam.id).then((firstMessages) => {
        chatParam.chatMessages = firstMessages.reverse();
        setChat(chatParam);
        console.log("FIRSTMESSAGES", chatParam.chatMessages);
        if (chatParam.chatMessages.length > 0)
          readChat(
            chatParam.id,
            chatParam.chatMessages[chatParam.chatMessages.length - 1].id
          );
      });
    }
    fetchData();
    scrollDown();
  }, [chatParam]);

  useEffect(() => {
    if (!chat) {
      return;
    }

    const sse = subscribeToNewMessages();

    console.log("SSE", sse);

    sse.onmessage = (event) => {
      const res = JSON.parse(event.data);
      const tmpMessage: ChatMessage = {
        chatId: res.ChatId,
        content: res.Content,
        created: new Date(res.Created),
        userId: res.User.Id,
        read: false,
        id: null,
        version: "",
        user: res.User,
      };

      console.log("tmpMessage.chatId == chat.id", chat.id == tmpMessage.chatId);

      if (tmpMessage.chatId == chat.id) {
        const tmpChat = chat;
        tmpChat.chatMessages.push(tmpMessage);
        setChat((chat) => ({ ...chat, chatMessages: tmpChat.chatMessages }));
        scrollInstantDown();
      } else {
        console.log("OTHER CHAT", tmpMessage);
        insertMessage(tmpMessage);
      }
    };

    return () => {
      sse.close();
    };
  }, [chat?.id]);

  useEffect(() => {
    console.log("CHAT", chat);
    scrollInstantDown();
  }, [chat]);

  function scrollInstantDown() {
    const chatroom = document.getElementById("chatBody") as HTMLDivElement;
    chatroom.scrollTo({
      top: chatroom.scrollHeight,
      behavior: "auto",
    });
  }

  function compareDate(currentDate: Date, date: Date) {
    currentDate = new Date(currentDate);
    date = new Date(date);
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
    date = new Date(date);
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
      console.log("SENT");
      await sendMessage(chat.id, message, answer && answer.id);
      setAnswer(null);
    }
  }

  function scrollDown() {
    const chatroom = document.getElementById("chatBody") as HTMLDivElement;
    chatroom.scrollTo({
      top: chatroom.scrollHeight,
      behavior: "smooth",
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
    let currentDate =
      chat.chatMessages.length > 0 ? chat.chatMessages[0].created : new Date();
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
                  displayName={
                    index != 0
                      ? chat.chatMessages[index - 1].userId != message.userId
                      : true
                  }
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
                displayName={
                  index != 0
                    ? chat.chatMessages[index - 1].userId != message.userId
                    : true
                }
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
    console.log("changeNameEditMode", nameEdit);
    if (!nameEdit) {
      setBackUpName(chat.name);
      setDescriptionBackup(chat.description);
    }
    setNameEdit(!nameEdit);
  }

  async function changeInfo(change: boolean) {
    if (change) {
      const input = document.getElementById("nameInput") as HTMLInputElement;
      setName(input.value);
      const txtArea = document.getElementById("txtAreaDescription") as HTMLTextAreaElement;
      setDescription(txtArea.value);
      chat.description = txtArea.value;
      chat.name = input.value;
      console.log(input.value);
      //TODO: Update Chat
      //await updateChat(chat);
    } else{
      setName(backUpName);
      setDescription(descriptionbackup);
    };

    changeNameEditMode();
  }

  function handleScroll() {
    // if position is at the bottom
    const chatBody = document.getElementById("chatBody") as HTMLDivElement;
    const scrollBodyBtn = document.getElementById(
      "scrollBodyBtn"
    ) as HTMLButtonElement;
    //include a tolerance of 1px
    if (
      chatBody.scrollTop + chatBody.clientHeight >=
      chatBody.scrollHeight - 1
    ) {
      setScrollBody(false);
    } else {
      setScrollBody(true);
    }

    // if position is at the top
    if (chatBody.scrollTop == 0 || !loadNewMessages) {
      getMessages(chat.id, chat.chatMessages.length).then((messages) => {
        if (messages.length == 0) {
          setLoadNewMessages(false);
          return;
        }
        let tmpMessages = messages.reverse();
        tmpMessages =  [...tmpMessages,...chat.chatMessages]
        chat.chatMessages = tmpMessages;
        setLoadNewMessages(true);
      });
    }
  }

  function PrintChatName() {
    if (!chat) {
      return <></>;
    }
    //first two letters of the name
    if (chat.name.length > 1) return chat.name.substring(0, 2).toUpperCase();
    else return chat.name.toUpperCase();
  }

  return (
    <div
      className={styles.container}
    >
      <div className={styles.contentWrapper}>
        <div className={styles.contentContainer}>
          <div
            onScroll={handleScroll}
            id="chatBody"
            className={styles.body}
          >
            <div>
              {printMessages()}
              <p></p>
            </div>
          </div>
          <div className={styles.foot}>
            {scrollBody && (
              <button
                onClick={scrollDown}
                id="scrollBodyBtn"
                className={styles.scrollBodyButton}
              >
                <Image
                  width={25}
                  height={25}
                  alt="dasd"
                  src={"/arrow_left.svg"}
                ></Image>
              </button>
            )}
            {answer && (
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
            )}

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
          {chat && (
            <>
              <div className={styles.editContainer}>
                {!nameEdit ? (
                  <div>
                    <button
                      onClick={changeNameEditMode}
                      className={styles.editName}
                    ></button>
                  </div>
                ) : (
                  <>
                    
                    <div>
                      <button
                        onClick={() => changeInfo(false)}
                        className={styles.cancel}
                      ></button>
                    </div>
                    <div>
                      <button
                        onClick={() => changeInfo(true)}
                        className={styles.check}
                      ></button>
                    </div>
                  </>
                )}
              </div>
              <div>
                <div className={styles.defaultProfile}>
                  <p>{PrintChatName()}</p>
                </div>
              </div>

              <div>
                <div>
                  {!nameEdit ? (
                    <>
                      <h1>{name}</h1>
                    </>
                  ) : (
                    <>
                      <input
                        id="nameInput"
                        type="text"
                        defaultValue={name}
                      ></input>
                    </>
                  )}
                </div>
              </div>

              <div>
                <div>
                  <h1>Description</h1>
                  {
                    !nameEdit?
                    <p>
                    {chat && chat.description && chat.description.length > 0 ? (
                      description
                    ) : (
                      <span>No Description</span>
                    )}
                  </p>
                  :
                  <textarea id="txtAreaDescription" defaultValue={description}></textarea>
                  }

                </div>
              </div>

              <div>
                <div>
                  <button>
                    <span>Verlassen</span>
                  </button>
                  <button>
                    <span>Melden</span>
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/**
         * 
         <input
        onChange={(e) => uploadProfile(e)}
        id="infoProfileInput"
        type="file"
        hidden={true}
      ></input>
         */}
    </div>
  );
}
