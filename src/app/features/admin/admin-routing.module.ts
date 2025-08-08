import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './component/admin.component';
import { CityComponent } from './container/city/city.component';
import { AnalystComponent } from '../analyst/analyst.component';
import { PillarComponent } from './container/pillar/pillar.component';
import { QuestionComponent } from './container/question/question.component';
import { AssesmentComponent } from './container/assesment/assesment.component';


const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      { path: 'admin/', redirectTo: 'city', pathMatch: 'full' }, // default child route
      { path: 'city', component: CityComponent },
      { path: 'analyst', component: AnalystComponent }, // fixed typo
      { path: 'pillar', component: PillarComponent },
      { path: 'question', component: QuestionComponent },
      { path: 'assesment', component: AssesmentComponent }
    ]
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
