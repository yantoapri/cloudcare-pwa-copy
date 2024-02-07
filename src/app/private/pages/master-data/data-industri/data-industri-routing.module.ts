import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'distributor-obat-alat',
    loadChildren: () => import('./distributor-obat-alat/distributor-obat-alat.module').then((m) => m.DistributorObatAlatModule)
  },
  {
    path: 'pabrik-obat-alat',
    loadChildren: () => import('./pabrik-obat-alat/pabrik-obat-alat.module').then((m) => m.PabrikObatAlatModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DataIndustriRoutingModule { }
