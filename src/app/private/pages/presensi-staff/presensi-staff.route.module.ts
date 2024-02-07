import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PresensiStaffComponent } from './presensi-staff.component';


const routes: Routes = [
	{
		path: '', redirectTo: 'view', pathMatch: 'full'
	},
	{
		path: 'view',
		component: PresensiStaffComponent
	},
	
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class presensiStaffRoutingModule { }
