import { Component, OnInit, OnDestroy,ViewChild } from '@angular/core';
import { ModalService } from 'src/app/shared/_modal';
import { DataTableDirective } from 'angular-datatables'
import { Observable } from 'rxjs';
import { ModulObatService } from 'src/app/private/modul-api/modul-master-node/modul-obat.service';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { NgxSpinnerService } from "ngx-spinner";
import * as fromApp from 'src/app/private/states/private-app.states'
import * as DataObatActions from 'src/app/private/states/master-data/data-obat/data-obat.actions'
import { DataObatPayload } from 'src/app/private/models/class-payload-api/master-data/data-obat-payload';
import * as moment from 'moment';
@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.sass']
})
export class ViewComponent implements OnInit, OnDestroy {

  @ViewChild(DataTableDirective, {static: false}) datatableElement : any = DataTableDirective
  dtOptions: DataTables.Settings = {};
  reloadTable : boolean
  getState: Observable<any>;
  dataObat : DataObatPayload = new DataObatPayload

  constructor(
    private modalService : ModalService,
    private modulObatService : ModulObatService,
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
  btnDelete=false
  view=false
  ngOnInit(): void {
    let item=JSON.parse(localStorage.getItem('currentUser'))
    item=item.menu_right
    this.btnAdd=item.findIndex((val)=>val.kode=='IVKLOB5')!=-1?true:false
    this.btnBpom=item.findIndex((val)=>val.kode=='IVKLOB3')!=-1?true:false
    // this.btnEdit=item.findIndex((val)=>val.kode=='AMATTD2')!=-1?true:false
    this.btnCsv=item.findIndex((val)=>val.kode=='IVKLOB2')!=-1?true:false
    this.view=item.findIndex((val)=>val.kode=='IVKLOB1')!=-1?true:false
    this.btnDelete=item.findIndex((val)=>val.kode=='IVKLOB4')!=-1?true:false
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
      order : [],
      ajax : (dataTablesParameters: any, callback: any) => {
        this.modulObatService.listDatatables(dataTablesParameters)
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
          data: 'nama_obat'
        },
        {
          data: 'nama_obat',
          render(data: any, type: any, row: any, full: any) {
            let kemasan=""
            row.obat_kemasan=row.obat_kemasan.sort((a,b)=>b.kemasan_level-a.kemasan_level)
            row.obat_kemasan.map((val,index)=>{
              if(index==0){
                kemasan+=val.nama_kemasan+", "
              }else{
                kemasan+=" "+val.target_qty+" "+val.nama_kemasan+" @"
              }
            })
            kemasan=kemasan.substring(0,kemasan.length-1)
            return kemasan
          }
        },
        {
          data: 'nama_obat',
          render(data: any, type: any, row: any, full: any) {
            // return moment(new Date).format("DD/MM/YYYY")
            return ""
          }
        },
        {
          data: 'nama_obat',
          render(data: any, type: any, row: any, full: any) {
            return "-"
          }
        },
        {
          data: 'nama_obat',
          render(data: any, type: any, row: any, full: any) {
            let bg=row.no_sertifikat!=undefined&&row.no_sertifikat!=""?"bg-info":"bg-danger"
            return `<span class="badge ${bg}"><i class="fas fa-info-circle mr-2"></i>Belum Tersertifikasi</span>`
          }
        },
        {
          orderable: false,
          searchable: false,
          render(data: any, type: any, row: any, full: any) {
            let res=''
            res+=edit?`
            <button class="btn btn-link circle-primary text-ui-primary update-data mb-1">
                <i class="far fa-edit"></i>
            </button>
            `:''
            res+=edit?`
            <button class="btn btn-link circle-danger text-ui-danger nonaktif-data mb-1">
                <i class="far fa-trash-alt"></i>
            </button>`:'';
            return res
          }
        }
      ],
      rowCallback: (row: Node, data: any[] | Object, index: number) => {
        const self = this;
        // Unbind first in order to avoid any duplicate handler
        // (see https://github.com/l-lin/angular-datatables/issues/87)
        // Note: In newer jQuery v3 versions, `unbind` and `bind` are
        // deprecated in favor of `off` and `on`
        $('td .update-data', row).on('click', () => {
          self.editData(data);
        });
        $('td .nonaktif-data', row).on('click', () => {
          self.nonAktif(data);
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
