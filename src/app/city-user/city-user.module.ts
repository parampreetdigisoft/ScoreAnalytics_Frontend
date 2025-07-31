import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CityUserComponent } from './city-user.component';

const routes: Routes = [
  {
    path: '',
    component: CityUserComponent
  }
];

@NgModule({
  declarations: [
    CityUserComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class CityUserModule { } 