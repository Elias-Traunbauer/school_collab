export default interface AssignmentPutDTO {
    id: number,
    title: string,
    description: string,
    content: string,
    subjectId: number,
    due: Date,
    groupId: number,
    files: number[],
    instructions: number[]
}