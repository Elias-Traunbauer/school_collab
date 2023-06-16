import DataBaseEntity from "./DataBaseEntity";
import PollOption from "./PollOption";
import User from "./User";

export default interface Poll extends DataBaseEntity{
    CreatorUser?: User;
    creatorUserId: number;
    dateCreated: Date;
    description: string;
    due: Date;
    isAnonymous: boolean;
    pollOptions?: PollOption[];
    title: string;
}