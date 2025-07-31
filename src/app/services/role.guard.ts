import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class RoleGuard implements CanActivate, CanLoad {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree {
    return this.checkRole(route.data['role']);
  }

  canLoad(route: Route, segments: UrlSegment[]): boolean | UrlTree {
    const role = route.data && route.data['role'];
    return this.checkRole(role);
  }

  private checkRole(expectedRole: string): boolean | UrlTree {
    const userRole = this.authService.getUserRole();
    console.log('Guard check:', { expectedRole, userRole }); // Debug log
    if (!this.authService.isAuthenticated()) {
      console.log('User not authenticated, redirecting to login'); // Debug log
      return this.router.parseUrl('/auth/login');
    }
    if (userRole === expectedRole) {
      console.log('Role match, allowing access'); // Debug log
      return true;
    } else {
      console.log('Role mismatch, redirecting to login'); // Debug log
      return this.router.parseUrl('/auth/login');
    }
  }
}
