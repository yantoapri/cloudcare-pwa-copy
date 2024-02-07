import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path : 'umum',
    loadChildren: () => import('./umum/umum.module').then((m) => m.UmumModule)
  },
  {
    path: 'fisioterapi',
    loadChildren: () => import('./fisioterapi/fisioterapi.module').then((m) => m.FisioterapiModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AntreanDokterRoutingModule { }
