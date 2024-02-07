import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DataTableDirective } from 'angular-datatables'
import { Observable } from 'rxjs'
import { DataPasienService } from 'src/app/private/services/pasien/data-pasien.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromApp from 'src/app/private/states/private-app.states'
import Swal from 'sweetalert2/dist/sweetalert2.js'
import * as PasienActions from 'src/app/private/states/pasien/data-pasien/pasien.actions'
import { NgxSpinnerService } from "ngx-spinner";
import { AESService } from 'src/app/private/services/AES/aes'
@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.sass']
})
export class ViewComponent implements OnInit {

  @ViewChild(DataTableDirective, {static: false}) datatableElement : any = DataTableDirective
  @ViewChild('input_no_rm') input_no_rm: ElementRef
  @ViewChild('input_nama') input_nama: ElementRef
  @ViewChild('input_alamat') input_alamat: ElementRef
  @ViewChild('input_no_hp') input_no_hp: ElementRef

  dtOptions: DataTables.Settings = {};
  getState: Observable<any>;
  isLoadingButton: boolean
  nama=""
  no_rm=""
  errorMessage : any | null
  submitButton : boolean
  reloadTable : boolean
  btnDetail=false
  btnDelete=false
  btnEdit=false
  btnSetting=false
  btnAdd=false
  view=false
  constructor(
    private dataPasienService : DataPasienService,
    private router : Router,
    // private auth:AuthService,
    private aes:AESService,
    private store : Store<fromApp.PrivateAppState>,
    private spinner : NgxSpinnerService,
  ) {
    this.getState = this.store.select('pasien_dataPasien')
  }
  keyGen:any
  ngOnInit(): void {
    
    let item:any=localStorage.getItem('currentUser')?JSON.parse(localStorage.getItem('currentUser')):null
    this.keyGen=item?this.aes.getKeyLogin(item):''
    item=item.menu_right
    this.btnAdd=this.btnDelete=this.btnEdit=item.findIndex((val)=>val.kode=='AMPDPS2')!=-1?true:false
    this.btnDetail=this.view=item.findIndex((val)=>val.kode=='AMPDPS1')!=-1?true:false

    if(!this.view){
        Swal.fire("Warning","Anda tidak mempunyai akses halaman ini",'warning').then(()=>{
          window.location.href='/'
        })
      }
    this.dtOptions = this.showDataTables(this.btnEdit)
    this.getState.subscribe((state) => {
      this.errorMessage = state.errorMessage
      this.isLoadingButton = state.isLoadingButton
      this.reloadTable = state.reloadTable
      if(this.reloadTable) {
        this.reLoadData()
      }
    })
  }

  detailData (data: any) {

  }
  editData (data : any) {
    this.router.navigate(['pasien', 'data-pasien', 'edit', data.id_pasien])
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
        this.store.dispatch(
          PasienActions.deleteInitial({ payload : { id : data.id_pasien } })
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
  reset(){
    this.no_rm=""
    this.nama=""
    // this.input_no_hp.nativeElement.value=""
    this.reLoadData()
  }
  showDataTables(edit) {
    let self=this
    this.spinner.show('spinner1')
    return {
      pageLength: 10,
      serverSide: true,
      processing: true,
      order : [],
      ajax : (dataTablesParameters: any, callback: any) => {
        // let noHp=this.input_no_hp.nativeElement.value
        Object.assign(dataTablesParameters, {
          no_rm : this.no_rm,
          nama : this.nama,
          alamat : "",//this.input_alamat.nativeElement.value,
          noHp:""
          // no_hp : noHp.toString()!=''&&noHp.toString().substr(0,1)=='0'?noHp.toString().substr(1,noHp.toString().length):noHp
        })
        this.dataPasienService.getDataTables(dataTablesParameters)
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
      columns: [
        {
          orderable: false,
          searchable: false,
          render(data: any, type: any, row: any, full: any) {
            return full.row + 1 + full.settings._iDisplayStart;
          }
        },{
          data : 'full_rm'
        },{
          data : 'no_bpjs',
          render(data: any, type: any, row: any, full: any) {
            return data==null?'-':data
          }
        },{
          data : 'nama'
        },{
          data : 'alamat',
          render(data: any, type: any, row: any, full: any) {
            try{
            return self.aes.decrypt(data,self.keyGen.key,self.keyGen.iv,256)
            }
            catch (error) {
              return data
            }
          }
        },{
          orderable: false,
          searchable: false,
          render(data: any, type: any, row: any, full: any) {
            return edit?`<div style="white-space: nowrap;">
                      <button class="btn btn-link circle-primary text-ui-primary update-data "><i class="far fa-edit"></i></button>
                      <button class="btn btn-link circle-danger text-ui-danger nonaktif-data"><i class="far fa-trash-alt"></i></button>
                    <div>`:'';
          }
        }
      ],
      rowCallback: (row: Node, data: any[] | Object, index: number) => {
        const self = this;
        // Unbind first in order to avoid any duplicate handler
        // (see https://github.com/l-lin/angular-datatables/issues/87)
        // Note: In newer jQuery v3 versions, `unbind` and `bind` are
        // deprecated in favor of `off` and `on`
        $('td .detail-data', row).on('click', () => {
          self.detailData(data);
        });
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
