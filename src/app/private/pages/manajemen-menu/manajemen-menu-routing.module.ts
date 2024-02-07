import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'menu',
    loadChildren : () => import('./menu/menu.module').then((m) => m.MenuModule)
  },
  {
    path: 'repo',
    loadChildren : () => import('./repo/repo.module').then((m) => m.RepoModule)
  },
  {
    path: 'repo-service',
    loadChildren : () => import('./repo-service/repo-service.module').then((m) => m.RepoServiceModule)
  },
  {
    path : 'menu-right',
    loadChildren : () => import('./menu-right/menu-right.module').then((m) => m.MenuRightModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManajemenMenuRoutingModule { }
