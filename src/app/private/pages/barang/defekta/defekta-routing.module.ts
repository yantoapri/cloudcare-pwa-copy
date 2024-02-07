import { NgModule, } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefektaComponent } from './view/defekta.component'

const routes: Routes = [
    {
        path: '', redirectTo: 'view', pathMatch: 'full'
    },
    {
        path: 'view',
        component: DefektaComponent
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DefektaRoutingModule { }
