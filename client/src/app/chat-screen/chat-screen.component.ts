import { Component, OnInit, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';
import { UserService } from '../services/user/user.service';
import { ChatService } from '../services/chat/chat.service';

@Component({
  selector: 'app-chat-screen',
  templateUrl: './chat-screen.component.html',
  styleUrls: ['./chat-screen.component.css']
})
export class ChatScreenComponent implements OnInit, OnDestroy {

  message: string;
  messages: any[] = [];
  username: string;
  roomName: string;

  constructor(private chatService: ChatService, private userService: UserService, private location: Location) { }


  ngOnInit(): void {
    if (!this.userService.checkInfo()) this.location.back();
    this.username = this.userService.getUserame();
    this.roomName = this.userService.getRoomName();
    this.chatService.init();
    this.chatService.joinRoom(this.username, this.roomName);
    this.chatService
      .listen('message')
      .subscribe(data => this.handleMessage(data));

  }

  ngOnDestroy(): void {
    this.chatService.disconnect();
  }

  handleMessage(messageObj): void {
    let date = new Date(messageObj.createdAt);
    messageObj['formattedDate'] = date.toLocaleString();
    this.messages.push(messageObj);
  }

  sendMessage() {
    if (this.message != "") {
      this.chatService.sendMessage('createMessage', this.message);
      this.message = '';
    }
  }

}
