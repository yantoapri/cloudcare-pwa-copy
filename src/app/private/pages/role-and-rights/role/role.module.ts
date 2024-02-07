import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoleRoutingModule } from './role-routing.module';
import { ViewComponent } from './view/view.component';

import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgxSpinnerModule } from "ngx-spinner";
import { MatButtonModule } from "@angular/material/button";
import { ComponentsModule } from "src/app/shared/components/components.module";
import { MatInputModule } from "@angular/material/input";
import { TambahComponent } from './tambah/tambah.component';
import { UbahComponent } from './ubah/ubah.component';
import { DataTablesModule } from "angular-datatables";

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { RoleEffects } from 'src/app/private/states/role-and-rights/role/role.effects'
import { RoleReducer } from 'src/app/private/states/role-and-rights/role/role.reducers'

@NgModule({
  declarations: [
    ViewComponent,
    TambahComponent,
    UbahComponent
  ],
  imports: [
    CommonModule,
    RoleRoutingModule,
    NgxSpinnerModule,
    ReactiveFormsModule,
    FormsModule,
    MatButtonModule,
    ComponentsModule,
    MatInputModule,
    DataTablesModule,
    StoreModule.forFeature('roleAkun', RoleReducer),
    EffectsModule.forFeature([ RoleEffects ]),
  ]
})
export class RoleModule { }
