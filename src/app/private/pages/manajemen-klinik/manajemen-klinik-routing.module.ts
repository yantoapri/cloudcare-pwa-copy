import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'master-poli',
    loadChildren: () => import('./master-poli/master-poli.module').then((m) => m.MasterPoliModule)
    // loadChildren : () => import('./menu/menu.module').then((m) => m.MenuModule)
  },{
    path: 'daftar-poliklinik',
    loadChildren: () => import('./daftar-poliklinik/daftar-poliklinik.module').then((m) => m.DaftarPoliklinikModule)
  },{
    path: 'daftar-klinik',
    loadChildren: () => import('./daftar-klinik/daftar-klinik.module').then((m) => m.DaftarKlinikModule)
  },{
    path: 'informasi-klinik',
    loadChildren: () => import('./informasi-klinik/informasi-klinik.module').then((m) => m.InformasiKlinikModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManajemenKlinikRoutingModule { }
