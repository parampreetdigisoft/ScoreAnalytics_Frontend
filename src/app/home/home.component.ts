import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  template: `
    <div class="home-container">
      <div class="welcome-card">
        <h2>Welcome to USVI Angular App</h2>
        <p>This is the home page.</p>
        
        <div *ngIf="!isAuthenticated" class="auth-section">
          <p>Please log in to access the application.</p>
          <button (click)="goToLogin()" class="btn-login">Login</button>
        </div>
        
        <div *ngIf="isAuthenticated" class="user-section">
          <p>Welcome back, {{ currentUser?.name }}!</p>
          <p>Role: {{ currentUser?.role }}</p>
          <button (click)="logout()" class="btn-logout">Logout</button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .home-container {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    }

    .welcome-card {
      background: white;
      padding: 2rem;
      border-radius: 10px;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
      text-align: center;
      max-width: 500px;
    }

    h2 {
      color: #333;
      margin-bottom: 1rem;
    }

    .auth-section, .user-section {
      margin-top: 2rem;
      padding-top: 1rem;
      border-top: 1px solid #e1e5e9;
    }

    .btn-login, .btn-logout {
      padding: 10px 20px;
      border: none;
      border-radius: 5px;
      font-size: 1rem;
      cursor: pointer;
      transition: background-color 0.3s ease;
    }

    .btn-login {
      background-color: #667eea;
      color: white;
    }

    .btn-login:hover {
      background-color: #5a6fd8;
    }

    .btn-logout {
      background-color: #e74c3c;
      color: white;
    }

    .btn-logout:hover {
      background-color: #c0392b;
    }
  `]
})
export class HomeComponent implements OnInit {
  isAuthenticated = false;
  currentUser: any = null;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authService.currentUser$.subscribe(user => {
      this.isAuthenticated = !!user;
      this.currentUser = user;
    });
  }

  goToLogin(): void {
    this.router.navigate(['/auth/login']);
  }

  logout(): void {
    this.authService.logout();
  }
} 