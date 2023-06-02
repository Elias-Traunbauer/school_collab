export default interface Message {
    id: number;
    text: string;
    createdAt: Date;
    author: {id: number, name: string, color: string};
    answer?: Message;
    files?: Array<{name: string, url: string}>;
}