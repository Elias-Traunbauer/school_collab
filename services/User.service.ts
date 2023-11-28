import TwoFactorAuthenticationObject from "../models/TwoFactorAuthenticationObject";
import User from "../models/User";
import UserLoginDTO from "../models/UserLoginDTO";
import UserRegisterDTO from "../models/UserRegisterDTO";

const url = '/api/User';
export async function registerUser(user: UserRegisterDTO): Promise<any> {
    try {
        const response = await fetch(`${url}/register/`, {
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

export async function getUser(): Promise<any> {
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

export async function getAllUsers():Promise<User[]>{
    try{
        const response = await fetch(url+'/all',{
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
export async function twoFactorAuthentication(password:string): Promise<TwoFactorAuthenticationObject>{
    try {
        const response = await fetch(`${url}/TwoFactorAuthentication`, {
            method: 'POST',
            body: JSON.stringify(password),
            headers: {
                'Content-Type': 'application/json',
            },
        });
            const data = await response.json();
            const result:TwoFactorAuthenticationObject = {
                qrCode:data.qrCode,
                secret:data.secret
            }

        return result;
    } catch (error) {
        throw error;
    }  
}

export async function twoFactorAuthenticationCode(code:string){
    try{
        const response = await fetch(`${url}/TwoFactorAuthenticationCode`, {
            method: 'POST',
            body: JSON.stringify(code),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const data = await response.json();
        return data;
    }
    catch (error){
        throw error;
    }
}