import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { kpiComponent } from './kpi.component';
import { detailKPIComponent } from './detail/detailKPI.component';


const routes: Routes = [
	{
		path: '', redirectTo: 'view', pathMatch: 'full'
	},
	{
		path: 'view',
		component: kpiComponent
	},
	{
		path: 'detail/:id',
		component: detailKPIComponent
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class kpiRoutingModule { }
