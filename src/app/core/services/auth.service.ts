import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { LoginRequest, LoginResponse, User } from '../models/UserInfo';
import { HttpService } from '../http/http.service';
import { StorageKeyEnum } from '../enums/StorageKeyEnum';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();
  
  private tokenKey = StorageKeyEnum.TokenKey;
  private userKey = StorageKeyEnum.UserKey;

  constructor(
    private router: Router,
    private httpService: HttpService,
  ) {
    this.loadStoredUser();
  }

  private loadStoredUser(): void {
    const token = this.getToken();
    const user = this.getStoredUser();
    
    if (token && user) {
      this.currentUserSubject.next(user);
    }
  }

  login(credentials: LoginRequest): Observable<LoginResponse> {
    // For demo purposes, using mock service
    // Replace with your actual API endpoint: this.http.post<LoginResponse>('/api/auth/login', credentials)
    return this.httpService.post<LoginRequest,LoginResponse>('Auth/login', credentials)
      .pipe(
        tap(response  => {
          this.setToken(response.token);
          this.setStoredUser(response.user);
          this.currentUserSubject.next(response.user);
        }),
        catchError(error => {
          console.error('Login error:', error);
          return throwError(() => error);
        })
      );
  }

  logout(): void {
    this.removeToken();
    this.removeStoredUser();
    this.currentUserSubject.next(null);
    this.router.navigate(['/auth/login']);
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }

  getUserRole(): string {
    const user = this.currentUserSubject.value;
    const role = user?.role || '';
    console.log('Getting user role:', role); // Debug log
    return role;
  }

  getCurrentUser(): User | null {
    const user = this.currentUserSubject.value;
    console.log('Getting current user:', user); // Debug log
    return user;
  }

  refreshToken(): Observable<any> {
    return this.httpService.post('auth/refresh', {})
      .pipe(
        tap((response: any) => {
          this.setToken(response.token);
        }),
        catchError(error => {
          this.logout();
          return throwError(() => error);
        })
      );
  }

  setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  private removeToken(): void {
    localStorage.removeItem(this.tokenKey);
  }

  setStoredUser(user: User): void {
    localStorage.setItem(this.userKey, JSON.stringify(user));
  }

  getStoredUser(): User | null {
    const userStr = localStorage.getItem(this.userKey);
    return userStr ? JSON.parse(userStr) : null;
  }

  private removeStoredUser(): void {
    localStorage.removeItem(this.userKey);
  }

  private isTokenExpired(token: string): boolean {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp * 1000 < Date.now();
    } catch {
      return true;
    }
  }

  // Get token for HTTP requests
  getAuthToken(): string | null {
    return this.getToken();
  }
}
