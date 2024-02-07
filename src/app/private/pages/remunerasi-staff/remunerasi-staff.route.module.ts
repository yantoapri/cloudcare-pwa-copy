import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { remunerasiStaffComponent } from './remunerasi-staff.component';


const routes: Routes = [
	{
		path: '', redirectTo: 'view', pathMatch: 'full'
	},
	{
		path: 'view',
		component: remunerasiStaffComponent
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class remunerasiStaffRouteModule { }
