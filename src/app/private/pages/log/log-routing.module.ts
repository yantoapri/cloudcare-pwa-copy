import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'log-transaksi',
    loadChildren: () => import('./transaksi/log-transaksi.module').then((m) => m.LogTransaksiModule)
  },
  // {
  //   path: 'katalog',
  //   loadChildren: () => import('./katalok/katalok.module').then((m) => m.KatalokModule)
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LogRoutingModule { }
