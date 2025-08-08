import { ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent implements OnChanges {

@Output() forgotPassword = new EventEmitter();
@Input() loading: boolean=false;
@Input() isSuccess: boolean=false;

  email: string = '';

  constructor(private router:Router,private cdr: ChangeDetectorRef) { }
  ngOnChanges(changes: SimpleChanges): void {
    console.log('Changes detected:', this.isSuccess);
    this.cdr.detectChanges();
  }
  onSubmit(form: NgForm) {
      this.forgotPassword.emit(this.email);    
  }
  popUpEvent(){
     //this.router.navigate(['/auth/login']);
  }
}
