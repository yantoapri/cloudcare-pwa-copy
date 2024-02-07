import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'data-pasien',
    loadChildren : () => import('./data-pasien/data-pasien.module').then((m) => m.DataPasienModule)
  },
  {
    path: 'antrean',
    loadChildren : () => import('./antrean/antrean.module').then((m) => m.AntreanModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PasienRoutingModule { }
