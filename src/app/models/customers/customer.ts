import { Account } from "../account/account";
import { Agency } from "../agency/agency";
import { Currency } from "../currency/currency";
import { Subscriber } from "../subscribers/subscriber";
import { User } from "../users/user";

export class Customer {

    id:number;
    fullname:string;
    sex:string;
    dob:Date;
    poBirth:string;
    address:string;
    phoneNumber:string;
    agency:Agency;
    subscriber:Subscriber;
    user:User;
    user_Updated:User;
    createdAt:Date;
    updatedAt:Date;
}
