import Report from "./Report";

export default interface DataBaseEntity{
    id: number;
    version: string;
    reports?: Report[];
}