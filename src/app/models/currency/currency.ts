import { User } from "../users/user";

export class Currency {
    id:number;
    name:string;
    isocode:string;
    user:User;
    user_update:User;
    createdAt:Date;
    updatedAt:Date;
}
