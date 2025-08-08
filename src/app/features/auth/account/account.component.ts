import { Component, OnInit } from '@angular/core';
import { FormGroup} from '@angular/forms';
import { ActivatedRoute, ActivatedRouteSnapshot, NavigationEnd, Router } from '@angular/router';
import { filter, Subject } from 'rxjs';
import { UserService } from 'src/app/core/services/user.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrl: './account.component.css'
})
export class AccountComponent implements OnInit {

  public errorMessage: string='';
  public loading: boolean=false;
  private destroy$ = new Subject();
  public roleName: string='login';
  isSuccess: boolean = false;

constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    console.log('Account component initialized');

    this.router.events
      .subscribe(() => {
        const child = this.getChild(this.route);
        child.data.subscribe(data => {
          this.roleName = data['roles'];
          console.log('Role:', this.roleName);
        });
      });
  }

  getChild(route: ActivatedRoute): ActivatedRoute {
    while (route.firstChild) {
      route = route.firstChild;
    }
    return route;
  }
   
  public login(event: FormGroup) {
    if (!this.loading) {
      if (event.value.email != null && event.value.password != null) {
        this.loading = true;
        this.authService.login(event.value.email, event.value.password)
        .subscribe({
            next: (res: any) => {
              this.userService.RedirectBasedOnRole();;
              this.loading = false;
            },
            error: (err) => {
              this.loading = false;
            },
          })
      }
    }
  }
  public resetPassword(event: FormGroup) {
    if (!this.loading) {
      if (event.value.password != null) {
        this.loading = true;
        this.authService.resetPassword(event.value)
        .subscribe({
            next: (res: any) => {
              this.isSuccess = true;
              this.loading = false;
            },
            error: (err) => {
              this.loading = false;
            },
          })
      }
    }
  }

  public sendEmail(email: string) {
    if (!this.loading) {
      this.loading = true;
      this.authService.forgotPassword(email)
      .subscribe({
          next: (res: any) => {
            this.loading = false;
            this.isSuccess = true;
          },
          error: (err) => {
            this.loading = false;
          },
      })
    }
  }
}
