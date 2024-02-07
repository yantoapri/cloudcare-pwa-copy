import { Component, OnInit, OnDestroy,ViewChild } from '@angular/core';
import { ModalService } from 'src/app/shared/_modal';
import { DataTableDirective } from 'angular-datatables'
import { Observable } from 'rxjs';
import { ModulLogService } from 'src/app/private/modul-api/modul-gudang-transaksi/modul-log.service';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { NgxSpinnerService } from "ngx-spinner";
import * as fromApp from 'src/app/private/states/private-app.states'
import * as DataObatActions from 'src/app/private/states/master-data/data-obat/data-obat.actions'
import { DataObatPayload } from 'src/app/private/models/class-payload-api/master-data/data-obat-payload';
@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.sass']
})
export class ViewLogComponent implements OnInit, OnDestroy {

  @ViewChild(DataTableDirective, {static: false}) datatableElement : any = DataTableDirective
  dtOptions: DataTables.Settings = {};
  reloadTable : boolean
  getState: Observable<any>;
  dataObat : DataObatPayload = new DataObatPayload

  constructor(
    private modalService : ModalService,
    private ModulLogService :ModulLogService,
    private router : Router,
    private spinner : NgxSpinnerService,
    private store : Store<fromApp.PrivateAppState>,
  ) {
    this.getState = this.store.select('masterData_dataObat')
  }
  btnCsv=false
  btnBpom=false
  btnEdit=false
  btnSetting=false
  btnAdd=false
  view=false
  ngOnInit(): void {
    let item=JSON.parse(localStorage.getItem('currentUser'))
    item=item.menu_right
    this.btnAdd=item.findIndex((val)=>val.kode=='IVKLOB5')!=-1?true:false
    this.btnBpom=item.findIndex((val)=>val.kode=='IVKLOB3')!=-1?true:false
    // this.btnEdit=item.findIndex((val)=>val.kode=='AMATTD2')!=-1?true:false
    this.btnCsv=item.findIndex((val)=>val.kode=='IVKLOB2')!=-1?true:false
    this.view=item.findIndex((val)=>val.kode=='IVKLOB1')!=-1?true:false
    if(!this.view){
        Swal.fire("Warning","Anda tidak mempunyai akses halaman ini",'warning').then(()=>{
          window.location.href='/'
        })
    }
    this.btnEdit=this.btnAdd||this.btnBpom||this.btnCsv
    this.dtOptions = this.showDataTables(this.btnEdit)
    this.getState.subscribe((state) => {
      this.reloadTable = state.reloadTable
      if(this.reloadTable === true) {
        this.reLoadData()
      }
    })
  }

  editData(data: any) {
    this.router.navigate(['katalog-obat','katalog','edit-buat-baru', data.id_obat])
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
          DataObatActions.deleteInitial({ payload: { id : data.id_obat } })
        )
        setTimeout(() => {
          this.spinner.hide('spinner1')
        }, 400);
      }
    })
  }

  reLoadData() {
    this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.ajax.reload();
    });
  }

  showDataTables(edit) {
    this.spinner.show('spinner1')
    return {
      pageLength: 10,
      serverSide: true,
      processing: true,
      scrollX:        true,
      scrollCollapse: true,
      fixedColumns:   {
        left: 4,
      },
      order : [],
      ajax : (dataTablesParameters: any, callback: any) => {
        this.ModulLogService.getObat(dataTablesParameters)
        .subscribe((resp : any) => {
          callback({
            draw: resp.response.draw,
            recordsTotal: resp.response.recordsTotal,
            recordsFiltered: resp.response.recordsFiltered,
            data: resp.response.data
          })
          this.spinner.hide('spinner1')
        })
      },
      columns : [
        {
          orderable: false,
          searchable: false,
          render(data: any, type: any, row: any, full: any) {
            return full.row + 1 + full.settings._iDisplayStart;
          }
        },
        {
          data: 'kode_invoice'
        },
        {
          data: 'kode_invoice_des'
        },
        {
          data:'kode_invoice_referensi'
        },
        {
          data:'created_at'
        },
        {
          data:'created_at_unix'
        },
        {
          data:'harga_beli'
        },
        {
          data:'harga_jual'
        },
        {
          data:'id_akun_create'
        },
        {
          data:'id_akun_update'
        },
        {
          data:'id_barang'
        },
        {
          data:'id_klinik'
        },
        {
          data:'id_log_transaksi_obat'
        },
        {
          data:'id_transaksi_referensi'
        },
        {
          data:'id_transaksi_referensi_parent'
        },
        {
          data:'kegiatan'
        },
        {
          data:'keterangan'
        },
        {
          data:'kode_invoice_referensi_tujuan'
        },
        {
          data:'nama_barang'
        },
        {
          data:'nama_lengkap_admin'
        },
        {
          data:'no_batch'
        },
        {
          data:'no_urut_tujuan'
        },
        {
          data:'stok_akhir'
        },
        {
          data:'stok_awal'
        },
        {
          data:'stok_keluar'
        },
        {
          data:'stok_masuk'
        },
        {
          data:'tanggal_ed'
        },
        {
          data:'tanggal_ed_unix'
        },
        {
          data:'tanggal_invoice'
        },
        {
          data:'tanggal_invoice_unix'
        },
        {
          data:'transaksi_jenis'
        },
        {
          data:'transaksi_kategori'
        },
        {
          data:'transaksi_status'
        },
        {
          data:'uang_keluar'
        },
        {
          data:'uang_masuk'
        },
        {
          data:'updated_at'
        },
        {
          data:'updated_at_unix'
        }
      ],
     
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
