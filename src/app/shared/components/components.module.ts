import { NgModule } from '@angular/core';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { SharedModule } from '../shared.module';
import { SheetJSComponent } from './xlsx/sheet.component';
import { SheetJSComponentObat } from './xlsx_obat/sheet.component';
import { DataTablesModule } from "angular-datatables";
@NgModule({
	declarations: [FileUploadComponent, BreadcrumbComponent, SheetJSComponent,SheetJSComponentObat],
	imports: [SharedModule, DataTablesModule],
	exports: [FileUploadComponent, BreadcrumbComponent, SheetJSComponent,SheetJSComponentObat],
})
export class ComponentsModule { }
