import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewComponent } from './view/view.component';
import { TambahStokObatComponent } from './tambah-stok-obat/tambah-stok-obat.component';
import { TambahObatComponent } from './tambah-obat/tambah-obat.component';

const routes: Routes = [
  {
    path: '', redirectTo: 'view', pathMatch: 'full'
  },
  {
    path: 'view', component: ViewComponent
  },{
    path: 'tambah-stok-obat', component: TambahStokObatComponent
  },{
    path: 'tambah-obat', component: TambahObatComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ObatRoutingModule { }
