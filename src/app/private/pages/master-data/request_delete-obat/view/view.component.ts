import { Component, OnInit, ViewChild } from '@angular/core';
import { DATA_OBAT } from '../data-dummy'
import { DataTableDirective } from 'angular-datatables'
@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.sass']
})
export class ViewComponent implements OnInit {

  constructor() { }
  public dataObat : any[]
  @ViewChild(DataTableDirective, {static: false}) datatableElement : any = DataTableDirective
  dtOptions: DataTables.Settings = {}
// datatableResponse = new DataTablesResponse
  ngOnInit(): void {
    this.dataObat = DATA_OBAT
  }

}
