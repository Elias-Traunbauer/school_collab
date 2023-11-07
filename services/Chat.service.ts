import Chat from "../models/Chat";
import ChatMessage from "../models/ChatMessage";

const url = "/api/Chat"
export async function getChats(): Promise<Chat[]>{
    try{
        const response = await fetch(url+'/MyChats',{
            method: 'GET'
        });
        if(response.status != 200){
            throw response;
        }
        console.log(response);
        const data = await response.json();
        console.log(data);
        return data;
    }
    catch(error){
        throw error;
    }
}

export async function readChat(chatId:number,MessageId:number){
    try{
        const response = await fetch(url+'/Read',{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({chatId,MessageId})
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

export async function getMessages(chatId:number,start?:number,count?:number): Promise<ChatMessage[]>{
    try{
        const response = await fetch(url+'/Messages',{
            method: 'GET',
            body: JSON.stringify({chatId,start,count})
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

export async function getChatById(id: number): Promise<Chat>{
    try{
        const response = await fetch(url+'/'+id,{
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

export async function SubscribeToNewMessages(){
    try{
        const response = await fetch(url+'/SubscribeToNewMessages', {
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