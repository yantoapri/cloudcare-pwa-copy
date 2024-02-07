import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewComponent } from './view/view.component';
import { AddComponent } from './add/add.component';
import { StrukComponent } from './struk/struk.component';
const routes: Routes = [
	{
		path: '', redirectTo: 'view', pathMatch: 'full'
	},
	{
		path: 'view',
		component: ViewComponent
	}, {
		path: 'add/:id',
		component: AddComponent
	}
	, {
		path: 'struk/:id',
		component: StrukComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class PenjualanKasirRoutingModule { }
