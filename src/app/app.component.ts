import { Component } from '@angular/core';
import { MessageService } from './message/message.service';
import { UserService } from './user/user.service';
import { ThreadService } from './thread/thread.service';
import { ChatExampleData } from './data/chat-example';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'data-architecture';

  constructor(public messageService:MessageService, public userService:UserService, public threadService:ThreadService){
    ChatExampleData.init(messageService,threadService,userService);
  }
}
