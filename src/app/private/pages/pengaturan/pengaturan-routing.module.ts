import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'master-metode-bayar',
    loadChildren: () => import('./master-metode-bayar/master-metode-bayar.module').then((m) => m.MasterMetodeBayarModule)
  }, {
    path: 'setting-defekta',
    loadChildren: () => import('./setting-defekta/setting-defekta.module').then((m) => m.SettingDefektaModule)
  },{
    path: 'biaya-tambahan',
    loadChildren: () => import('./biaya-tambahan/biaya-tambahan.module').then((m) => m.BiayaTambahanModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PengaturanRoutingModule { }
