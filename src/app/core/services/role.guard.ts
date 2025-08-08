import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from './user.service';


@Injectable({ providedIn: 'root' })
export class RoleGuard implements CanActivate {

  constructor(private userService:UserService,private router: Router,  ){}
  
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    if (this.userService.isLoggedIn && !this.userService.isTokenExpiration) {
      return true;
    } else {
      this.router.navigate(['/auth/login']);
      return false;
    }
  }
}