import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TypeRoleRoutingModule } from './type-role-routing.module';
import { ViewComponent } from './view/view.component';
import { TambahComponent } from './tambah/tambah.component';
import { ComponentsModule } from "src/app/shared/components/components.module";
import { DataTablesModule } from "angular-datatables";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgxSpinnerModule } from "ngx-spinner";
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { TypeRoleEffects } from '../../../states/role-and-rights/type-role/type-role.effects'
import { typeRoleReducer } from '../../../states/role-and-rights/type-role/type-role.reducers'
import { EditComponent } from './edit/edit.component';
import { MatButtonModule } from "@angular/material/button";
@NgModule({
  declarations: [
    ViewComponent,
    TambahComponent,
    EditComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    TypeRoleRoutingModule,
    FormsModule, ReactiveFormsModule,
    DataTablesModule,
    NgxSpinnerModule,
    ComponentsModule,
    StoreModule.forFeature('typeRole', typeRoleReducer),
    EffectsModule.forFeature([TypeRoleEffects]),
  ]
})
export class TypeRoleModule { }
