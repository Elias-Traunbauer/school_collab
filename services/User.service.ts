import UserLoginDTO from "../models/UserLoginDTO";
import UserRegisterDTO from "../models/UserRegisterDTO";
import UserRegisterError from "../models/UserRegisterError";

const url = 'https://localhost:7119/api/User';
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

export async function checkEmailAvailable(email:string): Promise<any> {
    try {
        const response = await fetch(`${url}/email-available/${email}`);
        const data = await response.json();
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

        return response.status;
    } catch (error) {
        throw error;
    }
}