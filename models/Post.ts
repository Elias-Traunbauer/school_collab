import DataBaseEntity from "./DataBaseEntity";
import PostComment from "./PostComment";
import User from "./User";

export default interface Post extends DataBaseEntity{
    content: string;
    dateCreated: Date;
    postComments?: PostComment[];
    title: string;
    user?: User;
    userId: number;
}   