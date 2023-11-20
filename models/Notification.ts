import DataBaseEntity from "./DataBaseEntity";
import User from "./User";

export default interface Notification extends DataBaseEntity{
    content: string;
    created: Date;
    isRead: boolean;
    link: string;
    user?: User;
    userId: number;
}