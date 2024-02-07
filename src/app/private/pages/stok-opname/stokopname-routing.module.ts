import { NgModule, } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StokOpnameComponent } from './view/stok-opname.component'
import { StokopnameMulaiComponent } from './mulai/stokopname-mulai.component'
import { StokOpnameLaporanComponent } from './laporan/stokopname-laporan.component'
import { RiwayatComponent } from './riwayat/riwayat.component'

const routes: Routes = [
	{
		path: '', redirectTo: 'view', pathMatch: 'full'
	},
	{
		path: 'view',
		component: StokOpnameComponent
	},
	{
		path: 'mulai/:id/:status',
		component: StokopnameMulaiComponent
	},
	{
		path: 'tinjau',
		component: StokOpnameLaporanComponent
	},
	{
		path: 'riwayat',
		component: RiwayatComponent
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class StokOpnameRoutingModule { }
