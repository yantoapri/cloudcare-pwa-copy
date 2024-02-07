import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewComponent } from './view/view.component';
import { DetailComponent } from './detail/detail.component';

const routes: Routes = [
  {
    path: '', redirectTo: 'view', pathMatch: 'full'
  },{
    path: 'view',
    component: ViewComponent
  },
  {
    path: 'detail/:id/:poliklinik/:date_month',
    component: DetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class KunjunganBulananRoutingModule { }
