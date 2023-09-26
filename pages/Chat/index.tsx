import React, { useState } from 'react';
import Image from 'next/image';
import styles from '../../styles/Chat.module.scss';
import ChatroomListitem from '../../components/ChatroomListitem';
import Chatroom from '../../components/Chatroom';
import { useRouter } from 'next/router';
export default function Chat() {
    const mockProfile = 'person.svg';
    const router = useRouter();
    const [selectedChatRoom, setSelectedChatRoom] = useState(0);
    const [chatRooms, setChatRooms] = useState([{
    id: 0,
    name: "Hallo",
    profile: mockProfile,
    lastMessage: {
        text: "Hallo",
        createdAt: new Date(),
    },
    unreadMessages: 1
    },
    {
        id: 2,
        name: "Sueee",
        profile: "TestProfile.jpeg",
        lastMessage: {
            text: "dadasdasd",
            createdAt: new Date(),
        },
        unreadMessages: 0
    },
    {
        id: 3,
        name: "Robert",
        profile: mockProfile,
        lastMessage: {
            text: "Test",
            createdAt: new Date(),
        },
        unreadMessages: 5
    }
]);
    const [displayedChatRooms, setDisplayedChatRooms] = useState(chatRooms);


    function newChat() {
        router.push('/chat/create');
    }

    function hanldeSearch() {

    }

    return (
        <div className={styles.container}>
            <div className={styles.navBar}>
                <div>
                    <h2>Chats</h2>
                </div>
                <div className={styles.navbarHead}>
                    <div className={styles.navbarHeading}>
                        <button onClick={newChat}>
                           <p>Neuer Chat</p>
                        </button>
                    </div>
                    <div className={styles.searchContainer}>
                        <input onInput={hanldeSearch} type="text" placeholder="Search" />
                        <Image src='/search.svg' width='20' height= '20' alt='search'></Image>
                    </div>

                </div>
                <div className={styles.navbarBody}>
                    {
                        displayedChatRooms.map((chatRoom, index) => {
                            return (
                                <ChatroomListitem
                                    key={index}
                                    id={chatRoom.id}
                                    name={chatRoom.name}
                                    profile={chatRoom.profile}
                                    lastMessage={chatRoom.lastMessage}
                                    unreadMessages={chatRoom.unreadMessages}
                                    onClick={() => setSelectedChatRoom(chatRoom.id)}
                                ></ChatroomListitem>
                            )
                        })
                    }
                </div>
            </div>
            <div className={styles.ChatroomContainer}>
                <Chatroom></Chatroom>
            </div>
        </div>
    );
}