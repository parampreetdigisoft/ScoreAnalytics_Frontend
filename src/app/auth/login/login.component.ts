import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  template: `
    <div class="login-container">
      <div class="login-card">
        <h2>Login to USVI App</h2>
        
        <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
          <div class="form-group">
            <label for="email">Email</label>
            <input 
              type="email" 
              id="email" 
              formControlName="email" 
              placeholder="Enter your email"
              class="form-control"
              [class.error]="isFieldInvalid('email')"
            />
            <div class="error-message" *ngIf="isFieldInvalid('email')">
              Please enter a valid email address
            </div>
          </div>

          <div class="form-group">
            <label for="password">Password</label>
            <input 
              type="password" 
              id="password" 
              formControlName="password" 
              placeholder="Enter your password"
              class="form-control"
              [class.error]="isFieldInvalid('password')"
            />
            <div class="error-message" *ngIf="isFieldInvalid('password')">
              Password is required
            </div>
          </div>

          <div class="form-group">
            <button 
              type="submit" 
              class="btn btn-primary"
              [disabled]="loginForm.invalid || isLoading"
            >
              {{ isLoading ? 'Logging in...' : 'Login' }}
            </button>
          </div>

          <div class="error-message" *ngIf="errorMessage">
            {{ errorMessage }}
          </div>
        </form>

        <div class="demo-accounts">
          <h4>Demo Accounts:</h4>
          <div class="demo-account" (click)="loginAsDemo('admin')">
            <strong>Admin:</strong> admin&#64;usvi.com / password
          </div>
          <div class="demo-account" (click)="loginAsDemo('analyst')">
            <strong>Analyst:</strong> analyst&#64;usvi.com / password
          </div>
          <div class="demo-account" (click)="loginAsDemo('evaluator')">
            <strong>Evaluator:</strong> evaluator&#64;usvi.com / password
          </div>
          <div class="demo-account" (click)="loginAsDemo('city-user')">
            <strong>City User:</strong> cityuser&#64;usvi.com / password
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .login-container {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    }

    .login-card {
      background: white;
      padding: 2rem;
      border-radius: 10px;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
      width: 100%;
      max-width: 400px;
    }

    h2 {
      text-align: center;
      color: #333;
      margin-bottom: 2rem;
    }

    .form-group {
      margin-bottom: 1.5rem;
    }

    label {
      display: block;
      margin-bottom: 0.5rem;
      color: #555;
      font-weight: 500;
    }

    .form-control {
      width: 100%;
      padding: 0.75rem;
      border: 2px solid #e1e5e9;
      border-radius: 5px;
      font-size: 1rem;
      transition: border-color 0.3s ease;
    }

    .form-control:focus {
      outline: none;
      border-color: #667eea;
    }

    .form-control.error {
      border-color: #e74c3c;
    }

    .btn {
      width: 100%;
      padding: 0.75rem;
      border: none;
      border-radius: 5px;
      font-size: 1rem;
      font-weight: 600;
      cursor: pointer;
      transition: background-color 0.3s ease;
    }

    .btn-primary {
      background-color: #667eea;
      color: white;
    }

    .btn-primary:hover:not(:disabled) {
      background-color: #5a6fd8;
    }

    .btn-primary:disabled {
      background-color: #bdc3c7;
      cursor: not-allowed;
    }

    .error-message {
      color: #e74c3c;
      font-size: 0.875rem;
      margin-top: 0.25rem;
    }

    .demo-accounts {
      margin-top: 2rem;
      padding-top: 1rem;
      border-top: 1px solid #e1e5e9;
    }

    .demo-accounts h4 {
      margin-bottom: 1rem;
      color: #666;
      font-size: 0.9rem;
    }

    .demo-account {
      padding: 0.5rem;
      margin-bottom: 0.5rem;
      background-color: #f8f9fa;
      border-radius: 5px;
      cursor: pointer;
      font-size: 0.875rem;
      transition: background-color 0.3s ease;
    }

    .demo-account:hover {
      background-color: #e9ecef;
    }
  `]
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isLoading = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit(): void {
    // Redirect if already authenticated
    if (this.authService.isAuthenticated()) {
      this.redirectBasedOnRole();
    }
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.errorMessage = '';

      this.authService.login(this.loginForm.value).subscribe({
        next: (response) => {
          console.log('Login success:', response); // Debug log
          this.isLoading = false;
          this.redirectBasedOnRole();
        },
        error: (error) => {
          this.isLoading = false;
          this.errorMessage = error.error?.message || 'Login failed. Please try again.';
        }
      });
    }
  }

  loginAsDemo(role: string): void {
    const demoCredentials = {
      admin: { email: 'admin@usvi.com', password: 'password' },
      analyst: { email: 'analyst@usvi.com', password: 'password' },
      evaluator: { email: 'evaluator@usvi.com', password: 'password' },
      'city-user': { email: 'cityuser@usvi.com', password: 'password' }
    };

    const credentials = demoCredentials[role as keyof typeof demoCredentials];
    this.loginForm.patchValue(credentials);
    this.onSubmit();
  }

  private redirectBasedOnRole(): void {
    const role = this.authService.getUserRole();
    console.log('Redirecting based on role:', role);
    setTimeout(() => { // <-- Add this
      switch (role) {
        case 'admin':
          this.router.navigate(['/admin']);
          break;
        case 'analyst':
          this.router.navigate(['/analyst']);
          break;
        case 'evaluator':
          this.router.navigate(['/evaluator']);
          break;
        case 'city-user':
          this.router.navigate(['/city-user']);
          break;
        default:
          this.router.navigate(['/home']);
      }
    }, 0); // <-- Add this
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.loginForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }
} 