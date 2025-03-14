export class Channel {
  name: string;
  member: string[];
  description: string;
  messages: string[];

  constructor(obj?: any) {
    this.name = obj ? obj.name : '';
    this.member = obj ? obj.member : '';
    this.description = obj ? obj.description : '';
    this.messages = obj ? obj.messages : [];
  }
}
