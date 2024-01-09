import DataBaseEntity from "./DataBaseEntity";
import ChatMember from "./ChatMember";
import ChatMessage from "./ChatMessage";
import User from "./User";

export default interface Chat extends DataBaseEntity{
    chatMembers: ChatMember[];
    chatMessages: ChatMessage[];
    creator: User;
    creatorUserId: number;
    description: string;
    name: string;
    picture?: string;
}