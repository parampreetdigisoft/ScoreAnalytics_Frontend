import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { EvaluatorComponent } from './evaluator.component';

const routes: Routes = [
  {
    path: '',
    component: EvaluatorComponent
  }
];

@NgModule({
  declarations: [
    EvaluatorComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class EvaluatorModule { } 