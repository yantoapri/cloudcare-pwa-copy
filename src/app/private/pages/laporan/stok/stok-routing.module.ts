import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'obat',
    loadChildren: () => import('./obat/obat.module').then((m) => m.ObatModule)
  },{
    path: 'alat-kesehatan',
    loadChildren: () => import('./alat-kesehatan/alat-kesehatan.module').then((m) => m.AlatKesehatanModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StokRoutingModule { }
