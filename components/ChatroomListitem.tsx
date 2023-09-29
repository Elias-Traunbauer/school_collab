import React from 'react';
import styles from '../styles/ChatroomListitem.module.scss';
import Image from 'next/image';
export default function ChatroomListitem({
    id,
    name,
    profile,
    lastMessage,
    unreadMessages,
    onClick,
  }: {
    id: number;
    name: string;
    profile: string;
    lastMessage: { text: string; createdAt: Date };
    unreadMessages: number;
    onClick?: () => void;
  }) {
    const defaultProfile = 'person.svg';

        function unsetActive(){
            const active = document.getElementsByClassName(styles.active);
            if(active.length > 0){
                active[0].classList.remove(styles.active);
            }
        }

        function getDate(date:Date){
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

        function handleClick(e){
            unsetActive();
            onClick();
            const container = document.getElementById('container_'+id);
            container.classList.add(styles.active);
        }

        

        return (
            <div  className={styles.wrapper} onClick={(e)=>handleClick(e)}>
                <div id={'container_'+id}>
                    <Image className={profile === defaultProfile&& styles.defaultProfile } width={30} height={30} src={'/'+profile} alt="profile"></Image>
                    <div className={styles.body}>
                        <p>{name}</p>
                        <p>{lastMessage.text}</p>
                    </div>
                    <div className={styles.info}>
                        {
                            unreadMessages > 0 ?
                            <p className={styles.unreadMessages}>{unreadMessages > 9999?'viele':unreadMessages}</p>
                            :
                            <p className={styles.date}>{getDate(lastMessage.createdAt)}</p>
                        }
                        
                    </div>
                </div>
            </div>
        );
}