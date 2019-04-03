import {Injectable} from '@angular/core';
import {User} from '../_models/user';
import {UserService} from '../_service/user.service';
import {ActivatedRouteSnapshot, Resolve, Router} from '@angular/router';
import {AlertifyService} from '../_service/alertify.service';
import {Observable, of} from 'rxjs';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MemberDetailResolver implements Resolve<User> {
  constructor(
    private userService: UserService,
    private router: Router,
    private alertify: AlertifyService
  ) {
  }

  // it will automatically subscribe the observable (ActivatedRoute)
  // only need to catch error and redirect
  resolve(route: ActivatedRouteSnapshot): Observable<User> {
    return this.userService.getUser(+route.params['id'])
      .pipe(
        catchError(error => {
          this.alertify.error('Problem retrieving data');
          this.router.navigate(['/members']);
          return of(null);
        })
      );
  }

}
