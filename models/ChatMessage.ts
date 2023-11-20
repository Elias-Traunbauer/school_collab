import DataBaseEntity from "./DataBaseEntity";
import Chat from "./Chat";
import User from "./User";

export default interface ChatMessage extends DataBaseEntity{
    chat?: Chat;
    chatId: number;
    content: string;
    created: Date;
    user?: User;
    userId: number;
}