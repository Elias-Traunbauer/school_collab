import DataBaseEntity from "./DataBaseEntity";
import Chat from "./Chat";
import User from "./User";

export default interface ChatMember extends DataBaseEntity{
    chat?: Chat;
    chatId: number;
    user?: User;
    userId: number;
}