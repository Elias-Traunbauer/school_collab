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
    //MOCK
    const option1:PollOption = {
        name: "Ja",
        pollId: 1,
        votes: 5,
        id: 1,
        version: ""
    }
    const option2:PollOption = {
        name: "Nein",
        pollId: 1,
        votes: 3,
        id: 2,
        version: ""
    }

    const p:Poll = {
        creatorUserId: 1,
        dateCreated: new Date(),
        description: "# Hallo",
        due: new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
        isAnonymous: false,
        title: "Poll1",
        id: 1,
        version: "",
        pollOptions: [option1,option2]
    }

    return p;
//REAL
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