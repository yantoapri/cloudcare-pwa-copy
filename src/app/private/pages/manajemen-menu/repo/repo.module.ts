import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from "@angular/material/button";
import { RepoRoutingModule } from './repo-routing.module';
import { ViewComponent } from './view/view.component';
import { EditComponent } from './edit/edit.component';
import { TambahComponent } from './tambah/tambah.component';
import { NgxSpinnerModule } from "ngx-spinner";
import { ComponentsModule } from "src/app/shared/components/components.module";
import { DataTablesModule } from "angular-datatables";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { RepoEffects } from 'src/app/private/states/manajemen-menu/repo/repo.effects';
import { repoReducers } from 'src/app/private/states/manajemen-menu/repo/repo.reducers';
import { ModalModule as ModalModuleCustom } from 'src/app/shared/_modal';
@NgModule({
  declarations: [
    ViewComponent,
    EditComponent,
    TambahComponent
  ],
  imports: [
    MatButtonModule,
    CommonModule,
    RepoRoutingModule,
    ComponentsModule,
    NgxSpinnerModule,
    DataTablesModule,
    FormsModule, ReactiveFormsModule,
    StoreModule.forFeature('manajemenMenu_repo', repoReducers),
    EffectsModule.forFeature([ RepoEffects ]),
    ModalModuleCustom
  ]
})
export class RepoModule { }
