import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManajemenAkunRoutingModule } from './manajemen-akun-routing.module';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    ManajemenAkunRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ManajemenAkunModule { }
