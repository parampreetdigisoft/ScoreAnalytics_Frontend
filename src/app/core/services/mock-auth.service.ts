import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';
import { AuthService, LoginRequest, LoginResponse, User } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class MockAuthService {
  
  private mockUsers: { [key: string]: User } = {
    'admin@usvi.com': {
      id: 1,
      email: 'admin@usvi.com',
      role: 'admin',
      name: 'Admin User'
    },
    'analyst@usvi.com': {
      id: 2,
      email: 'analyst@usvi.com',
      role: 'analyst',
      name: 'Analyst User'
    },
    'evaluator@usvi.com': {
      id: 3,
      email: 'evaluator@usvi.com',
      role: 'evaluator',
      name: 'Evaluator User'
    },
    'cityuser@usvi.com': {
      id: 4,
      email: 'cityuser@usvi.com',
      role: 'city-user',
      name: 'City User'
    }
  };

  private mockTokens: { [key: string]: string } = {
    'admin@usvi.com': 'mock-jwt-token-admin',
    'analyst@usvi.com': 'mock-jwt-token-analyst',
    'evaluator@usvi.com': 'mock-jwt-token-evaluator',
    'cityuser@usvi.com': 'mock-jwt-token-cityuser'
  };

  login(credentials: LoginRequest): Observable<LoginResponse> {
    const user = this.mockUsers[credentials.email];
    
    if (user && credentials.password === 'password') {
      const token = this.mockTokens[credentials.email];
      const response: LoginResponse = {
        token,
        user
      };
      
      return of(response).pipe(delay(1000)); // Simulate network delay
    }
    
    return throwError(() => new Error('Invalid credentials'));
  }

  refreshToken(): Observable<any> {
    return of({ token: 'new-mock-jwt-token' }).pipe(delay(500));
  }
} 