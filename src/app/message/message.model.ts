import { uuid } from "../util/uuid";
import { User } from "../user/user.model";
import { Thread } from "../thread/thread.model";

export class Message {
    id: string;
    isRead: boolean;
    sentAt: Date;
    text: string;
    thread: Thread;
    author: User

    constructor(obj?: any) {
        this.id = obj && obj.id || uuid();
        this.isRead = obj && obj.isRead || false;
        this.sentAt = obj && obj.sentAt || new Date();
        this.author = obj && obj.author || null;
        this.text = obj && obj.text || null;
        this.thread = obj && obj.thread || null;
    }

}