import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'pembelian-obat',
    loadChildren: () => import('./pembelian-obat/pembelian-obat.module').then((m) => m.PembelianObatModule)
  },{
    path: 'pengeluaran-obat',
    loadChildren: () => import('./pengeluaran-obat/pengeluaran-obat.module').then((m) => m.PengeluaranObatModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ObatRoutingModule { }
