import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
	{
		path: 'data-penjualan',
		loadChildren: () => import('./data-penjualan/data-penjualan.module').then((m) => m.DataPenjualanModule)
	}, {
		path: 'penjualan-kasir',
		loadChildren: () => import('./penjualan-kasir/penjualan-kasir.module').then((m) => m.PenjualanKasirModule)
	},
	{
		path: 'e-resep',
		loadChildren: () => import('./eresep/eresep.module').then((m) => m.EResepModule)
	}
];


@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class PenjualanRoutingModule { }
