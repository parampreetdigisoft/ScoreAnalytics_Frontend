import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {  UserInfo } from '../models/UserInfo';
import { StorageKeyEnum } from '../enums/StorageKeyEnum';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userInfoSource = new BehaviorSubject<UserInfo>(this.getUserInfo());
  private isLoggedInSource = new BehaviorSubject<boolean>(this.getUserInfo() ? true : false);
  private isTokenExpirationSource = new BehaviorSubject<boolean>((new Date().toISOString() < this.getUserInfo()?.tokenExpirationDate) ? false : true);
  public rolePermissionsSidebar = new BehaviorSubject<boolean>(true);

  constructor(private router: Router) {}

  get userInfo() {
      return this.userInfoSource.value;
  }

  set userInfo(user: UserInfo) {
    if (user) {
      localStorage.setItem(StorageKeyEnum.UserInfo, JSON.stringify(user));
    } else {
      localStorage.removeItem(StorageKeyEnum.UserInfo);
    }
    this.userInfoSource.next(user);
    this.isLoggedIn = user ? true : false;
    this.isTokenExpiration = new Date().toISOString() < user?.tokenExpirationDate ? false : true;
  }
  get isLoggedIn() {
    return this.isLoggedInSource.value;
  }
  set isLoggedIn(value: boolean) {
    this.isLoggedInSource.next(value);
  }
   get isTokenExpiration() {
    return this.isTokenExpirationSource.value;
  }
  set isTokenExpiration(value: boolean) {
    this.isTokenExpirationSource.next(value);
  }
  private getUserInfo(): UserInfo {
    const user = JSON.parse(localStorage.getItem(StorageKeyEnum.UserInfo) || null as any) as UserInfo;
    if (user) {
      return user;
    } else {
      return null as any;
    }
  }
  RedirectBasedOnRole(): void {
    const role = this.userInfo?.role.toLowerCase(); 
    setTimeout(() => {
      switch (role) {
        case 'admin':
         this.router.navigate(['/admin/city'], { state: { role: 'Admin' } });
          break;
        case 'analyst':
          this.router.navigate(['/analyst'], { state: { role: 'Analyst' } });
          break;
        case 'evaluator':
          this.router.navigate(['/evaluator'], { state: { role: 'Evaluator' } });
          break;
        case 'city-user':
          this.router.navigate(['/city-user'], { state: { role: 'city-user' } });
          break;
        default:
          this.router.navigate(['/']);
      }
    }, 0);
  }
}
