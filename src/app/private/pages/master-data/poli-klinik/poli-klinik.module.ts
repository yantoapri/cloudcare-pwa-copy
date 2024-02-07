import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PoliKlinikRoutingModule } from './poli-klinik-routing.module';
import { ViewComponent } from './view/view.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { ComponentsModule } from "src/app/shared/components/components.module";
import { MatInputModule } from "@angular/material/input";

@NgModule({
  declarations: [
    ViewComponent
  ],
  imports: [
    CommonModule,
    PoliKlinikRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    ComponentsModule,
    MatInputModule
  ]
})
export class PoliKlinikModule { }
