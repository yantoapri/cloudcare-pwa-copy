import { Component, OnInit,ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables'
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ModulReturPenggantianService} from 'src/app/private/modul-api/modul-gudang-transaksi/modul-retur-penggantian';
import * as fromApp from 'src/app/private/states/private-app.states'
import { NgxSpinnerService } from "ngx-spinner";
import * as moment from 'moment';
@Component({
  selector: 'app-list-pengganti',
  templateUrl: './list-pengganti.component.html',
  styleUrls: ['./list-pengganti.component.sass']
})
export class ListPenggantianComponent implements OnInit {

  @ViewChild(DataTableDirective, { static: false }) datatableElement: any = DataTableDirective
  dtOptions: DataTables.Settings = {};
  reloadTable: boolean
  getState: Observable<any>;
  dataBarang: any
  constructor(
    private ModulReturPenggantianService: ModulReturPenggantianService,
    private router: Router,
    private spinner : NgxSpinnerService,
    private store: Store<fromApp.PrivateAppState>,
  ) {
    this.getState = this.store.select('retur_gudang')
  }

  ngOnInit(): void {
    this.spinner.show('spinner1')
    this.dtOptions = this.showDataTables()
    this.getState.subscribe((state) => {
      this.reloadTable = state.reloadTable
      if (this.reloadTable === true) {
        this.reLoadData()
      }
    })
    setTimeout(() => {
      this.spinner.hide('spinner1')
    }, 400);
  }
  reLoadData() {
    this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.ajax.reload();
    });
  }

  showDataTables() {
    let self=this
    return {
      pageLength: 10,
      serverSide: true,
      processing: true,
      order: [],
      ajax: (dataTablesParameters: any, callback: any) => {
        this.ModulReturPenggantianService.listDatatables(dataTablesParameters)
          .subscribe((resp: any) => {
            
            callback({
              draw: resp.response.draw,
              recordsTotal: resp.response.recordsTotal,
              recordsFiltered: resp.response.recordsFiltered,
              data: resp.response.data
            })
          })
      },
      columns: [
        {
          orderable: false,
          searchable: false,
          render(data: any, type: any, row: any, full: any) {
            return full.row + 1 + full.settings._iDisplayStart;
          }
        },
        {
          data: 'kode_invoice_full'
        },
        {
          data: 'tgl_faktur_unix',
          render(data: any, type: any, row: any, full: any) {
            return moment(data).format('DD-MM-YYYY')
          }
        },
        {
          data: 'tgl_diterima_unix',
          render(data: any, type: any, row: any, full: any) {
            return moment(data).format('DD-MM-YYYY')
          }
        },
        {
          data: 'nomor_faktur'
        }
      ],
      
    }
  }

  detail(data){
    this.router.navigate(['retur','retur-pbf','add', data.id_pembelian])
  }
}
