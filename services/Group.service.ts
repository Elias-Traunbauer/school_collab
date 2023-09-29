import Group from "../models/Group";
const url = '/api/Group';

export async function getAllGroups(): Promise<Group[]> {
    try{
        const response = await fetch(url+'/related', {
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