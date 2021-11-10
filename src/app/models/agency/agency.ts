import { Subscriber } from "../subscribers/subscriber";
import { User } from "../users/user";

export class Agency {
    id:number;
    codeAgence:string;
    name:string;
    subscriber:Subscriber;
    user:User;
    user_Updated:User;
    createdAt:Date;
    updatedAt:Date;
}
