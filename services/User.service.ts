import User from "../models/User";
import UserLoginDTO from "../models/UserLoginDTO";
import UserRegisterDTO from "../models/UserRegisterDTO";
import UserRegisterError from "../models/UserRegisterError";

const url = 'https://localhost:3000/api/User';
export async function registerUser(user: UserRegisterDTO): Promise<any> {
    try {
        const response = await fetch(`${url}/register`, {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        console.log("status",response.status);
        if (response.status === 200) {
            // If the response status is 200, check if there is a response body
            const contentType = response.headers.get('content-type');
            if (contentType && contentType.includes('application/json')) {
                const data = await response.json();

                if (data.status != 200) {
                    throw data;
                }

            }
        } else {
            throw response;
        }

        return response.status;
    } catch (error) {
        throw error;
    }
    
}

export async function getUser(cookie:string|undefined): Promise<any> {
    console.log("cookie",cookie);
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/txt',
                'Authorization': cookie
            },
        });
        const data = await response.json();
        console.log("status",data);
        return data;
    } catch (error) {
        throw error;
    }
}

export async function loginUser(user: UserLoginDTO): Promise<any> {
    try {
        const response = await fetch(`${url}/login`, {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json',
            },
        });
            
         if (response.status === 200) {
            // If the response status is 200, check if there is a response body
            const contentType = response.headers.get('content-type');
            if (contentType && contentType.includes('application/json')) {
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