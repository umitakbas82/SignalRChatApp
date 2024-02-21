import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { ChatService } from '../services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit,OnDestroy {
@Output() closeChatEmitter=new EventEmitter();

  constructor(public service:ChatService) { }
  ngOnDestroy(): void {
    this.service.stopChatConnection()
    
  }

  ngOnInit(): void {
    this.service.createChatConnection();
  }

  backToHome(){
    this.closeChatEmitter.emit();
  }

}
