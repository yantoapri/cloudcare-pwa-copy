import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'antrean-perawat',
    loadChildren : () => import('./antrean-perawat/antrean-perawat.module').then((m) => m.AntreanPerawatModule)
  },
  // {
  //   path: 'antrean-rujukan',
  //   loadChildren: () => import('./antrean-rujukan/antrean-rujukan.module').then((m) => m.AntreanRujukanModule)
  // },
  {
    path: 'tindakan-medis',
    loadChildren: () => import('./tindakan-medis/tindakan-medis.module').then((m) => m.TindakanMedisModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PerawatRoutingModule { }
