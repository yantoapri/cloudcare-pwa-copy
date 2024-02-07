import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefektaComponent } from './view/defekta.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ModalModule as ModalModuleCustom } from 'src/app/shared/_modal';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DefektaRoutingModule } from './defekta-routing.module';
import { DataTablesModule } from "angular-datatables";
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { MatButtonModule } from "@angular/material/button";
import { NgxCurrencyModule } from "ngx-currency";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ComponentsModule } from "src/app/shared/components/components.module";
import { defektaObatReducers } from 'src/app/private/states/defekta-obat/defekta.reducer';
import { defektaObatEffects } from 'src/app/private/states/defekta-obat/defekta.effects';
import { NgSelectModule } from '@ng-select/ng-select';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { NgxSpinnerModule } from "ngx-spinner";
@NgModule({
  declarations: [
    DefektaComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    ModalModuleCustom,
    NgbModule,
    DefektaRoutingModule,
    ComponentsModule,
    DefektaRoutingModule,
    DataTablesModule,
    ReactiveFormsModule,
    BsDatepickerModule.forRoot(),
    NgxCurrencyModule,
    NgSelectModule,
    CollapseModule,
    StoreModule.forFeature('defekta-obat', defektaObatReducers),
    EffectsModule.forFeature([defektaObatEffects]),
  ],
  bootstrap: [DefektaComponent],
  exports: [DefektaComponent]
})
export class DefektaModule { }
