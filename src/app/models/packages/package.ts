import { Subscriber } from "../subscribers/subscriber";
import { User } from "../users/user";

export class Package {
    
    id:number;
    name:string;
    capital:number;
    premium:number;
    subscriber:Subscriber;
    user:User;
    user_Updated:User;
    createdAt:Date;
    updatedAt:Date;
    
}
