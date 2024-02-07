import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewComponent } from './view/view.component';
import { ProsesAntreanComponent } from './proses-antrean/proses-antrean.component';
import { ProsesAntreanEditComponent } from './proses-antrean-edit/proses-antrean-edit.component';

const routes: Routes = [
  {
    path: '', redirectTo: 'view', pathMatch: 'full'
  },
  {
    path: ':kode/view',
    component : ViewComponent
  }, {
    path: ':kode/proses-antrean/:id',
    component: ProsesAntreanComponent
  },{
    path: ':kode/proses-antrean/edit/:id',
    component: ProsesAntreanEditComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AntreanPerawatRoutingModule { }
