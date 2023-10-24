import Chat from "../models/Chat";
import ChatMessage from "../models/ChatMessage";

const url = "/api/Chats"
export async function getChats(): Promise<Chat[]>{
    try{
        const response = await fetch(url,{
            method: 'GET'
        });
        if(response.status != 200){
            throw response;
        }
        const data = await response.json();
        return data;
    }
    catch(error){
        throw error;
    }
}

export async function getChatMessageById(id: number): Promise<ChatMessage>{
    try{
        const response = await fetch(url+'/Message/'+id,{
            method: 'GET'
        });
        if(response.status != 200){
            throw response;
        }
        const data = await response.json();
        return data;
    }
    catch(error){
        throw error;
    }
}

export async function sendMessage(ChatId:number,message:string,ReplyId?:number){
    try{
        const response = await fetch(url+'/Message',{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ChatId,message,ReplyId})
        });
        if(response.status != 200){
            throw response;
        }
        const data = await response.json();
        return data;
    }
    catch(error){
        throw error;
    }
}

export async function updateMessage(message:ChatMessage){
    try{
        const response = await fetch(url+'/Message',{
            method: 'PUT',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(message)
        });
        if(response.status != 200){
            throw response;
        }
        const data = await response.json();
        return data;
    }
    catch(error){
        throw error;
    }
}

export async function updateChat(chat:Chat){
    try{
        const response = await fetch(url,{
            method: 'PUT',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(chat)
        });
        if(response.status != 200){
            throw response;
        }
        const data = await response.json();
        return data;
    }
    catch(error){
        throw error;
    }
}