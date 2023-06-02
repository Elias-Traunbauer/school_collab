import DataBaseEntity from "./DataBaseEntity";
import User from "./User";

export default interface File extends DataBaseEntity{
    content: string;
    name: string;
    contentType: string;
    mimeType: string;
    size: number;
    uploadedBy?: User;
    uploadedById: number;
}