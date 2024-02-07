import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BarangRoutingModule } from './barang-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalModule as ModalModuleCustom } from 'src/app/shared/_modal';
@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        FormsModule,
        BarangRoutingModule,
        NgbModule,
        ModalModuleCustom
    ]
})
export class BarangModule { }
