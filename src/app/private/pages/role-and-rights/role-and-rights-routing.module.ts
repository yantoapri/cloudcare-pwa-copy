import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthTokenGuard } from 'src/app/core/guard/auth-token.guard'

const routes: Routes = [
  {
    path: 'master-data-user',

    loadChildren: () => import('./master-data-user/master-data-user.module').then((m) => m.MasterDataUserModule)
  },{
    path: 'role',
    loadChildren: () => import('./role/role.module').then((m) => m.RoleModule)
  },{
    path: 'tipe-role',
    canActivate: [AuthTokenGuard],
    loadChildren: () => import('./type-role/type-role.module').then((m) => m.TypeRoleModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoleAndRightsRoutingModule { }
