import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'faktur-pembelian',
    loadChildren: ()=>import('./faktur-pembelian/faktur-pembelian.module').then((m) => m.FakturPembelianModule)
  },{
    path: 'supplier',
    loadChildren: () => import('./supplier/supplier.module').then((m) => m.SupplierModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FakturRoutingModule { }
