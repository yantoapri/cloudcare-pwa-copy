import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { KatalogRoutingModule } from './katalog-routing.module';
import { ViewComponent } from './view/view.component';
import { BuatBaruComponent } from './buat-baru/buat-baru.component';
import { MatButtonModule } from "@angular/material/button";
import { ComponentsModule } from "src/app/shared/components/components.module";
import { DataTablesModule } from "angular-datatables";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ModalModule as ModalModuleCustom } from 'src/app/shared/_modal';
import { BarangBpomComponent } from './barang-bpom/barang-bpom.component';
import { ImportCsvComponent } from './import-csv/import-csv.component';
import { NgxCurrencyModule } from "ngx-currency";
import { NgxSpinnerModule } from "ngx-spinner";
// masterData_dataObat
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { AlatKesehatanReducers } from 'src/app/private/states/alat-kesehatan/alat-kesehatan.reducer';
import { AlatKesehatanEffects } from 'src/app/private/states/alat-kesehatan/alat-kesehatan.effects';
import { EditBuatBaruComponent } from './edit-buat-baru/edit-buat-baru.component';

@NgModule({
  declarations: [
    ViewComponent,
    BuatBaruComponent,
    BarangBpomComponent,
    ImportCsvComponent,
    EditBuatBaruComponent
  ],
  imports: [
    CommonModule,
    KatalogRoutingModule,
    ComponentsModule,
    DataTablesModule,
    MatButtonModule,
    NgxSpinnerModule,
    FormsModule,
    BsDatepickerModule,
    ReactiveFormsModule,
    ModalModuleCustom,
    NgxCurrencyModule,
    StoreModule.forFeature('alat_kesehatan', AlatKesehatanReducers),
    EffectsModule.forFeature([AlatKesehatanEffects]),
  ]
})
export class KatalogModule { }
