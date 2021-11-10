import { Account } from "../account/account";
import { Customer } from "../customers/customer";
import { Package } from "../packages/package";
import { Subscriber } from "../subscribers/subscriber";
import { User } from "../users/user";

export class Policy {

    id:number;
    ref:string;
    pkge:Package;
    effect_date:Date;
    typeofGarantie:string;
    expiringDate:Date;
    account:Account;
    customer:Customer;
    subscriber:Subscriber;
    user:User;
    user_Update:User;
    createdAt:Date;
    updatedAt:Date;

}
