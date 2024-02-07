import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'tindakan',
    loadChildren: () => import('./tindakan/tindakan.module').then((m) => m.TindakanModule)
  },
  // {
  //   path: 'alat-bantu',
  //   loadChildren: () => import('./alat-bantu/alat-bantu.module').then((m) => m.AlatBantuModule)
  // },
  {
    path: 'assessment',
    loadChildren: () => import('./assessment/assessment.module').then((m) => m.AssessmentModule)
  },
  {
    path: 'data-industri',
    loadChildren: () => import('./data-industri/data-industri.module').then((m) => m.DataIndustriModule)
  },
  // {
  //   path: 'obat',
  //   loadChildren: () => import('./obat/obat.module').then((m) => m.ObatModule)
  // },
  {
    path: 'rujukan',
    loadChildren: () => import('./rujukan/rujukan.module').then((m) => m.RujukanModule)
  },
  {
    path: 'poli-klinik',
    loadChildren: () => import('./poli-klinik/poli-klinik.module').then((m) => m.PoliKlinikModule)
  },
  {
    path: 'ruang-dan-jadwal',
    loadChildren: () => import('./ruang-dan-jadwal/ruang-dan-jadwal.module').then((m) =>m.RuangDanJadwalModule)
  },
  // {
  //   path: 'jadwal-libur',
  //   loadChildren: () => import('./jadwal-libur/jadwal-libur.module').then((m) => m.JadwalLiburModule)
  // },
  // {
  //   path: 'jadwal-sesi',
  //   loadChildren: () => import('./jadwal-sesi/jadwal-sesi.module').then((m) => m.JadwalSesiModule)
  // }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MasterDataRoutingModule { }
