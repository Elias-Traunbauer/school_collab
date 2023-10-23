import Poll from "../models/Poll";
import PollPostDTO from "../models/PollPostDTO";

const url = '/api/Poll';
export async function getPolls():Promise<Poll[]> {
    try{
        const response = await fetch(url, {
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
          
        return response;
    }catch(error){
        throw error;
    }
}