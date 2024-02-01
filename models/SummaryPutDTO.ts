import SummaryFileBackend from "./SummaryFileBackend";

export default interface SummaryPutDTO {
    id: number,
    title: string,
    description: string,
    content: string,
    subjectId: number,
    files: SummaryFileBackend[]
}