import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewComponent } from './view/view.component';
import { AddComponent } from './add/add.component';
import { FinishComponent } from './finish/finish.component';
import { ListPembelianComponent } from './list-pembelian/list-pembelian.component';
import { DetailComponent } from './detail/detail.component';
import { ListPenggantianComponent } from './list-penggantian/list-pengganti.component';

const routes: Routes = [
  {
    path: '', redirectTo: 'view', pathMatch: 'full'
  },
  {
    path: 'view',
    component : ViewComponent
  },
  {
    path: 'finish',
    component : FinishComponent
  },
  {
    path: 'penggantian',
    component : ListPenggantianComponent
  },
  {
    path: 'add/:id',
    component : AddComponent
  },
  {
    path: 'list-pembelian',
    component : ListPembelianComponent
  },{
    path: 'detail/:id',
    component : DetailComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReturPbfRoutingModule { }
