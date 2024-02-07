import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ModalService } from 'src/app/shared/_modal';
import { DataTableDirective } from 'angular-datatables'
import { Observable } from 'rxjs';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ModulFakturPembelianService } from 'src/app/private/modul-api/modul-gudang-transaksi/modul-faktur-pembelian.service';
import * as FakturPembelianAction from 'src/app/private/states/faktur-pembelian/faktur-pembelian.action'
import * as fromApp from 'src/app/private/states/private-app.states'
import { fakturPayload } from 'src/app/private/models/class-payload-api/gudang-transaksi/pembelian-payload';
import { NgxSpinnerService } from "ngx-spinner";
import * as moment from 'moment';
import {MoneyService} from 'src/app/private/services/money/index'
@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.sass']
})
export class ViewComponent implements OnInit, OnDestroy {

  @ViewChild(DataTableDirective, { static: false }) datatableElement: any = DataTableDirective
  dtOptions: DataTables.Settings = {};
  reloadTable: boolean
  getState: Observable<any>;
  dataBarang: fakturPayload = new fakturPayload
  constructor(
    private modalService: ModalService,
    private ModulReturPembelianService: ModulFakturPembelianService,
    private router: Router,
    private money:MoneyService,
    private spinner : NgxSpinnerService,
    private store: Store<fromApp.PrivateAppState>,
  ) {
    this.getState = this.store.select('faktur_pembelian')
  }
  btnDetail=false
  btnDelete=false
  btnEdit=false
  btnSetting=false
  btnAdd=false
  view=false
  ngOnInit(): void {
    this.spinner.show('spinner1')
    let item=JSON.parse(localStorage.getItem('currentUser'))
    item=item.menu_right
    this.btnAdd=this.btnDelete=this.btnEdit=item.findIndex((val)=>val.kode=='ATPBFB1')!=-1?true:false
    this.btnDetail=this.view=item.findIndex((val)=>val.kode=='ATPBFB9')!=-1?true:false

    if(!this.view){
        Swal.fire("Warning","Anda tidak mempunyai akses halaman ini",'warning').then(()=>{
          window.location.href='/'
        })
    }
    this.dtOptions = this.showDataTables()
    setTimeout(() => {
      this.spinner.hide('spinner1')
    }, 400);
    this.getState.subscribe((state) => {
      this.reloadTable = state.reloadTable
      if (this.reloadTable === true) {
        this.reLoadData()
      }
    })
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
        this.ModulReturPembelianService.listDatatables(dataTablesParameters)
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
          data: 'tgl_faktur_unix',
          render(data: any, type: any, row: any, full: any) {
            return moment(new Date(data)).format('DD-MM-YYYY')
          }
        },
        {
          data: 'nomor_faktur'
        },
        {
          data: 'nama_supplier'
        },
        {
          data: 'nama_lengkap'
        },
        {
          data: 'pembayaran'
        },
        {
          data: 'total_harga',
          render(data: any, type: any, row: any, full: any) {
						return self.money.formatRupiah(parseInt(data.replace(".",",")))
					}
        },
        {
          orderable: false,
          searchable: false,
          render(data: any, type: any, row: any, full: any) {
            return `<button class="btn btn-link circle-primary text-ui-primary detail"><i class="far fa-eye"></i></button>`
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
  detail(data: any) {
    this.router.navigate(['faktur/faktur-pembelian/detail', data.id_pembelian])
  }
  nonAktif(data: any) {
    Swal.fire({
      title: 'Apakah anda yakin akan menghapus data ini ?',
      icon: 'warning',
      showCancelButton: true,
      allowOutsideClick: false,
      confirmButtonText: 'Ya, hapus saja!',
      cancelButtonText: 'Tidak, Batalkan'
    }).then((result) => {
      if (result.value) {
        this.spinner.show('spinner1')
        this.store.dispatch(
          FakturPembelianAction.deleteInitial({ payload: { id: data.id_pembelian } })
        )
        setTimeout(() => {
          this.spinner.hide('spinner1')
        }, 400);
        this.showDataTables()
      }
    })
  }

  ngOnDestroy(): void {
    document.body.classList.remove('jw-modal-open');
  }

  btnOpenModal() {
    this.modalService.open("modalFormContent");
  }
}
