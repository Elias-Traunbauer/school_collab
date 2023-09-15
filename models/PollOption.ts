import DataBaseEntity from "./DataBaseEntity";
import Poll from "./Poll";

export default interface PollOption extends DataBaseEntity{
    name: string;
    poll? : Poll;
    pollId: number;
    votes: number;
}