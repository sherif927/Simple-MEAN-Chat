import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  socket: any;
  constructor() {

  }

  init() {
    this.socket = io('http://192.168.1.4:3000');
  }

  listen(eventName: string) {
    return new Observable((observer) => {
      this.socket.on(eventName, (data) => {
        observer.next(data);
      })
    })
  }

  disconnect() {
    this.socket.disconnect();
  }

  joinRoom(username: string, roomName: string): void {
    this.socket.emit('join', { username, roomName });
  }

  sendMessage(eventName: string, msg: string) {
    this.socket.emit(eventName, msg);
  }
}
