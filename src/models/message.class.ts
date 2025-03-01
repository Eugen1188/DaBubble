export class Message {
  name: string;
  message: string;
  date: string;
  time: string;
  messages: [] = [];

  constructor(obj?: any) {
    this.name = obj ? obj.name : '';
    this.message = obj ? obj.message : '';
    this.date = obj ? obj.date : '';
    this.time = obj ? obj.time : '';
  }
}
