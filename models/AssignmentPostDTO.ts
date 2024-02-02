import FileBackend from "./FileBackend";

export default interface AssignmentPostDTO{
    title: string,
    description: string,
    content: string,
    subjectId: number,
    due: Date,
    groupId: number,
    files: FileBackend[],
}