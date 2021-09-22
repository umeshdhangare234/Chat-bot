import { uuid } from "../util/uuid";
import { User } from "../user/user.model";

export class Thread{
    id:string;
    name:string | undefined;
    lastMessage!:string;

    constructor(id?:string, name?:string){
        this.id = id || uuid();
        this.name = name;
    }
}