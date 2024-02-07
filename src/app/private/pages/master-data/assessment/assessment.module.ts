import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from "@angular/material/button";
import { AssessmentRoutingModule } from './assessment-routing.module';
import { ViewComponent } from './view/view.component';
import { ComponentsModule } from "src/app/shared/components/components.module";
import { DataTablesModule } from "angular-datatables";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ModalModule as ModalModuleCustom } from 'src/app/shared/_modal';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { assessmentReducers } from 'src/app/private/states/master-data/assessment/assessment.reducers';
import { AssessmentEffects } from 'src/app/private/states/master-data/assessment/assessment.effects';
import { NgxSpinnerModule } from "ngx-spinner";
@NgModule({
  declarations: [
    ViewComponent
  ],
  imports: [
    MatButtonModule,
    CommonModule,
    AssessmentRoutingModule,
    ReactiveFormsModule,
    ComponentsModule,
    DataTablesModule,
    NgxSpinnerModule,
    FormsModule,
    StoreModule.forFeature('masterData_assessment', assessmentReducers),
    EffectsModule.forFeature([ AssessmentEffects ]),
    ModalModuleCustom
  ]
})
export class AssessmentModule { }
