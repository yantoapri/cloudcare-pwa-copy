import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'retur-penjualan',
    loadChildren: () => import('./retur-penjualan/retur-penjualan.module').then((m) => m.ReturPenjualanModule)
  },{
    path: 'retur-pbf',
    loadChildren: () => import('./retur-pbf/retur-pbf.module').then((m) => m.ReturPbfModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReturRoutingModule { }
