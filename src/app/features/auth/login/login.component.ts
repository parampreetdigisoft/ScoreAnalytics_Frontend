import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
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