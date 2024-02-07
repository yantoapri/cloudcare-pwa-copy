import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewComponent } from './view/view.component';
import { BuatBaruComponent } from './buat-baru/buat-baru.component';
import { ImportCsvComponent } from './import-csv/import-csv.component';
import { BarangBpomComponent } from './barang-bpom/barang-bpom.component';
import { EditBuatBaruComponent } from './edit-buat-baru/edit-buat-baru.component';

const routes: Routes = [
  {
    path: '', redirectTo: 'view', pathMatch: 'full'
  },
  {
    path: 'view',
    component: ViewComponent
  },{
    path: 'buat-baru',
    component: BuatBaruComponent
  }
  ,{
    path: 'edit-buat-baru/:id',
    component: EditBuatBaruComponent
  }
  ,{
    path: 'edit-buat-baru/:id/:page',
    component: EditBuatBaruComponent
  }, {
    path: 'katalog-barang-bpom',
    component: BarangBpomComponent
  }, {
    path: 'import-csv',
    component: ImportCsvComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class KatalogRoutingModule { }
