import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewComponent } from './view/view.component';
import { TambahComponent } from './tambah/tambah.component';
import { UbahComponent } from './ubah/ubah.component';

const routes: Routes = [
  {
    path: '', redirectTo: 'view', pathMatch: 'full'
  },
  {
    path: 'view',
    component: ViewComponent
  },
  {
    path: 'tambah',
    component: TambahComponent
  },
  {
    path: 'ubah/:id',
    component: UbahComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoleRoutingModule { }
