import DataBaseEntity from "./DataBaseEntity";
import File from "./File";
import Group from "./Group";
import Subject from "./Subject";
import User from "./User";

export default interface Assignment extends DataBaseEntity {
    title: string;

    description: string;

    content: string;

    created: Date;

    modified: Date;

    due: Date;

    files?: number[];
    instructions?: number[];

    group: Group;

    subject: Subject;

    user: User;

    userId: number;

    groupId: number;

    subjectId: number;
}
