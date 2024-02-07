import { Component, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables'
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ModulFakturPembelianService} from 'src/app/private/modul-api/modul-gudang-transaksi/modul-faktur-pembelian.service';
import * as fromApp from 'src/app/private/states/private-app.states'
import { NgxSpinnerService } from "ngx-spinner";
import {MoneyService} from 'src/app/private/services/money/index'
@Component({
  selector: 'app-list-pembelian',
  templateUrl: './list-pembelian.component.html',
  styleUrls: ['./list-pembelian.component.sass']
})
export class ListPembelianComponent implements OnInit {

  @ViewChild(DataTableDirective, { static: false }) datatableElement: any = DataTableDirective
  dtOptions: DataTables.Settings = {};
  reloadTable: boolean
  getState: Observable<any>;
  dataBarang: any
  constructor(
    private ModulFakturPembelianService: ModulFakturPembelianService,
    private router: Router,
    private money:MoneyService,
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
        this.ModulFakturPembelianService.listDatatables(dataTablesParameters)
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
          data: 'tgl_faktur'
        },
        {
          data: 'nomor_faktur'
        },
        {
          data: 'total_harga',
          render(data: any, type: any, row: any, full: any) {
              return self.money.formatRupiah(parseInt(data))
          }
        },
        {
          data: 'pembayaran'
        },
        {
          orderable: false,
          searchable: false,
          render(data: any, type: any, row: any, full: any) {
            return `<button class="btn btn-link circle-primary text-ui-primary detail" title="Retur"><i class="fas fa-share-square"></i></button>`;
          }
        }
      ],
      rowCallback: (row: Node, data: any[] | Object, index: number) => {
        const self = this;
        $('td .detail', row).on('click', () => {
          self.detail(data);
        });
       
        return row;
      }
    }
  }

  detail(data){
    this.router.navigate(['retur','retur-pbf','add', data.id_pembelian])
  }
}
