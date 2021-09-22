import { TestBed } from '@angular/core/testing';
import { Message } from './message.model';
import { Thread } from '../thread/thread.model';
import { User } from '../user/user.model';

import { MessageService } from './message.service';

describe('MessageService', () => {
  let service: MessageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MessageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should test', ()=>{
    let step: any = { description: "test", done: false };
    const user = new User('Nate');
    const thread:Thread = new Thread('t1','Nate');
    const m1:Message = new Message({
      author : user,
      text:'hi',
      thread:thread
    });

    const m2:Message = new Message({
      author:user,
      text:'Bye!',
      thread:thread
    });

    const m3:Message = new Message({
      author:user,
      text:'Welcome',
      thread:thread
    })

    service.newMessages.subscribe((message:Message) => {
      console.log('=> newMessages = '+ message.text);
    });

    service.messages.subscribe((messages:Message[]) => {
      console.log('=> messages : '+ messages.length)
    });

    service.addMessage(m1);;
    service.addMessage(m2);
    service.addMessage(m3)
  
    expect(step.done).toBeFalse();
  });
});
