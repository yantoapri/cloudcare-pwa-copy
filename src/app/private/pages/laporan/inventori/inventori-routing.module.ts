import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewComponent } from './view/view.component';
import { ViewAlatComponent} from './view-alat/view.component';
const routes: Routes = [
	{
		path: '', redirectTo: 'view', pathMatch: 'full'
	}, {
		path: 'view',
		component: ViewComponent
	},
	{
		path: 'view-alat',
		component: ViewAlatComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class InventoriRoutingModule { }
