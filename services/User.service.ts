import UserRegisterDTO from "../models/UserRegisterDTO";

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
        return data;
    } catch (error) {
        console.error('Error registering user:', error);
        throw error;
    }
}

export async function checkEmailAvailable(email:string): Promise<any> {
    try {
        const response = await fetch(`${url}/email-available/${email}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error checking email:', error);
        throw error;
    }
}

export async function loginUser(user: UserRegisterDTO): Promise<any> {}