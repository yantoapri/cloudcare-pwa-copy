import { Component, OnInit,ViewChild } from '@angular/core';
import { ModalService } from 'src/app/shared/_modal';
import { DataTableDirective } from 'angular-datatables'
import { Observable } from 'rxjs';
import { ModulStokService } from 'src/app/private/modul-api/modul-gudang-transaksi/modul-stok.service';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromApp from 'src/app/private/states/private-app.states'
import { stokPayload } from 'src/app/private/models/class-payload-api/gudang-transaksi/stok-payload'
import * as moment from 'moment';
import { NgxSpinnerService } from "ngx-spinner";
import {MoneyService} from 'src/app/private/services/money/index'
@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.sass']
})
export class ViewComponent implements OnInit {
  @ViewChild(DataTableDirective, { static: false }) datatableElement: any = DataTableDirective
  dtOptions: DataTables.Settings = {};
  reloadTable: boolean
  getState: Observable<any>;
  dataObat: stokPayload = new stokPayload

  constructor(
    private modalService: ModalService,
    private ModulStokService: ModulStokService,
    private router: Router,
    private money:MoneyService,
    private spinner : NgxSpinnerService,
    private store: Store<fromApp.PrivateAppState>,
  ) {
    this.getState = this.store.select('stok_obat')
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
    // this.btnAdd,this.btnDelete,this.btnEdit=item.findIndex((val)=>val.kode=='IVKLAK2')!=-1?true:false
    this.btnDetail=item.findIndex((val)=>val.kode=='IVISOB2')!=-1?true:false
    this.view=item.findIndex((val)=>val.kode=='IVISOB1')!=-1?true:false

    if(!this.view){
        Swal.fire("Warning","Anda tidak mempunyai akses halaman ini",'warning').then(()=>{
          window.location.href='/'
        })
    }
    this.dtOptions = this.showDataTables(this.btnDetail)
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

  detail(data: any) {
    this.router.navigate(['stok-obat/detail/' + data.id_obat+'/'+encodeURIComponent(data.nama_obat)])
  }

  reLoadData() {
    this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.ajax.reload();
    });
  }

  showDataTables(det) {
    let self=this
    return {
      pageLength: 10,
      serverSide: true,
      processing: true,
      order: [],
      ajax: (dataTablesParameters: any, callback: any) => {
        this.ModulStokService.listDatatables(dataTablesParameters)
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
          data: 'nama_obat'
        },
        {
          data: 'stok'
        },
        {
          data: 'ed_terdekat_unix',
          render(data: any, type: any, row: any, full: any) {
            return data!=null?moment(new Date(data)).format('DD-MM-YYYY'):"Expired"
          }
        },
        {
          data: 'harga_jual',
          render(data: any, type: any, row: any, full: any) {
            return self.money.formatRupiah(data)
        }
        },
        {
          data: 'harga_jual', //STATUS HALAL
          render(data: any, type: any, row: any, full: any) {
            let bg=row.no_sertifikat!=undefined&&row.no_sertifikat!=""?"bg-info":"bg-danger"
            return `<span class="badge ${bg}"><i class="fas fa-info-circle mr-2"></i>Belum Tersertifikasi</span>`
          }
        },
        {
          orderable: false,
          searchable: false,
          render(data: any, type: any, row: any, full: any) {
						return det?`<button class="btn btn-link circle-primary text-ui-primary detail"><i class="far fa-eye"></i></button>`:'';
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

  ngOnDestroy(): void {
    document.body.classList.remove('jw-modal-open');
  }

  btnOpenModal() {
    this.modalService.open("modalFormContent");
  }

  modalClose() {
    this.modalService.close("modalFormContent")

  }

}
