import { Agency } from "../agency/agency";
import { Subscriber } from "../subscribers/subscriber";


export class User {
    id:number;
    username:string;
    fullname:string;
    password:string;
    role:string;
    subscriber:Subscriber;
    agency:Agency;
    createdAt:Date;
    updatedAt:Date;
}
