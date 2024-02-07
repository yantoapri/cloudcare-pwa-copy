import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { jadwalStaffComponent } from './jadwal-staff.component';
import { addJadwal } from './addJadwal/addJadwal.component';
import { editJadwal } from './editJadwal/editJadwal.component';

const routes: Routes = [
	{
		path: '', redirectTo: 'view', pathMatch: 'full'
	},
	{
		path: 'view',
		component: jadwalStaffComponent
	},
	{
		path: 'add',
		component: addJadwal
	},
	{
		path: 'edit/:id',
		component: editJadwal
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class jadwalStaffRoutingModule { }
