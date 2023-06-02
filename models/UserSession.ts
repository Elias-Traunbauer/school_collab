import DataBaseEntity from "./DataBaseEntity";
import User from "./User";

export default interface UserSession extends DataBaseEntity{
    expires: Date;
    ip: string;
    issuedAt: Date;
    lastAction: Date;
    sessionKey: string;
    user?: User;
    userId: number;
}