import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {JwtHelperService} from '@auth0/angular-jwt';
import {environment} from '../../environments/environment';
import {User} from '../_models/user';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = environment.apiUrl + 'auth/';
  jwtHelper = new JwtHelperService();
  decodedToken: any;
  currentUser: User;
  photoUrl = new BehaviorSubject<string>('../../assets/user.png');
  currentPhotoUrl = this.photoUrl.asObservable();

  constructor(private http: HttpClient) {
  }

  changeMemberPhoto(photoUrl: string) {
    this.photoUrl.next(photoUrl);
  }

  login(user: User) {
    return this.http.post(this.baseUrl + 'login', user)
      .pipe(
        map((response: any) => {
          const currentUser = response;
          if (currentUser) {
            localStorage.setItem('token', currentUser.token);
            localStorage.setItem('user', JSON.stringify(currentUser.user));
            this.decodedToken = this.jwtHelper.decodeToken(currentUser.token);
            this.currentUser = currentUser.user;
            this.changeMemberPhoto(this.currentUser.photoUrl);
          }
        })
      );
  }

  register(user: User) {
    return this.http.post(this.baseUrl + 'register', user);
  }

  loggedIn() {
    const token = localStorage.getItem('token');
    return !this.jwtHelper.isTokenExpired(token);
  }
}
