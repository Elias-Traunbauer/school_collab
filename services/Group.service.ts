import Assignment from "../models/Assignment";
import Group from "../models/Group";
import GroupPostDTO from "../models/GroupPostDTO";
import { getAllAssignments } from "./Assignment.service";
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

export function getGroupById(id: number){
    /*try{
        const response = await fetch(url+'/'+id, {
            method: 'GET'
        });

        if (response.status != 200) {
            throw response;
        }
        const data = await response.json();
          
        return data;
    }catch(error){
        throw error;
    }*/

    let grp: Group = {
        id: 1,
        name: "Gruppenname",
        description: "Das ist die Beschreibung der Gruppe",
        creatorUser: {
            id: 1,
            username: "trauni",
            firstName: "Elias",
            lastName: "Traunbauer",
            email: "email@gmail.com",
            version: "1"
        },
        creatorUserId: 1,
        version: "1",
        groupUsers: [
            {
                id: 1,
                userId: 2,
                groupId: 1,
                version: "1",
                user: {
                    id: 2,
                    username: "jdoe",
                    firstName: "John",
                    lastName: "Doe",
                    email: "email@gmail.com",
                    version: "1"
                }
            },
            {
                id: 1,
                userId: 3,
                groupId: 1,
                version: "1",
                user: {
                    id: 3,
                    username: "jdoe",
                    firstName: "John",
                    lastName: "Doe",
                    email: "email@gmail.com",
                    version: "1"
                }
            },
            {
                id: 1,
                userId: 4,
                groupId: 1,
                version: "1",
                user: {
                    id: 4,
                    username: "jdoe",
                    firstName: "John",
                    lastName: "Doe",
                    email: "email@gmail.com",
                    version: "1"
                }
            }
        ]
    };

    getAllGroups().then((groups) => {
        grp = groups.at(0);
    });

    return grp;

}

export async function postGroup(group: GroupPostDTO): Promise<any> {
    try {
        const response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(group),
            headers: {
                'Content-Type': 'application/json',
            },
        });
            
         if (response.status === 200) {
            // If the response status is 200, check if there is a response body
            const contentType = response.headers.get('content-type');
            if (contentType) {
                const data = await response.json();

                if (data.status != 200) {
                    throw data;
                }

            }
        } else {
                throw response;
        }

        return response;
    } catch (error) {
        throw error;
    }
}