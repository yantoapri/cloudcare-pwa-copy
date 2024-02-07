import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewComponent } from './view/view.component';
import { DetailComponent } from './detail/detail.component';
import { AddComponent } from './add/add.component';
import { AntrianComponent } from './antrian/antrian.component';

const routes: Routes = [
	{
		path: '', redirectTo: 'antrian', pathMatch: 'full'
	},
	{
		path: 'riwayat',
		component: ViewComponent
	},
	{
		path: 'riwayat/:back',
		component: ViewComponent
	},
	{
		path: 'antrian',
		component: AntrianComponent
	},
	{
		path: 'add/:id/:id_antrian/:id_pasien/:page',
		component: AddComponent
	},
	{
		path: 'detail/:id/:page',
		component: DetailComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class DataResepRoutingModule { }
