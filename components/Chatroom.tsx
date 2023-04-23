import React from 'react';
import styles from '../styles/Chatroom.module.scss';
import Message from './Message';
import Image from 'next/image';
export default function Chatroom() {

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
    ];	

    return (
        <div className={styles.container}>
            <div className={styles.head}>
                <div>
                    <Image width={30} height={30} src={'/expand.svg'} alt='Profile'></Image>
                    <div>
                        <h3>Chatroom Name</h3>
                        <p>Member</p>
                    </div>
                </div>
                <Image alt='info' width={30} height={30} src={'/expand.svg'}></Image>
            </div>
            <div className={styles.body}>
                {
                    mockmessages.map((message,index) => {
                        return (
                            <Message key={"message_"+index} author={message.author} text={message.text} createdAt={message.createdAt} displayName={true}></Message>
                        );
                    })
                }
            </div>
            <div className={styles.foot}>
                <button>Data</button>
                <input type="text" placeholder="Type a message..."></input>
                <button>Send</button>
            </div>
        </div>
    );
}