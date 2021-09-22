import { uuid } from "../util/uuid";
import { User } from "../user/user.model";
import { Message } from "../message/message.model";

export class Thread{
    id:string;
    name:string | undefined;
    lastMessage!:Message;

    constructor(id?:string, name?:string){
        this.id = id || uuid();
        this.name = name;
    }
}