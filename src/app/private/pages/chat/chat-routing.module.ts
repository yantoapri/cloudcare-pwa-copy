import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewComponent } from './view/view.component';
import { RekamMedisComponent } from './rekam_medis/rm.component';
const routes: Routes = [
	{
		path: '', redirectTo: 'view', pathMatch: 'full'
	}, {
		path: 'view',
		component: ViewComponent
	},
	{
		path: 'rekam-medis',
		component: RekamMedisComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class ChatRoutingModule { }
