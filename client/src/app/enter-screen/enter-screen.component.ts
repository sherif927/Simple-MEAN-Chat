import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ChatService } from '../services/chat/chat.service';
import { UserService } from '../services/user/user.service';

@Component({
  selector: 'app-enter-screen',
  templateUrl: './enter-screen.component.html',
  styleUrls: ['./enter-screen.component.css']
})
export class EnterScreenComponent implements OnInit {

  username: string = "";
  roomName: string = "";
  constructor(private router: Router, private userService: UserService) { }

  ngOnInit(): void {
  }

  submitInfo(): void {
    this.userService.setInfo(this.username, this.roomName);
    if (this.userService.checkInfo()) {
      this.router.navigate(['/chat']);
    } else {
      alert('Please Try again');
    }
  }

}
