import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { LoginComponent } from '../presentation/login/login.component';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrl: './account.component.css'
})
export class AccountComponent implements OnInit {
 public roleName: string='login';

   constructor( private route: ActivatedRoute) {
    this.route.snapshot.children.filter((data: ActivatedRouteSnapshot) => {
      debugger
      this.roleName = data.data['roles'];
      console.log(this.roleName);
    });

  }
  ngOnInit(): void {
    this.route.snapshot.children.filter((data: ActivatedRouteSnapshot) => {
      debugger
      this.roleName = data.data['roles'];
    });
  }
}
