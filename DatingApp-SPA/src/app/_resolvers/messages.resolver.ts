import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {UserService} from '../_service/user.service';
import {AlertifyService} from '../_service/alertify.service';
import {Observable, of} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {Message} from '../_models/message';
import {AuthService} from '../_service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class MessagesResolver implements Resolve<Message[]> {
  pageNumber = 1;
  pageSize = 5;
  messageContainer = 'Unread';

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private router: Router,
    private alertify: AlertifyService
  ) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Message[]> | Promise<Message[]> | Message[] {
    return this.userService.getMessages(
      this.authService.decodedToken.nameid,
      this.pageNumber,
      this.pageSize,
      this.messageContainer
    ).pipe(
      catchError(error => {
        this.alertify.error('Problem retrieving messages');
        this.router.navigate(['/home']);
        return of(null);
      })
    );
  }
}
