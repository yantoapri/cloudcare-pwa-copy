import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ViewLogComponent} from './log-obat/view.component'
import {ViewComponent} from './log-alat/view.component'
const routes: Routes = [
  {
    path: '', redirectTo: 'obat', pathMatch: 'full'
  },
  {
    path: 'obat',
    component: ViewLogComponent
  },
  {
    path: 'alat',
    component: ViewComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LogTransaksiRoutingModule { }
