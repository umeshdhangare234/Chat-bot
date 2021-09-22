import {Component,  Inject,  ElementRef,  OnInit,  ChangeDetectionStrategy} from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../user/user.model';
import { Message } from '../message/message.model';
import { Thread } from '../thread/thread.model';
import { MessageService } from '../message/message.service';
import { UserService } from '../user/user.service';
import { ThreadService } from '../thread/thread.service';

@Component({
  selector: 'app-chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.css'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class ChatWindowComponent implements OnInit {
  messages!: Observable<any>;
  currentThread!: Thread;
  draftMessage!: Message;
  currentUser!: User;
  constructor(public messageService:MessageService, public userService:UserService, public threadService:ThreadService, public el:ElementRef) { } 

  ngOnInit(): void {
    this.messages = this.threadService.currentThreadMessages;

    this.draftMessage = new Message();

    this.threadService.currentThread.subscribe(
      (thread: Thread) => {
        this.currentThread = thread;
      });

    this.userService.currentUser
      .subscribe(
        (user: User) => {
          this.currentUser = user;
        });

    this.messages
      .subscribe(
        (messages: Array<Message>) => {
          setTimeout(() => {
            this.scrollToBottom();
          });
        });
  }

  onEnter(event: any): void {
    this.sendMessage();
    event.preventDefault();
  }

  sendMessage(): void {
    const m: Message = this.draftMessage;
    m.author = this.currentUser;
    m.thread = this.currentThread;
    m.isRead = true;
    this.messageService.addMessage(m);
    this.draftMessage = new Message();
  }

  scrollToBottom(): void {
    const scrollPane: any = this.el
      .nativeElement.querySelector('.msg-container-base');
    scrollPane.scrollTop = scrollPane.scrollHeight;
  }
}
