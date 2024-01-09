import Chat from "../models/Chat";
import ChatMessage from "../models/ChatMessage";
import ChatPostDTO from "../models/ChatPostDTO";

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
        return data.value;
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
        return data.value;
    }
    catch(error){
        throw error;
    }
}

export async function getMessages(chatId:number,start?:number,count?:number): Promise<ChatMessage[]>{
    try{
        const startValue = start?start:0;
        const countValue = count?count:10;
        const response = await fetch(url+`/Messages?chatId=${chatId}&start=${startValue}&count=${countValue}`,{
            method: 'GET',
        });
        if(response.status != 200){
            throw response;
        }
        const data = await response.json();
        console.log("GETMESSAGES",data.value);
        return data.value;
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
        return data.value;
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
        return data.value;
    }
    catch(error){
        throw error;
    }
}

export async function sendMessage(ChatId:number,message:string,ReplyId?:number){
    
    const dto = {
        chatId: ChatId,
        message: message,
        replyId: ReplyId
    }
    try{
        const response = await fetch(url+'/Message',{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dto)
        });
        if(response.status != 200){
            throw response;
        }
        const data = await response.json();
        console.log("SENDMESSAGE",data);
        return data.value;
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
        return data.value;
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
        return data.value;
    }
    catch(error){
        throw error;
    }
}

export async function getChatMessageById(messageId:number){
    try{
        const response = await fetch(url+'/Message/'+messageId,{
            method: 'GET'
        });
        if(response.status != 200){
            throw response;
        }
        const data = await response.json();
        return data.value;
    }
    catch(error){
        throw error;
    }
}

export async function createNewChat(newChat:ChatPostDTO){
    try{
        const response = await fetch(url,{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newChat)
        });
        if(response.status != 200){
            throw response;
        }
        const data = await response.json();
        return data.value;
    }
    catch(error){
        throw error;
    }
}

export function subscribeToNewMessages():EventSource{
    const sse:EventSource = new EventSource(url+'/SubscribeToNewMessages');
    return sse;
}