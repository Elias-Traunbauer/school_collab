import PollOption from "./PollOption";
import PollOptionPostDTO from "./PollOptionPostDTO";

export default interface PollPostDTO {
    title: string,
    description: string,
    creatorUserId: number,
    due: Date,
    isAnonymous: boolean,
    pollOptions: PollOptionPostDTO[]
}