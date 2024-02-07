import { Role } from './role';

export class User {
  id: number;
  img: string;
  username: string;
  password: string;
  fullname: string;
  role: Role;
  token: string;
  menu: Array<any>
  key: string;
}
