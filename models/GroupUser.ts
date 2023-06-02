import DataBaseEntity from "./DataBaseEntity";
import Group from "./Group";
import User from "./User";

export default interface GroupUser extends DataBaseEntity{
    group?: Group;
    groupId: number;
    user?: User;
    userId: number;
}