import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewComponent } from './view/view.component';
import { TambahComponent } from './tambah/tambah.component';
import { EditComponent } from './edit/edit.component';
import { AuthTokenGuard } from 'src/app/core/guard/auth-token.guard'

const routes: Routes = [
  {
    path: '', redirectTo: 'view', pathMatch: 'full'
  },{
    path: 'tambah', component: TambahComponent,
  },{
    path: 'view',
    canActivate: [AuthTokenGuard],
    component: ViewComponent
  },{
    path: 'edit/:id', component: EditComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TypeRoleRoutingModule { }
