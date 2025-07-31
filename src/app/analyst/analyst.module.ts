import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AnalystComponent } from './analyst.component';

const routes: Routes = [
  {
    path: '',
    component: AnalystComponent
  }
];

@NgModule({
  declarations: [
    AnalystComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class AnalystModule { } 