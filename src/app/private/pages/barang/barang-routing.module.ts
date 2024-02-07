import { NgModule, } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [
	{
		path: 'stok',
		// component: StokComponent
		loadChildren: () => import('./stok/stok-alat.module').then((m) => m.StokAlatModule)
	},
	{
		path: 'defekta',
		// component: DefektaComponent
		loadChildren: () => import('./defekta/defekta.module').then((m) => m.DefektaModule)
	},
	{
		path: 'defekta-obat',
		// component: DefektaComponent
		loadChildren: () => import('./defekta-obat/defekta.module').then((m) => m.DefektaModule)
	},
	{
		path: 'katalog',
		// component: KatalogComponent
		loadChildren: () => import('./katalog/katalog.module').then((m) => m.KatalogModule)
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class BarangRoutingModule { }
