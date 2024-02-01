import React, { use, useEffect } from 'react';
import styles from '../styles/ChatroomListitem.module.scss';
import Image from 'next/image';
import ChatMessage from '../models/ChatMessage';
import { getMessages, readChat } from '../services/Chat.service';
export default function ChatroomListitem({
    key,
    id,
    name,
    profile,
    onClick,
  }: {
    key:number,
    id: number;
    name: string;
    profile?: string;
    onClick?: () => void;
  }) {

    const [lastMessage, setLastMessage] = React.useState<ChatMessage>();
    const [unread, setUnread] = React.useState<boolean>();

    async function fetchData() {
        const messages = await getMessages(id, 0, 1);
        if(messages&&messages.length > 0){
            setLastMessage(messages[0]);
            if(messages[0].read === false){
                setUnread(true);
            }
            else{
                setUnread(false);
            }
        }
        
    }

    useEffect(() => {
        fetchData();
    },[]);

    const defaultProfile = 'person.svg';

        function unsetActive(){
            const active = document.getElementsByClassName(styles.active);
            if(active.length > 0){
                active[0].classList.remove(styles.active);
            }
        }

        function getDate(date:Date){
            if(!date){
                return '';
            }

            date = new Date(date);
            const today = new Date();
            const yesterday = new Date(today);
            yesterday.setDate(yesterday.getDate() - 1);
            if(date.getDate() === today.getDate() && date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear()){
                return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            }else if(date.getDate() === yesterday.getDate() && date.getMonth() === yesterday.getMonth() && date.getFullYear() === yesterday.getFullYear()){
                return 'Gestern';
            }else{
                return date.toLocaleDateString([], { day: '2-digit', month: '2-digit' , year: '2-digit'});
            }
        }

        function PrintChatName() {
            if (!name) {
              return <></>;
            }
            //first two letters of the name
            if (name.length > 1)
              return name.substring(0, 2).toUpperCase();
            else
              return name.toUpperCase();
          }

        async function handleClick(e){

            const lastMessage = await getMessages(id, 0, 1);
            console.log("Lastmessage",lastMessage);
            if(lastMessage&&lastMessage.length > 0)
            readChat(id,lastMessage[0].id)

            unsetActive();
            onClick();
            setUnread(false);
            const container = document.getElementById('container_'+id);
            container.classList.add(styles.active);
        }

        

        return (
            <div  className={styles.wrapper} onClick={(e)=>handleClick(e)}>
                <div id={'container_'+id}>
                    <div className={styles.profilePic}>
                        <p>{PrintChatName()}</p>
                    </div>
                    <div className={styles.body}>
                        <p>{name}</p>
                        <p>{lastMessage&&lastMessage.content}</p>
                    </div>
                    <div className={styles.info}>
                        {
                            unread ?
                            <p className={styles.unreadMessages}>!</p>
                            :
                            <p className={styles.date}>{getDate(lastMessage&&lastMessage.created)}</p>
                        }
                        
                    </div>
                </div>
            </div>
        );
}