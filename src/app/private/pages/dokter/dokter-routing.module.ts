import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
	{
		path: 'antrean-dokter',
		loadChildren: () => import('./antrean-dokter/antrean-dokter.module').then((m) => m.AntreanDokterModule)
	}, {
		path: 'antrean-rujukan',
		loadChildren: () => import('./antrean-rujukan/antrean-rujukan.module').then((m) => m.AntreanRujukanModule)
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class DokterRoutingModule { }
