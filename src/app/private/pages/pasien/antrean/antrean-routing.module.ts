import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'antrean-pasien',
    loadChildren: () => import('./antrean-pasien/antrean-pasien.module').then((m) => m.AntreanPasienModule)
  },{
    path: 'pendaftaran-antrean',
    loadChildren: () => import('./pendaftaran-antrean/pendaftaran-antrean.module').then((m) => m.PendaftaranAntreanModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AntreanRoutingModule { }
