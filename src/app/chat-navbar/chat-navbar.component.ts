import { Component, OnInit } from '@angular/core';
import { combineLatest } from 'rxjs';
import { Message } from '../message/message.model';
import { MessageService } from '../message/message.service';
import { Thread } from '../thread/thread.model';
import { ThreadService } from '../thread/thread.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-chat-navbar',
  templateUrl: './chat-navbar.component.html',
  styleUrls: ['./chat-navbar.component.css']
})
export class ChatNavbarComponent implements OnInit {

  unreadMessagesCount!: number;

  constructor(public messageService: MessageService,
              public threadsService: ThreadService) {
  }

  ngOnInit(): void {
    // this.messageService.messages
    // .combineLatest(
    //   this.threadsService.currentThread,
    //   (messages: Message[], currentThread: Thread) =>
    //     [currentThread, messages] )
    combineLatest([this.threadsService.currentThread, this.messageService.messages])

    .subscribe(([currentThread, messages]: [Thread, Message[]]) => {
      this.unreadMessagesCount =
        _.reduce(
          messages,
          (sum: number, m: Message) => {
            const messageIsInCurrentThread: boolean = m.thread &&
              currentThread &&
              (currentThread.id === m.thread.id);
            // note: in a "real" app you should also exclude
            // messages that were authored by the current user b/c they've
            // already been "read"
            if (m && !m.isRead && !messageIsInCurrentThread) {
              sum = sum + 1;
            }
            return sum;
          },
          0);
    });
  }

}
