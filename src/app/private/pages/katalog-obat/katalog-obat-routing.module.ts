import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'katalog',
    loadChildren: () => import('./katalog/katalog.module').then((m) => m.KatalogModule)
  },
  // {
  //   path: 'katalog',
  //   loadChildren: () => import('./katalok/katalok.module').then((m) => m.KatalokModule)
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class KatalogObatRoutingModule { }
