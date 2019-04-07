import {Component, HostListener, OnInit, ViewChild} from '@angular/core';
import {User} from '../../_models/user';
import {ActivatedRoute} from '@angular/router';
import {AlertifyService} from '../../_service/alertify.service';
import {NgForm} from '@angular/forms';
import {UserService} from '../../_service/user.service';
import {AuthService} from '../../_service/auth.service';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit {

  @ViewChild('editForm') editForm: NgForm;
  user: User;
  photoUrl: string;

  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
    if (this.editForm.dirty) {
      $event.returnValue = true;
    }
  }

  constructor(
    private activatedRoute: ActivatedRoute,
    private alertify: AlertifyService,
    private userService: UserService,
    private authService: AuthService
  ) {
  }

  ngOnInit() {
    // retrieve the data subscribed by the resolver
    this.activatedRoute.data.subscribe(data => {
      this.user = data['user'];
    });

    this.authService.photoUrl.subscribe(url => this.photoUrl = url);
  }

  updateUser() {
    this.userService.updateUser(this.authService.decodedToken.nameid, this.user).subscribe(
      next => {
        this.alertify.success('Profile updated successfully');
        this.editForm.reset(this.user);
      }, error => {
        this.alertify.error(error);
      });
  }

  updateMainPhoto(photoUrl) {
    this.user.photoUrl = photoUrl;
  }
}
