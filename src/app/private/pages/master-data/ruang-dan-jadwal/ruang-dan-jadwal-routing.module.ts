import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'daftar-ruang',
    loadChildren: () => import('./daftar-ruang/daftar-ruang.module').then((m) => m.DaftarRuangModule)
  },

  {
    path: 'jadwal-libur',
    loadChildren: () => import('./jadwal-libur/jadwal-libur.module').then((m) => m.JadwalLiburModule)
  },
  {
    path: 'jadwal-sesi',
    loadChildren: () => import('./jadwal-sesi/jadwal-sesi.module').then((m) => m.JadwalSesiModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RuangDanJadwalRoutingModule { }
