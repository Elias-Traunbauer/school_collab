import React, { ChangeEvent, useContext, useEffect, useState } from 'react';
import Image from 'next/image';
import styles from '../../styles/Chat.module.scss';
import listItemStyles from '../../styles/ChatroomListitem.module.scss';
import ChatroomListitem from '../../components/ChatroomListitem';
import Chatroom from '../../components/Chatroom';
import { useRouter } from 'next/router';
import Chat from '../../models/Chat';
import { createNewChat, getChatById, getChats, readChat } from '../../services/Chat.service';
import ChatMessage from '../../models/ChatMessage';
import UserContext from '../../components/UserContext';
import User from '../../models/User';
import ChatmemberListItem from '../../components/ChatmemberListItem';
import ChatPostDTO from '../../models/ChatPostDTO';
import { getAllUsers } from '../../services/User.service';
export default function DisplayChat() {

    const context = useContext(UserContext);

    const mockUser: User = {
        username: 'Thomas',
        firstName: 'thomas',
        lastName: 'hümmü',
        email: 'dasad',
        id: 400,
        version: ''
    };
    const mockMessage: ChatMessage = {
        chatId: 0,
        content: 'abc',
        created: new Date(),
        userId: context.userContext.id,
        read: false,
        id: 0,
        version: '',
        user: mockUser,
    };
    const mockChat: Chat = {
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
    const [selectedChat, setSelectedChat] = useState<Chat>(null);
    const [chats, setChats] = useState<Chat[]>([]);
    const [displayChats, setDisplayChats] = useState<Chat[]>([]);
    const [members, setMembers] = useState<User[]>([mockUser,mockUser,mockUser,mockUser]);
    const [displayMembers, setDisplayMembers] = useState<User[]>([]);
    const [newChatMembers, setNewChatMembers] = useState<User[]>([]);

    useEffect(() => {
        async function fetchData() {
            await getChatsAsync();
            //await getUsers();
        }
        fetchData();
    }, []);

    async function getUsers(){
        getAllUsers().then((res) => {
            if(res){
                setMembers(res);
                setDisplayMembers(res);
            }
        });
    }

    async function getChatsAsync() {
        getChats().then((res) => {
            console.log("CHAT", res);
            setChats(res);
            setDisplayChats(res);
            if (res.length > 0) {
                getChatById(res[0].id).then((chat) => {
                    setSelectedChat(chat);
                });

            }
        });
    }

    useEffect(() => {
        if (!selectedChat) {
            return;
        }
        const selectedItem = document.getElementById('container_' + selectedChat?.id);
        selectedItem.classList.add(listItemStyles.active);
    }, [selectedChat]);


    function newChat() {
        //router.push('/chat/create');
        const newChatDialog = document.getElementById('newChatDialog') as HTMLDialogElement;
        newChatDialog.showModal();
    }

    function hanldeSearch() {
        var search = document.getElementById('chatSearchInput') as HTMLInputElement;
        const searchValue = search.value;

        if (searchValue === '') {
            setDisplayChats(chats);
            return;
        }
        const tmpChats = chats.filter(chat => chat.name.includes(searchValue));
        setDisplayChats(tmpChats);
    }

    function GetLastMessage(messages: ChatMessage[]): ChatMessage {
        if (!messages || messages.length === 0) {
            return null;
        }
        return messages[messages.length - 1];
    }

    function GetUnreadMessages(messages: ChatMessage[]): ChatMessage[] {
        if (!messages || messages.length === 0) {
            return null;
        }
        const unreadMessages = messages.filter(message => !message.read);
        return unreadMessages;
    }

    function handleCancelCreateNewChat() {
        const newChatDialog = document.getElementById('newChatDialog') as HTMLDialogElement;




        newChatDialog.close();
    }

    function handleCreateNewChat() {
        const tmpChatMembers:number[] = [context.userContext.id];

        for (const iterator of newChatMembers) {
            tmpChatMembers.push(iterator.id);
        }

        const tmpDescription = (document.getElementById('newChatDescription') as HTMLTextAreaElement).value;
        const tmpName = (document.getElementById('newChatName') as HTMLInputElement).value;

        const newChat:ChatPostDTO = {
            chatMembers: tmpChatMembers,
            description: tmpDescription,
            name: tmpName
        };
        createNewChat(newChat).then((res) => {
            getChatsAsync();
        });


        const newChatDialog = document.getElementById('newChatDialog') as HTMLDialogElement;
        newChatDialog.close();
    }

    function handleChangeNewMembers(add: boolean, user: User) {
        if (add) {
            setNewChatMembers([...newChatMembers, user]);
        }
        else {
            const tmpMembers = newChatMembers.filter(member => member.id !== user.id);
            setNewChatMembers(tmpMembers);
        }
    }

    function handleSearchMembers(e:ChangeEvent){
        const inputElement = e.target as HTMLInputElement;
        const targetName = inputElement.value;

        const filteredData:User[] = members.filter((item) =>
             item.firstName.includes(targetName) || item.lastName.includes(targetName)
        );

        setDisplayMembers(filteredData);
    }

    function insertMessage(message: ChatMessage) {
        //TODO: Check
        const tmpChats = chats.map((chat) => {
            if (chat.id === message.chatId) {
                chat.chatMessages.push(message);
            }
            return chat;
        });
        setChats(tmpChats);
        setDisplayChats(tmpChats);
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
                        <Image src='/search.svg' width='20' height='20' alt='search'></Image>
                    </div>
                </div>
                <div className={styles.navbarBody}>
                    {
                        displayChats && displayChats.map && displayChats.map((chat, index) => {
                            return (
                                <ChatroomListitem
                                    key={index}
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
                <Chatroom insertMessage={insertMessage} chatParam={selectedChat}></Chatroom>
            </div>
            <dialog id='newChatDialog' className={styles.newChatDialog}>
                <div>
                    <h2>Neuer Chat</h2>
                    <input id='newChatName' type="text" placeholder="Chatname" />
                    <textarea id='newChatDescription' placeholder="Beschreibung"></textarea>
                    <input onChange={handleSearchMembers} className={styles.memberSearchbar} type="text" placeholder="Mitglieder Suchen" />

                        <div className={styles.memberlist}>
                            {
                                displayMembers && displayMembers.map &&displayMembers.map((member, index) => {
                                    return (
                                        <ChatmemberListItem key={member.id} member={member} onChange={handleChangeNewMembers}></ChatmemberListItem>
                                    )
                                })
                            }
                        </div>


                    <div className={styles.newChatDialogButtonArray}>
                        <button className='btn btn-cancel' onClick={handleCancelCreateNewChat}>Abbrechen</button>
                        <button className='btn btn-primary' onClick={handleCreateNewChat}>Erstellen</button>
                    </div>
                </div>

            </dialog>
        </div>
    );
}