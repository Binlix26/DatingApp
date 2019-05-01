import {Component, OnInit} from '@angular/core';
import {Message} from '../_models/message';
import {PaginatedResult, Pagination} from '../_models/pagination';
import {AuthService} from '../_service/auth.service';
import {UserService} from '../_service/user.service';
import {AlertifyService} from '../_service/alertify.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
  messages: Message[];
  pagination: Pagination;
  messageContainer = 'Unread';

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private acticatedRoute: ActivatedRoute,
    private alertify: AlertifyService
  ) {
  }

  ngOnInit() {
    this.acticatedRoute.data.subscribe(data => {
      this.messages = data['messages'].result;
      this.pagination = data['messages'].pagination;
    });
  }

  loadMessages() {
    this.userService.getMessages(
      this.authService.decodedToken.nameid,
      this.pagination.currentPage,
      this.pagination.itemsPerPage,
      this.messageContainer
    ).subscribe((res: PaginatedResult<Message[]>) => {
      this.messages = res.result;
      this.pagination = res.pagination;
    }, error => {
      this.alertify.error(error);
    });
  }

  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadMessages();
  }

}
