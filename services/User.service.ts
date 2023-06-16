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
        const data = await response.json();
         if (data.status == 400) {
            const errorData = data.errors;
            
            throw errorData;
        }else if (data.status == 200) {
            
            return data;
        }
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
        const data = await response.json();
        data.then((data) => {

            if (data.status == 401) {
                const errorData = data.errors;
                throw errorData;
            }
    
            console.log("logged in",data);
        });

        return response.status;
    } catch (error) {
        throw error;
    }
}