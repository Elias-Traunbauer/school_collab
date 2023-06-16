import DataBaseEntity from "./DataBaseEntity";
import Comment from "./Comment";
import Post from "./Post";

export default interface PostComment extends DataBaseEntity{
    comment?: Comment;
    commentId: number;
    post? : Post;
    postId: number;
}