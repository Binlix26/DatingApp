import {Component, Input, OnInit} from '@angular/core';
import {Message} from '../../_models/message';
import {AuthService} from '../../_service/auth.service';
import {UserService} from '../../_service/user.service';
import {AlertifyService} from '../../_service/alertify.service';
import {tap} from 'rxjs/operators';

@Component({
  selector: 'app-member-messages',
  templateUrl: './member-messages.component.html',
  styleUrls: ['./member-messages.component.css']
})
export class MemberMessagesComponent implements OnInit {

  @Input() recipientId: number;
  messages: Message[] = [];
  newMessage: any = {};

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private alertify: AlertifyService
  ) {
  }

  ngOnInit() {
    this.loadMessages();
  }

  loadMessages() {
    const currentId = +this.authService.decodedToken.nameid;
    // tap => do something before subscribe
    this.userService.getMessageThread(currentId, this.recipientId)
      .pipe(
        tap(messages => {
          for (const message of messages) {
            if (!message.isRead && message.recipientId === currentId) {
              this.userService.markAsRead(currentId, message.id);
            }
          }
        })
      )
      .subscribe(
        messages => this.messages = messages,
        error => this.alertify.error(error));
  }

  sendMessage() {
    this.newMessage.recipientId = this.recipientId;
    this.userService.sendMessage(this.authService.decodedToken.nameid, this.newMessage)
      .subscribe((message: Message) => {
          this.messages.unshift(message);
          this.newMessage.content = '';
        }, error => this.alertify.error(error)
      );
  }
}
