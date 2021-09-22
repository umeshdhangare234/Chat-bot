import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Message } from './message.model';
import { filter, map, scan } from 'rxjs/operators';
import { User } from '../user/user.model';
import { Thread } from '../thread/thread.model';


const initialMessages:Message[] = [];

interface IMessageOperation extends Function  {
  (messag:Message[]):Message[];
}

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  newMessages:Subject<Message> = new Subject<Message>();

  messages!:Observable<Message[]>;

  updates:Subject<any> = new Subject<any>();

  create:Subject<Message> = new Subject<Message>();

  markThreadAsRead:Subject<any> = new Subject<any>();

  constructor() {
    this.messages = this.updates.pipe(scan((messages:Message[], operation:IMessageOperation) => {
      return operation(messages)
    }, initialMessages));

    this.create.pipe(map(function (message:Message):IMessageOperation {
      return (messages:Message[]) => {
        return messages.concat(message);
      }
    })).subscribe(this.updates);

    this.newMessages.subscribe(this.create);

    this.markThreadAsRead
    .pipe(map( (thread: Thread) => {
      return (messages: Message[]) => {
        return messages.map( (message: Message) => {
          if (message.thread.id === thread.id) {
            message.isRead = true;
          }
          return message;
        });
      };
    }))
    .subscribe(this.updates);
   }

   addMessage(message:Message):void{
     this.newMessages.next(message);
   }

   messageForThreadUser(user:User, thread:Thread):Observable<Message>{
    return this.newMessages.pipe(filter((message:Message) => {
      return (message.thread.id === thread.id) && (message.author.id !== user.id);
    }));
   }
}
