import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {User} from '../_models/user';
import {Observable, of} from 'rxjs';
import {UserService} from '../_service/user.service';
import {AlertifyService} from '../_service/alertify.service';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MemberListResolver implements Resolve<User[]> {
  constructor(
    private userService: UserService,
    private router: Router,
    private alertify: AlertifyService
  ) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<User[]> | Promise<User[]> | User[] {
    return this.userService.getUsers().pipe(
      catchError(error => {
        this.alertify.error('Problem retrieving users');
        this.router.navigate(['/home']);
        return of(null);
      })
    );
  }
}
