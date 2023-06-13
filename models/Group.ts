import DataBaseEntity from "./DataBaseEntity";
import Assignment from "./Assignment";
import GroupUser from "./GroupUser";
import User from "./User";

export default interface Group extends DataBaseEntity{
    assignments?: Assignment[];
    creatorUser?: User;
    creatorUserId: number;
    description: string;
    groupUsers?: GroupUser[];
    name: string;
}