import DataBaseEntity from "./DataBaseEntity";
import User from "./User";

export default interface Comment extends DataBaseEntity{
    content: string;
    dateCreated: Date;
    user? : User;
    userId: number;
}