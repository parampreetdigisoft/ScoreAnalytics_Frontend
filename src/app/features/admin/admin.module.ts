import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './component/admin.component';
import { AdminRoutingModule } from './admin-routing.module';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent
  }
];

@NgModule({
  declarations: [
    AdminComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    AdminRoutingModule
  ],
  bootstrap: [AdminComponent]
})
export class AdminModule { } 