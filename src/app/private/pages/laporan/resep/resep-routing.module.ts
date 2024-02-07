import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewComponent } from './view/view.component';

const routes: Routes = [
	{
		path: '', redirectTo: 'view', pathMatch: 'full'
	}, {
		path: 'view',
		component: ViewComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class ResepRoutingModule { }
