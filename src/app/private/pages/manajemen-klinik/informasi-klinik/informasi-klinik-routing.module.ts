import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ViewComponent } from './view/view.component';
import { EditComponent } from './edit/edit.component';

const routes: Routes = [
  {
    path: 'view',
    component: ViewComponent,
  },
  {
    path: 'view/:id',
    component: ViewComponent
  },{
    path: 'edit/:id',
    component : EditComponent
  },
  {
    path: 'edit',
    component : EditComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InformasiKlinikRoutingModule { }
