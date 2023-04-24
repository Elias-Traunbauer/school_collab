import React, { useEffect, useState } from 'react';
import styles from '../styles/Chatroom.module.scss';
import Message from './Message';
import Image from 'next/image';
export default function Chatroom() {

    const mockName = 'alo';
    const mockuser = {id:1, name: "alo" , color: "red" };
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
    const mockProfile = 'TestProfile.jpeg';
    const mockmessages = [
        {
            id: 1,
            author: mockuser,
            text:'Hello World',
            createdAt:new Date(1, 1, 1, 1, 1),
        },
        {
            id: 2,
            author: {id:2, name: "rsheed" , color: "blue" },
            text:'Hello World',
            createdAt:new Date(1, 1, 1, 1, 1),
        },
        {
            id: 3,
            author: { id:3,name: "sebastian" , color: "green" },
            text:'Hello World',
            createdAt:new Date(1, 1, 1, 1, 1),
        },
        {
            id: 4,
            author: { id:3,name: "sebastian" , color: "green" },
            text:'Hello World',
            createdAt:new Date(1, 1, 1, 1, 1),
        },
        {
            id: 4,
            author: { id:3,name: "sebastian" , color: "green" },
            text:'Hello World',
            createdAt:new Date(1, 1, 1, 1, 1),
        },
        {
            id: 4,
            author: { id:3,name: "sebastian" , color: "green" },
            text:'Hello World',
            createdAt:new Date(1, 1, 1, 1, 1),
        },
        {
            id: 4,
            author: { id:3,name: "sebastian" , color: "green" },
            text:'Hello World',
            createdAt:new Date(1, 1, 1, 1, 1),
        },
        {
            id: 4,
            author: { id:3,name: "sebastian" , color: "green" },
            text:'Hello World',
            createdAt:new Date(1, 1, 1, 1, 1),
        },
        {
            id: 4,
            author: { id:3,name: "sebastian" , color: "green" },
            text:'Hello World',
            createdAt:new Date(1, 1, 1, 1, 1),
        },
        {
            id: 4,
            author: { id:3,name: "sebastian" , color: "green" },
            text:'Hello World',
            createdAt:new Date(1, 1, 1, 1, 1),
        },
        {
            id: 4,
            author: { id:3,name: "sebastian" , color: "green" },
            text:'Hello World',
            createdAt:new Date(1, 1, 1, 1, 1),
        },
        {
            id: 4,
            author: { id:3,name: "sebastian" , color: "green" },
            text:'Hello World',
            createdAt:new Date(1, 1, 1, 1, 1),
        },
        {
            id: 4,
            author: { id:3,name: "sebastian" , color: "green" },
            text:'Hello World',
            createdAt:new Date(1, 1, 1, 1, 1),
        },
        {
            id: 4,
            author: { id:3,name: "sebastian" , color: "green" },
            text:'Hello World',
            createdAt:new Date(1, 1, 1, 1, 1),
        },
        {
            id: 4,
            author: { id:3,name: "sebastian" , color: "green" },
            text:'Hello World',
            createdAt:new Date(1, 1, 1, 1, 1),
        },


    ];	
    const [messages, setMessages] = useState(mockmessages);
    const [files, setFiles] = useState([]);

    useEffect(() => {
        scrollDown();
    }, []);

    useEffect(() => {
        scrollDown();
    }, [messages]);

    
    
    

    function compareDate (currentDate:Date, date:Date) {
        if(currentDate.getDate() == date.getDate() && currentDate.getMonth() == date.getMonth() && currentDate.getFullYear() == date.getFullYear()) {
            return true;
        }
        else {
            return false;
        }
    }

    function getDate (date:Date) {
        const month = date.getMonth().toString().padStart(2, "0");
        const day = date.getDate().toString().padStart(2, "0");
        const year = date.getFullYear();

        if(year == new Date().getFullYear() && month == new Date().getMonth().toString().padStart(2, "0") && day == new Date().getDate().toString().padStart(2, "0"))
            return 'Today';
        else if(year == new Date().getFullYear() && month == new Date().getMonth().toString().padStart(2, "0") && day == (new Date().getDate()-1).toString().padStart(2, "0"))
            return 'Yesterday';
        else
        return `${day}.${month}.${year}`;
    }

    function handleInputChange(event) {
        console.log(event.key);
        if (event.key === 'Enter') {
            event.preventDefault();
            sendMessage();
        }
    }

    function sendMessage() {
        const input = document.getElementById('messageField') as HTMLInputElement;
        const message = input.value;
        if(message.length > 0) {
            const newMessage = {
                id: messages.length+1,
                author: mockuser,
                text:message,
                createdAt:new Date(),
                files:files,
            }
            setMessages([...messages,newMessage]);
            input.value = '';
        }
    }

    function scrollDown(){
        const chatroom = document.getElementById('chatBody') as HTMLDivElement;
        chatroom.scrollTop = chatroom.scrollHeight;
    }

    function printMessages() {
        let currentDate = messages[0].createdAt;
        return(
            <>
            {
            messages.map((message,index) => {
                if(!compareDate(currentDate,message.createdAt) || index == 0) {
                    currentDate = message.createdAt;
                    return (
                        <>
                            <div key={"date_"+index} className={styles.dateSection}>
                                <p>{getDate(message.createdAt)}</p>
                            </div>
                            <Message key={"message_"+index} author={message.author} text={message.text} createdAt={message.createdAt} displayName={index != 0? messages[index-1].author.id != message.author.id:true}></Message>
                        </>
                    );
                }
                else {
                    return (
                        <Message key={"message_"+index} author={message.author} text={message.text} createdAt={message.createdAt} displayName={index != 0? messages[index-1].author.id != message.author.id:true}></Message>
                    );
                }
            })
        }
        </>);
        
    }

    function addFiles() {
        const input = document.getElementById('fileInput') as HTMLInputElement;
        input.click();
    }

    function uploadFile(e) {
        setFiles([...files,...e.target.files]);
        sendMessage();
    }

    return (
        <div className={styles.container}>
            <div className={styles.head}>
                <div>
                    <Image width={30} height={30} src={'/'+mockProfile} alt='Profile'></Image>
                    <div>
                        <h3>{mockName}</h3>
                        <div>
                            {
                                mockMemberList.map((member,index) => {
                                    return (
                                        <p  key={"member_"+index}>{member.name}{index != mockMemberList.length-1&& ', \b'} </p>
                                    );
                                })
                            }
                        </div>
                        
                    </div>
                </div>
                <Image alt='info' width={30} height={30} src={'/info.svg'}></Image>
            </div>
            <div id='chatBody' className={styles.body}>
                <div>
                    {
                        printMessages()
                    }
                    <p></p>
                </div>
            </div>
            <div className={styles.foot}>
                <div>
                    <div onClick={addFiles}>
                        <div className={styles.dataBtn}></div>
                    </div>
                    <input onKeyDown={(e)=> handleInputChange(e)} id='messageField' type="text" placeholder="Type a message..."></input>
                    <div onClick={sendMessage}>
                        <div className={styles.sendBtn}></div>
                    </div>
                </div>
                <input onChange={(e)=>uploadFile(e)} id='fileInput' type='file' hidden={true}></input>
            </div>
        </div>
    );
}