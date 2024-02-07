import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'akun',
    loadChildren : () => import('./akun/akun.module').then((m) => m.AkunModule)
  },{
    path: 'staf',
    loadChildren : () => import('./staf/staf.module').then((m) => m.StafModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManajemenAkunRoutingModule { }
