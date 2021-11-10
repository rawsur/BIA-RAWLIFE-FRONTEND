import { Currency } from "../currency/currency";
import { Customer } from "../customers/customer";
import { User } from "../users/user";

export class Account {
    id:number;
    accountNumber:string;
    currency:Currency;
    customer:Customer;
    user:User;
    user_update:User;
    createdAt:Date;
    updatedAt:Date;
}
