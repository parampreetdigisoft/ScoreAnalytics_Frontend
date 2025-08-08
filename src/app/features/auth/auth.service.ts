import { Injectable } from '@angular/core';
import { Subject, tap } from 'rxjs';
import { HttpService } from 'src/app/core/http/http.service';
import { UserService } from 'src/app/core/services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  public errorMessage: Subject<any> = new Subject<any>();

  constructor(private http: HttpService, private userService: UserService) { }

  public login(email: string, password: string) {
    const data = JSON.stringify({ email, password });
    return this.http.post(`Auth/login`, data)
    .pipe(tap((user: any) => {
      if (user)
        this.userService.userInfo = user;
    }));
  }

  public forgotPassword(email: string) {
    const data = JSON.stringify({ email });
    return this.http.post(`Auth/forgotPassword`, data);
  }

  public resetPassword(data: any) {
    return this.http.post(`Auth/changePassword`, data)
      .pipe(tap((user: any) => {
        this.userService.userInfo = user;
      }));
  }
}
