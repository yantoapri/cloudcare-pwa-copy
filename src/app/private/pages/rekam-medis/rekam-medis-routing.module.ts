import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'pasien',
    loadChildren: () => import('./pasien/pasien.module').then((m) => m.PasienModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RekamMedisRoutingModule { }
