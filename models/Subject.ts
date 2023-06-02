import DataBaseEntity from "./DataBaseEntity";
import Assignment from "./Assignment";

export default interface Subject extends DataBaseEntity{
    assignments?: Assignment[];
    name: string;
}