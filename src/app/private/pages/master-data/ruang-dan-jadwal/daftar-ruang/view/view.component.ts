import { Component, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables'
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import Swal from 'sweetalert2/dist/sweetalert2.js'
import { DaftarRuangService } from 'src/app/private/services/master-data/ruang-dan-jadwal/daftar-ruang.service';
import { Router }  from '@angular/router'
import { Store } from '@ngrx/store';
import { NgxSpinnerService } from "ngx-spinner";
import * as fromApp from 'src/app/private/states/private-app.states'
import * as DaftarRuangActions from 'src/app/private/states/master-data/ruang-dan-jadwal/daftar-ruang/daftar-ruang.actions'
@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.sass']
})
export class ViewComponent implements OnInit {

  @ViewChild(DataTableDirective, {static: false}) datatableElement : any = DataTableDirective
  dtOptions: DataTables.Settings = {};
  reloadTable : boolean
  getState: Observable<any>;
  btnDetail=false
  btnDelete=false
  btnEdit=false
  btnSetting=false
  btnAdd=false
  view=false
  constructor(
    private daftarRuangService : DaftarRuangService,
    private router: Router,
    private store : Store<fromApp.PrivateAppState>,
    private spinner : NgxSpinnerService,
  ) {
    this.getState = this.store.select('masterData_ruangDanJadwal_daftarRuang')
   }
  // masterData_ruangDanJadwal_daftarRuang
  ngOnInit(): void {
    


    let item=JSON.parse(localStorage.getItem('currentUser'))
    item=item.menu_right
    this.btnAdd=this.btnDelete=this.btnEdit=item.findIndex((val)=>val.kode=='MGRJDR2')!=-1?true:false
    this.btnDetail=this.view=item.findIndex((val)=>val.kode=='MGRJDR1')!=-1?true:false

    if(!this.view){
        Swal.fire("Warning","Anda tidak mempunyai akses halaman ini",'warning').then(()=>{
          window.location.href='/'
        })
    }
    this.dtOptions = this.showDataTables(this.btnEdit)

    this.getState.subscribe((state) => {
      this.reloadTable = state.reloadTable
      if(this.reloadTable === true) {
        this.reLoadData()
      }
    })

  }
  editData(data : any) {
    this.router.navigate(['master-data', 'ruang-dan-jadwal', 'daftar-ruang', 'edit', data.id_ruang])
  }
  clickBtnAdd() {
    this.router.navigate(['master-data', 'ruang-dan-jadwal', 'daftar-ruang', 'add'])
  }
  nonAktif(data : any) {
    Swal.fire({
      title: 'Apakah anda yakin akan menghapus data ini ?',
      icon: 'warning',
      showCancelButton: true,
      allowOutsideClick: false,
      confirmButtonText: 'Ya, hapus saja!',
      cancelButtonText: 'Tidak, Batalkan'
    }).then((result) => {
      if(result.value) {
        this.spinner.show('spinner1')
        this.store.dispatch( DaftarRuangActions.deleteInitial({ payload : { id : data.id_ruang } }) )
        setTimeout(() => {
          this.spinner.show('spinner1')
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
        this.daftarRuangService.getDataTables(dataTablesParameters)
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
        },{
          data: 'nama_ruang'
        },{
          orderable: false,
          searchable: false,
          render(data: any, type: any, row: any, full: any) {
            return edit?`<button class="btn btn-link circle-primary text-ui-primary update-data"><i class="far fa-edit"></i></button>
                    <button class="btn btn-link circle-danger text-ui-danger nonaktif-data"><i class="far fa-trash-alt"></i></button>`:'';
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

}
