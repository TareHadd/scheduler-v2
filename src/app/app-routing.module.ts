import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SchedulerV2Component } from './scheduler-v2/scheduler-v2.component';

const routes: Routes = [

  { path: 'reload', redirectTo: '/'},
  { path: '', component: SchedulerV2Component}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
