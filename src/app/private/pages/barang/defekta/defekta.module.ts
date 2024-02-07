import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefektaComponent } from './view/defekta.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { MatButtonModule } from "@angular/material/button";
import { ModalModule as ModalModuleCustom } from 'src/app/shared/_modal';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DefektaRoutingModule } from './defekta-routing.module';
import { DataTablesModule } from "angular-datatables";
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { NgxCurrencyModule } from "ngx-currency";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ComponentsModule } from "src/app/shared/components/components.module";
import { defektaAlatReducers } from 'src/app/private/states/alat-kesehatan/defekta/defekta.reducer';
import { defektaAlatEffects } from 'src/app/private/states/alat-kesehatan/defekta/defekta.effects';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxSpinnerModule } from "ngx-spinner";
@NgModule({
  declarations: [
    DefektaComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ModalModuleCustom,
    NgxSpinnerModule,
    NgbModule,
    DefektaRoutingModule,
    ComponentsModule,
    DefektaRoutingModule,
    DataTablesModule,
    ReactiveFormsModule,
    BsDatepickerModule.forRoot(),
    NgxCurrencyModule,
    NgSelectModule,
    MatButtonModule,
    StoreModule.forFeature('defekta-alat', defektaAlatReducers),
    EffectsModule.forFeature([defektaAlatEffects]),
  ],
  bootstrap: [DefektaComponent],
  exports: [DefektaComponent]
})
export class DefektaModule { }
