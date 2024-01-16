import FileObject from "./File";
import Subject from "./Subject";
import User from "./User";

export default interface Summary {
    title: string;
    description: string;
    content: string;
    subjectId: number;
    subject: Subject;
    files: FileObject[];
    id: number;
    version: string;
    reports: User[];
}
