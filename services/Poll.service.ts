import Poll from "../models/Poll";
import PollOption from "../models/PollOption";
import PollPostDTO from "../models/PollPostDTO";

const url = '/api/Poll';
export async function getPolls():Promise<Poll[]> {
    try{
        const response = await fetch(url+"/all", {
            method: 'GET'
        });

        if (response.status != 200) {
            throw response;
        }
        const data = await response.json();
          
        return data;
    }catch(error){

    }
}

export async function createPoll(poll:PollPostDTO){
    console.log("NEWPOLL",poll);
    try{
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
              },
            body: JSON.stringify(poll)
        });

        if (response.status != 200) {
            throw response;
        }
          console.log("RESPONSE",response);
        return response;
    }catch(error){
        throw error;
    }
}

export async function getPollById(id:number):Promise<Poll>{
    try{
        const response = await fetch(`${url}/${id}`, {
            method: 'GET'
        });

        if (response.status != 200) {
            throw response;
        }
        const data = await response.json();
          
        return data;
    }catch(error){
        throw error;
    }
}

export async function executeVote(pollOptionId:number):Promise<void>{

    console.log("POLL OPTION ID",pollOptionId);

    try{
        await fetch(`${url}/vote/${pollOptionId}`, {
            method: 'POST'
        });
    }catch(error){
        throw error;
    }
}

export async function updatePoll(poll:Poll):Promise<void>{

    console.log("POLL OPTION ID",poll);

    try{
        await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
              },
            body: JSON.stringify(poll)
        });
    }catch(error){
        throw error;
    }
}

export async function haveIVoted(id:number):Promise<number>{
    try{
        const response = await fetch(`${url}/${id}/IfIHaveVoted`, {
            method: 'GET'
        });

        if (response.status != 200) {
            throw response;
        }
        const data = await response.json();
          
        return data.value;
    }catch(error){
        throw error;
    }
}