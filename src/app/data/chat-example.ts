/* tslint:disable:max-line-length */
import { User } from '../user/user.model';
import { Thread } from '../thread/thread.model';
import { Message } from '../message/message.model';
import { MessageService } from '../message/message.service';
import { ThreadService } from '../thread/thread.service';
import { UserService } from '../user/user.service';
import * as moment from 'moment';

// the person using the app us Juliet
const me: User      = new User('Juliet');
const ladycap: User = new User('Lady Capulet');
const echo: User    = new User('Echo Bot');
const rev: User     = new User('Reverse Bot');
const wait: User    = new User('Waiting Bot');

const tLadycap: Thread = new Thread('tLadycap', ladycap.name);
const tEcho: Thread    = new Thread('tEcho', echo.name);
const tRev: Thread     = new Thread('tRev', rev.name);
const tWait: Thread    = new Thread('tWait', wait.name);

const initialMessages: Array<Message> = [
  new Message({
    author: me,
    sentAt: moment().subtract(45, 'minutes').toDate(),
    text: 'Yet let me weep for such a feeling loss.'
  }),
  new Message({
    author: ladycap,
    sentAt: moment().subtract(20, 'minutes').toDate(),
    text: 'So shall you feel the loss, but not the friend which you weep for.'
    
  }),
  new Message({
    author: echo,
    sentAt: moment().subtract(1, 'minutes').toDate(),
    text: `I\'ll echo whatever you send me`
    
  }),
  new Message({
    author: rev,
    sentAt: moment().subtract(3, 'minutes').toDate(),
    text: `I\'ll reverse whatever you send me`
    
  }),
  new Message({
    author: wait,
    sentAt: moment().subtract(4, 'minutes').toDate(),
    text: `I\'ll wait however many seconds you send to me before responding. Try sending '3'`,
    
  }),
];

export class ChatExampleData {
  static init(messagesService: MessageService,
              threadsService: ThreadService,
              UsersService: UserService): void {

    // TODO make `messages` hot
    messagesService.messages.subscribe(() => ({}));

    // set "Juliet" as the current user
    UsersService.setCurrentUser(me);

    // create the initial messages
    initialMessages.map( (message: Message) => messagesService.addMessage(message) );

    threadsService.setCurrentThread(tEcho);

    this.setupBots(messagesService);
  }

  static setupBots(messagesService: MessageService): void {

    // echo bot
    messagesService.messageForThreadUser(echo, tEcho)
      .forEach( (message: Message): void => {
        messagesService.addMessage(
          new Message({
            author: echo,
            text: message.text,
            thread: tEcho
          })
        );
      });


    // reverse bot
    messagesService.messageForThreadUser(rev, tRev)
      .forEach( (message: Message): void => {
        messagesService.addMessage(
          new Message({
            author: rev,
            text: message.text.split('').reverse().join(''),
            thread: tRev
          })
        );
      });

    // waiting bot
    messagesService.messageForThreadUser(wait, tWait)
      .forEach( (message: Message): void => {

        let waitTime: number = parseInt(message.text, 10);
        let reply: string;

        if (isNaN(waitTime)) {
          waitTime = 0;
          reply = `I didn\'t understand ${message.text}. Try sending me a number`;
        } else {
          reply = `I waited ${waitTime} seconds to send you this.`;
        }

        setTimeout(
          () => {
            messagesService.addMessage(
              new Message({
                author: wait,
                text: reply,
                thread: tWait
              })
            );
          },
          waitTime * 1000);
      });


  }
}