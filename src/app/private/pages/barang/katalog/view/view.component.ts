import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ModalService } from 'src/app/shared/_modal';
import { DataTableDirective } from 'angular-datatables'
import { Observable } from 'rxjs';
import { ModulAlatKesehatanService } from 'src/app/private/modul-api/modul-master-node/modul-alat-kesehatan.service';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { NgxSpinnerService } from "ngx-spinner";

import * as fromApp from 'src/app/private/states/private-app.states'
import * as AlatKesehtanAction from 'src/app/private/states/alat-kesehatan/alat-kesehatan.action'
import { AlatKesehatanPayload } from 'src/app/private/models/class-payload-api/alat-kesehatan/alat-kesehatan-payload';
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
  dataObat: AlatKesehatanPayload = new AlatKesehatanPayload

  constructor(
    private modalService: ModalService,
    private ModulAlatKesehatanService: ModulAlatKesehatanService,
    private router: Router,
    private spinner : NgxSpinnerService,
    private store: Store<fromApp.PrivateAppState>,
  ) {
    this.getState = this.store.select('alat_kesehatan')
  }
    btnDetail=false
    btnDelete=false
    btnEdit=false
    btnSetting=false
    btnAdd=false
    btnImport=false
    view=false
  ngOnInit(): void {
    this.spinner.show('spinner1')
    let item=JSON.parse(localStorage.getItem('currentUser'))
    item=item.menu_right
    this.btnAdd=item.findIndex((val)=>val.kode=='IVKLAK2')!=-1?true:false
    this.btnEdit=item.findIndex((val)=>val.kode=='IVKLAK3')!=-1?true:false
    this.btnDelete=item.findIndex((val)=>val.kode=='IVKLAK4')!=-1?true:false
    this.btnImport=item.findIndex((val)=>val.kode=='IVKLAK5')!=-1?true:false
    this.btnDetail=this.view=item.findIndex((val)=>val.kode=='IVKLAK1')!=-1?true:false

    if(!this.view){
        Swal.fire("Warning","Anda tidak mempunyai akses halaman ini",'warning').then(()=>{
          window.location.href='/'
        })
      }
    this.dtOptions = this.showDataTables(this.btnEdit,this.btnDelete)
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

  editData(data: any) {
    this.router.navigate(['barang/katalog/edit-buat-baru/' + data.id_alat_kesehatan])
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
          AlatKesehtanAction.deleteInitial({ payload: { id: data.id_alat_kesehatan } })
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

  showDataTables(edit,del) {
    
    return {
      pageLength: 10,
      serverSide: true,
      processing: true,
      order: [],
      ajax: (dataTablesParameters: any, callback: any) => {
        this.ModulAlatKesehatanService.listDatatables(dataTablesParameters)
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
          data: 'nama_alat_kesehatan'
        },
        {
          data: 'nama_alat_kesehatan',
          render(data: any, type: any, row: any, full: any) {
            let kemasan=""
            row.alat_kesehatan_kemasan=row.alat_kesehatan_kemasan.sort((a,b)=>b.kemasan_level-a.kemasan_level)
            row.alat_kesehatan_kemasan.map((val,index)=>{
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
          orderable: false,
          searchable: false,
          render(data: any, type: any, row: any, full: any) {
            let res=''
            res+=edit?` <button  class="btn btn-link circle-primary text-ui-primary update-data mb-1"><i class="far fa-edit"></i></button>`:''
            res+=del?` <button  class="btn btn-link circle-danger text-ui-danger nonaktif-data mb-1"><i class="far fa-trash-alt"></i></button>`:'';
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
