import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewComponent } from './view/view.component';
import { AddComponent } from './add/add.component';
import { ListPenjualanComponent } from './list-penjualan/list-penjualan.component';
import { DetailComponent } from './detail/detail.component';
const routes: Routes = [
  {
    path: '', redirectTo: 'view', pathMatch: 'full'
  },
  {
    path: 'view',
    component : ViewComponent
  },
  {
    path: 'add/:id',
    component : AddComponent
  },
  {
    path: 'list-penjualan',
    component : ListPenjualanComponent
  },{
    path: 'detail/:id',
    component : DetailComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReturPenjualanRoutingModule { }
