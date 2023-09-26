export default interface UserRegisterError {
    Email?: string[] | null;
    Firstname?: string[] | null;
    Lastname?: string[] | null;
    Password?: string[] | null;
    RepeatedPassword?: string[] | null;
    Username?: string[] | null;
}