import { User } from "../users/user";

export class Subscriber {
    id:number;
    name:string;
    address:string;
    phoneNumber:string;
    rccm:string;
    idnat:string;
    user:User;
    user_Update:User;
    createdAt:Date;
    updatedAt:Date;

    compareFn = (o1: any, o2: any) => (o1 && o2 ? o1.value === o2.value : o1 === o2);
}

