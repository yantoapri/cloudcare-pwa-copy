import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StaffComponent } from './staff.component';
import { detailStaffComponent } from './detail/detailStaff.component';


const routes: Routes = [
	{
		path: '', redirectTo: 'view', pathMatch: 'full'
	},
	{
		path: 'view',
		component: StaffComponent
	},
	{
		path: 'detail/:id',
		component: detailStaffComponent
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class StaffRoutingModule { }
