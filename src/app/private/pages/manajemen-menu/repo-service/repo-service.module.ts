import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from "@angular/material/button";
import { RepoServiceRoutingModule } from './repo-service-routing.module';
import { ViewComponent } from './view/view.component';
import { ComponentsModule } from "src/app/shared/components/components.module";
import { DataTablesModule } from "angular-datatables";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { RepoServiceEffects } from 'src/app/private/states/manajemen-menu/repo-service/repo-service.effects'
import { repoServiceReducers } from 'src/app/private/states/manajemen-menu/repo-service/repo-service.reducers';
import { ModalModule as ModalModuleCustom } from 'src/app/shared/_modal';
import { NgxSpinnerModule } from "ngx-spinner";
@NgModule({
  declarations: [
    ViewComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    RepoServiceRoutingModule,
    ReactiveFormsModule,
    ComponentsModule,
    DataTablesModule,
    FormsModule,
    NgxSpinnerModule,
    StoreModule.forFeature('manajemenMenu_repoService', repoServiceReducers),
    EffectsModule.forFeature([RepoServiceEffects]),
    ModalModuleCustom
  ]
})
export class RepoServiceModule { }
