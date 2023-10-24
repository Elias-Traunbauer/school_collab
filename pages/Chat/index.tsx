import React, { useContext, useEffect, useState } from 'react';
import Image from 'next/image';
import styles from '../../styles/Chat.module.scss';
import ChatroomListitem from '../../components/ChatroomListitem';
import Chatroom from '../../components/Chatroom';
import { useRouter } from 'next/router';
import Chat from '../../models/Chat';
import { getChats } from '../../services/Chat.service';
import ChatMessage from '../../models/ChatMessage';
import UserContext from '../../components/UserContext';
import User from '../../models/User';
export default function DisplayChat() {

    const context = useContext(UserContext);

    const mockUser:User = {
        username: 'Thomas',
        firstName: 'thomas',
        lastName: 'hümmü',
        email: 'dasad',
        id: 400,
        version: ''
    };
    const mockMessage:ChatMessage = {
        chatId: 0,
        content: 'abc',
        created: new Date(),
        userId: context.userContext.id,
        read: false,
        id: 0,
        version: '',
        user: mockUser,
    };
    const mockChat:Chat = {
        chatMembers: [],
        chatMessages: [mockMessage],
        creator: context.userContext,
        creatorUserId: context.userContext.id,
        description: 'Hallo',
        name: 'Thomas',
        id: 0,
        version: '',
    };
    const mockProfile = 'person.svg';
    const router = useRouter();
    const [selectedChat, setSelectedChat] = useState<Chat>(mockChat);
    const [chats, setChats] = useState<Chat[]>([]);
    const [displayChats, setDisplayChats] = useState<Chat[]>([]);

    useEffect(() => {
        async function fetchData(){
            const res = await getChats();
            setChats(res);
            setDisplayChats(res);
        }
        //fetchData();
    }, []);


    function newChat() {
        router.push('/chat/create');
    }

    function hanldeSearch() {
        var search = document.getElementById('chatSearchInput') as HTMLInputElement;
        const searchValue = search.value;

        if(searchValue === ''){
            setDisplayChats(chats);
            return;
        }
        const tmpChats = chats.filter(chat => chat.name.includes(searchValue));
        setDisplayChats(tmpChats);
    }

    function GetLastMessage(messages:ChatMessage[]):ChatMessage{
        return messages[messages.length-1];
    }

    function GetUnreadMessages(messages:ChatMessage[]):ChatMessage[]{
        const unreadMessages = messages.filter(message => !message.read);
        return unreadMessages;
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
                        <input id='chatSearchInput' onInput={hanldeSearch} type="text" placeholder="Search" />
                        <Image src='/search.svg' width='20' height= '20' alt='search'></Image>
                    </div>
                </div>
                <div className={styles.navbarBody}>
                    {
                        displayChats.map((chat, index) => {
                            return (
                                <ChatroomListitem
                                    key={chat.id}
                                    id={chat.id}
                                    name={chat.name}
                                    lastMessage={GetLastMessage(chat.chatMessages)}
                                    unreadMessages={GetUnreadMessages(chat.chatMessages)}
                                    onClick={() => setSelectedChat(chat)}
                                ></ChatroomListitem>
                            )
                        })
                    }
                </div>
            </div>
            <div className={styles.ChatroomContainer}>
                <Chatroom chat={selectedChat}></Chatroom>
            </div>
        </div>
    );
}