import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
	{
		path: 'pengaturan-jadwal-dokter',
		loadChildren: () => import('./dokter/dokter.module').then((m) => m.DokterModule)
	}, {
		path: 'pengaturan-jadwal-poli',
		loadChildren: () => import('./poli/poli.module').then((m) => m.PoliModule)
	}, {
		path: 'pengaturan-jadwal-staf',
		loadChildren: () => import('./staf/staf.module').then((m) => m.StafModule)
	}, {
		path: 'pengaturan-jadwal-klinik',
		loadChildren: () => import('./klinik/klinik.module').then((m) => m.KlinikModule)
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class PengaturanJadwalRoutingModule { }
