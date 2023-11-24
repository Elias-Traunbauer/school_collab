import PollOption from "./PollOption";

export default interface PollPostDTO {
    dateCreated: Date,
    description: string,
    due: Date,
    isAnonymous: boolean,
    title: string,
    pollOptions: string[]
}