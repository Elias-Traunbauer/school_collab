import React, { useState } from 'react';
import styles from '../styles/Chat.module.scss';
import Chatroom from '../components/Chatroom';
import Image from 'next/image';
import ChatroomListitem from '../components/ChatroomListitem';
export default function Chat() {
    const [selectedChatRoom, setSelectedChatRoom] = useState(0);
    const mockProfile = 'TestProfile.jpeg';
    return (
        <div className={styles.container}>
            <div className={styles.navBar}>
                <div className={styles.navbarHead}>
                    <div className={styles.navbarHeading}>
                        <h2>Kontakte</h2>
                        <Image src='/add.svg' width='20' height= '20' alt='newChat'></Image>
                    </div>
                    <div className={styles.searchContainer}>
                        <input type="text" placeholder="Search" />
                        <Image src='/search.svg' width='20' height= '20' alt='search'></Image>
                    </div>
                </div>
                <div className={styles.navbarBody}>
                    {
                        //TODO: Map through the list of members and display them here
                    }
                    <ChatroomListitem id={1} name={'Trauni'} profile={mockProfile} lastMessage={{
                        text: 'dsadsassssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss',
                        createdAt: new Date()
                    }} unreadMessages={2} onClick={function (): void {
                        
                    } }></ChatroomListitem>
                    <ChatroomListitem id={2} name={'Thomas'} profile={mockProfile} lastMessage={{
                        text: 'Hallo',
                        createdAt: new Date()
                    }} unreadMessages={0} onClick={function (): void {
                        
                    } }></ChatroomListitem>
                </div>
            </div>
            <div className={styles.ChatroomContainer}>
                <Chatroom></Chatroom>
            </div>
        </div>
    );
}