import DataBaseEntity from "./DataBaseEntity";
import User from "./User";

export default interface Report extends DataBaseEntity{
    createdAt: Date;
    createdBy?: User;
    createdById: number;
    reason: string;
    type: string;
    wasChecked: boolean;
}