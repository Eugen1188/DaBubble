export class User {
  fullname: string;
  email: string;
  password: string;

  constructor(obj?: any) {
    this.fullname = obj ? obj.fullname : '';
    this.email = obj ? obj.email : '';
    this.password = obj ? obj.password : '';
  }
}
