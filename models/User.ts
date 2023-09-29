import Assignment from "./Assignment";
import DataBaseEntity from "./DataBaseEntity";
import Chat from "./Chat";
import Group from "./Group";
import Poll from "./Poll";
import Post from "./Post";
import Comment from "./Comment";
import Notification from "./Notification";
import UserSession from "./UserSession";


export default interface User extends DataBaseEntity{
    username: string;
    firstName: string;
    lastName: string;
    email: string;

    profilePictureId?: number;
    permissions?: UserPermission;
    privacySettings?: UserPrivacy;
    assignments?: Assignment[];
    chats?: Chat[];
    comments?: Comment[];
    groups?: Group[];
    notifications?: Notification[];
    polls?: Poll[];
    posts?: Post[];
    sessions?: UserSession[];
}

export enum UserPermission{
    None = 0,
    View = 1,
    Create = 2,
    Edit = 4,
    Delete = 8,
    Admin = 16,
    Disabled = 32,
    Moderator = View | Create | Edit | Delete,
    Default = View | Create
}

export enum UserPrivacy{
    None = 0,
    ShowFirstName = 1,
    ShowLastName = 2,
    ShowEmail = 4,
    ShowAssignments = 8,
    ShowGroups = 16,
    ShowPolls = 32,
    ShowPosts = 64,
    ShowComments = 128,
    ShowPermissions = 256,
    ShowRegisteredAt = 512,
    ShowAll = ShowFirstName | ShowLastName | ShowEmail | ShowAssignments | ShowGroups | ShowPolls | ShowPosts | ShowComments | ShowPermissions | ShowRegisteredAt,
}