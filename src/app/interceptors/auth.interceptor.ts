import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpResponse
} from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  private isRefreshing = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = this.authService.getAuthToken();
    
    if (token) {
      request = this.addToken(request, token);
    }

    // Mock authentication for demo purposes
    if (request.url.includes('/api/auth/login')) {
      return this.handleMockLogin(request);
    }

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401 && !request.url.includes('/auth/refresh')) {
          return this.handle401Error(request, next);
        }
        return throwError(() => error);
      })
    );
  }

  private handleMockLogin(request: HttpRequest<unknown>): Observable<HttpEvent<unknown>> {
    const body = request.body as any;
    const mockUsers = {
      'admin@usvi.com': { id: 1, email: 'admin@usvi.com', role: 'admin', name: 'Admin User' },
      'analyst@usvi.com': { id: 2, email: 'analyst@usvi.com', role: 'analyst', name: 'Analyst User' },
      'evaluator@usvi.com': { id: 3, email: 'evaluator@usvi.com', role: 'evaluator', name: 'Evaluator User' },
      'cityuser@usvi.com': { id: 4, email: 'cityuser@usvi.com', role: 'city-user', name: 'City User' }
    };
    const mockTokens = {
      'admin@usvi.com': 'mock-jwt-token-admin',
      'analyst@usvi.com': 'mock-jwt-token-analyst',
      'evaluator@usvi.com': 'mock-jwt-token-evaluator',
      'cityuser@usvi.com': 'mock-jwt-token-cityuser'
    };

    const user = mockUsers[body.email as keyof typeof mockUsers];
    
    if (user && body.password === 'password') {
      const token = mockTokens[body.email as keyof typeof mockTokens];
      const response = { token, user };
      
      // Simulate successful login
      this.authService.setToken(token);
      this.authService.setStoredUser(user);
      this.authService.currentUserSubject.next(user);
      
      return of(new HttpResponse({ body: response }));
    }
    
    return throwError(() => new HttpErrorResponse({ 
      status: 401, 
      error: { message: 'Invalid credentials' } 
    }));
  }

  private addToken(request: HttpRequest<any>, token: string): HttpRequest<any> {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!this.isRefreshing) {
      this.isRefreshing = true;

      return this.authService.refreshToken().pipe(
        switchMap((response: any) => {
          this.isRefreshing = false;
          return next.handle(this.addToken(request, response.token));
        }),
        catchError((error) => {
          this.isRefreshing = false;
          this.authService.logout();
          return throwError(() => error);
        })
      );
    }

    return next.handle(request);
  }
} 