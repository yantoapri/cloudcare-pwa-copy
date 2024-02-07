import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewComponent } from './view/view.component';
import { ProsesAntreanComponent } from './proses-antrean/proses-antrean.component';
import { NgxSpinnerModule } from "ngx-spinner";
import { AntreanPerawatRoutingModule } from './antrean-perawat-routing.module'
import { ComponentsModule } from "src/app/shared/components/components.module";
import { DataTablesModule } from "angular-datatables";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { NgSelectModule } from '@ng-select/ng-select';
import { MatButtonModule } from "@angular/material/button";
import { ProsesAntreanPerawatEffects } from 'src/app/private/states/perawat/proses-antrean-perawat/proses-antrean-perawat.effects'
import { prosesAntreanPerawatReducers }from 'src/app/private/states/perawat/proses-antrean-perawat/proses-antrean-perawat.reducers';
import { ProsesAntreanEditComponent } from './proses-antrean-edit/proses-antrean-edit.component'
@NgModule({
  declarations: [
    ViewComponent,
    ProsesAntreanComponent,
    ProsesAntreanEditComponent
  ],
  imports: [
    CommonModule,
    NgSelectModule ,
    AntreanPerawatRoutingModule,
    ComponentsModule,
    DataTablesModule,
    NgxSpinnerModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    StoreModule.forFeature('perawat_prosesAntreanPerawat', prosesAntreanPerawatReducers),
    EffectsModule.forFeature([ ProsesAntreanPerawatEffects ])

    // perawat_prosesAntreanPerawat
  ]
})
export class AntreanPerawatModule { }
