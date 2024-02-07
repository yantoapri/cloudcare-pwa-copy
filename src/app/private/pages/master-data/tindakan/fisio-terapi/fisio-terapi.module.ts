import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FisioTerapiRoutingModule } from './fisio-terapi-routing.module';
import { ViewComponent } from './view/view.component';

import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { MatButtonModule } from "@angular/material/button";
import { ComponentsModule } from "src/app/shared/components/components.module";
import { MatInputModule } from "@angular/material/input";
import { ModalModule as ModalModuleCustom } from 'src/app/shared/_modal';
@NgModule({
  declarations: [
    ViewComponent
  ],
  imports: [
    CommonModule,
    FisioTerapiRoutingModule,
    MatInputModule,
    ComponentsModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    ModalModuleCustom

  ]
})
export class FisioTerapiModule { }
