import DataBaseEntity from "./DataBaseEntity";
import FileBackend from "./FileBackend";
import Group from "./Group";
import Subject from "./Subject";
import User from "./User";

export default interface AssignmentBackend extends DataBaseEntity {
    title: string;

    description: string;

    content: string;

    created: Date;

    modified: Date;

    due: Date;

    files?: FileBackend[];

    group: Group;

    subject: Subject;

    user: User;

    userId: number;

    groupId: number;

    subjectId: number;
}