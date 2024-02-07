import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { gajiStaffComponent } from './gaji-staff.component';
import { detailGajiStaffComponent } from './detailGaji/detail-gaji.component'


const routes: Routes = [
	{
		path: '', redirectTo: 'view', pathMatch: 'full'
	},
	{
		path: 'view',
		component: gajiStaffComponent
	},
	{
		path: 'detail/:id',
		component: detailGajiStaffComponent
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class gajiStaffRouteModule { }
