import FileObject from "./File";
import Subject from "./Subject";
import User from "./User";

export default interface Summary {
    id: number;
    title: string;
    descritpion: string;
    files?: FileObject[];
    publishdate: Date;
    subject: Subject;
    author: User;
}
