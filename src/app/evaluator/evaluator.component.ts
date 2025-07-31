import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-evaluator',
  template: `
    <div class="dashboard">
      <header class="dashboard-header">
        <h1>Evaluator Dashboard</h1>
        <div class="user-info">
          <span>Welcome, {{ currentUser?.name }}</span>
          <button (click)="logout()" class="btn-logout">Logout</button>
        </div>
      </header>
      
      <div class="dashboard-content">
        <div class="card">
          <h3>Project Evaluation</h3>
          <p>Evaluate and review project submissions</p>
        </div>
        
        <div class="card">
          <h3>Assessment Tools</h3>
          <p>Access evaluation tools and criteria</p>
        </div>
        
        <div class="card">
          <h3>Evaluation History</h3>
          <p>View past evaluations and feedback</p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .dashboard {
      padding: 20px;
      max-width: 1200px;
      margin: 0 auto;
    }

    .dashboard-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 30px;
      padding-bottom: 20px;
      border-bottom: 2px solid #e1e5e9;
    }

    .user-info {
      display: flex;
      align-items: center;
      gap: 15px;
    }

    .btn-logout {
      padding: 8px 16px;
      background-color: #e74c3c;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }

    .btn-logout:hover {
      background-color: #c0392b;
    }

    .dashboard-content {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 20px;
    }

    .card {
      background: white;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
      border: 1px solid #e1e5e9;
    }

    .card h3 {
      margin-top: 0;
      color: #333;
    }

    .card p {
      color: #666;
      margin-bottom: 0;
    }
  `]
})
export class EvaluatorComponent {
  currentUser = this.authService.getCurrentUser();

  constructor(private authService: AuthService) {}

  logout(): void {
    this.authService.logout();
  }
} 