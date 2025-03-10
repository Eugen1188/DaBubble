export class DirectMessage {
    name: string;
    content: string;
    time: Date;
    from: string;
    to: string;

    constructor(username: string, content: string, from: string, to: string) {
        this.name = username;
        this.content = content;
        this.time = new Date();
        this.from = from;
        this.to = to;
    }


}