import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'pembelian-alat',
    loadChildren: () => import('./pembelian-alat/pembelian-alat.module').then((m) => m.PembelianAlatModule)
  },{
    path: 'pengeluaran-alat',
    loadChildren: () => import('./pengeluaran-alat/pengeluaran-alat.module').then((m) => m.PengeluaranAlatModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AlatRoutingModule { }
