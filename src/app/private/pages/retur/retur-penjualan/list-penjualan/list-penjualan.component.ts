import { Component, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables'
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ModulPenjualanService} from 'src/app/private/modul-api/modul-gudang-transaksi/modul-penjualan.service';
import * as fromApp from 'src/app/private/states/private-app.states'
import { NgxSpinnerService } from "ngx-spinner";
import * as moment from 'moment';
import {MoneyService} from 'src/app/private/services/money/index'
@Component({
  selector: 'app-list-penjualan',
  templateUrl: './list-penjualan.component.html',
  styleUrls: ['./list-penjualan.component.sass']
})
export class ListPenjualanComponent implements OnInit {

  @ViewChild(DataTableDirective, { static: false }) datatableElement: any = DataTableDirective
  dtOptions: DataTables.Settings = {};
  reloadTable: boolean
  getState: Observable<any>;
  dataBarang: any
  constructor(
    // private modalService: ModalService,
    private ModulPenjualanService: ModulPenjualanService,
    private router: Router,
    private money:MoneyService,
    private spinner : NgxSpinnerService,
    private store: Store<fromApp.PrivateAppState>,
  ) {
    this.getState = this.store.select('retur')
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
    }, 600);
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
        this.ModulPenjualanService.listRiwayat(dataTablesParameters)
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
          data: 'created_at_unix',
          render(data: any, type: any, row: any, full: any) {
            return moment(new Date(data)).format('DD-MM-YYYY')
          }
        },
        {
          data: 'kode_invoice'
        },
        {
          data: 'total_harga', render(data: any, type: any, row: any, full: any) {
						return self.money.formatRupiah(parseInt(data))
					}
        },
        {
          data: 'metode_pembayaran',
         
        },
        {
          orderable: false,
          searchable: false,
          render(data: any, type: any, row: any, full: any) {
            return `<button class="btn btn-link circle-primary text-ui-primary detail" title="retur"><i class="fas fa-share-square"></i></button>`;
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
    this.router.navigate(['retur','retur-penjualan','add', data.id_penjualan])
  }
}
