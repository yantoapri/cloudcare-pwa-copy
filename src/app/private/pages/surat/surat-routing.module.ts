import { NgModule, } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewComponent } from './surat-sakit/view.component'
import { ViewComponent as ViewDiagnosa } from './surat-diagnosa/view.component'
import { ViewComponent as ViewKesehatan } from './surat-sehat/view.component'
import { ViewComponent as ViewRujukan } from './surat-rujukan/view.component'

const routes: Routes = [
	{
		path: '', redirectTo: 'sakit', pathMatch: 'full'
	},
	{
		path: 'sakit',
		component: ViewComponent
	},
	{
		path: 'kesehatan',
		component: ViewKesehatan
	},
	{
		path: 'rujukan',
		component: ViewRujukan
	},
	{
		path: 'diagnosa',
		component: ViewDiagnosa
	},

];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class SuratRoutingModule { }
