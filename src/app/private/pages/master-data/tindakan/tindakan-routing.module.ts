import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'dokter',
    loadChildren: () => import('./dokter/dokter.module').then((m) => m.DokterModule)
  },
  {
    path: 'fisio-terapi',
    loadChildren: () => import('./fisio-terapi/fisio-terapi.module').then((m) => m.FisioTerapiModule)
  },
  {
    path: 'medis-umum',
    loadChildren : () => import('./medis-umum/medis-umum.module').then((m) => m.MedisUmumModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TindakanRoutingModule { }
