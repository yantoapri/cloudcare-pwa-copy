import { JadwalSesiPayload } from 'src/app/private/models/class-payload-api/master-data/ruang-dan-jadwal/jadwal-sesi-payload';
import { Component, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables'
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import Swal from 'sweetalert2/dist/sweetalert2.js'
import { JadwalSesiService } from 'src/app/private/services/master-data/ruang-dan-jadwal/jadwal-sesi.service';
import { ModalService } from 'src/app/shared/_modal';
import { GeneralService } from 'src/app/private/services/general.service'
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromApp from 'src/app/private/states/private-app.states'
import * as JadwalSesiActions from 'src/app/private/states/master-data/ruang-dan-jadwal/jadwal-sesi/jadwal-sesi.actions'
import * as  moment  from 'moment';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.sass']
})
export class ViewComponent implements OnInit {

  @ViewChild(DataTableDirective, {static: false}) datatableElement : any = DataTableDirective
  dtOptions: DataTables.Settings = {};
  formTambah: FormGroup;
  titleModal : string
  aksiModal : string
  isEdit : boolean
  isLoadingButton: boolean
  reloadTable : boolean
  errorMessage : any | null
  submitButton : boolean
  submitted : boolean
  defaultJamMulai : string = "05:00"
  listWaktuBuka : Array<any> = this.generalService.list24Hours(30, this.defaultJamMulai)
  listWaktuTutup : Array<any> = this.generalService.list24Hours(30, this.defaultJamMulai)
  waktuBuka : Date = new Date()
  waktuTutup : Date = new Date()
  getState: Observable<any>
  jadwalSesi : JadwalSesiPayload = new JadwalSesiPayload
  btnDetail=false
      btnDelete=false
      btnEdit=false
      btnSetting=false
      btnAdd=false
      view=false
  constructor(
    private jadwalSesiService : JadwalSesiService,
    private modalService : ModalService,
    private fb : FormBuilder,
    private generalService : GeneralService,
    private store : Store<fromApp.PrivateAppState>,
    private spinner : NgxSpinnerService,

  ) {
    this.getState = this.store.select('masterData_ruangDanJadwal_jadwalSesi')
  }
  // masterData_ruangDanJadwal_jadwalSesi
  ngOnInit(): void {
    let item=JSON.parse(localStorage.getItem('currentUser'))
    item=item.menu_right
    this.btnAdd=this.btnDelete=this.btnEdit=item.findIndex((val)=>val.kode=='MGRJJS2')!=-1?true:false
    this.btnDetail=this.view=item.findIndex((val)=>val.kode=='MGRJJS1')!=-1?true:false

    if(!this.view){
        Swal.fire("Warning","Anda tidak mempunyai akses halaman ini",'warning').then(()=>{
          window.location.href='/'
        })
      }
    this.dtOptions = this.showDataTables(this.btnEdit)
    this.formTambah = this.fb.group({
      nama_sesi : ["", [Validators.required]],
      jam_buka: [ new Date(), [] ],
      jam_tutup: [ new Date(), [] ]
    })

    this.getState.subscribe((state) => {
      this.jadwalSesi = state.jadwalSesi
      this.isLoadingButton = state.isLoadingButton
      this.errorMessage = state.errorMessage
      this.reloadTable = state.reloadTable
      this.submitButton = state.submitButton
      this.isEdit = state.isEdit
      if (this.isEdit === true) {

        this.formTambah.patchValue({
          nama_sesi : this.jadwalSesi.nama_sesi,
          jam_buka : this.parseTime(this.jadwalSesi.jam_buka),
          jam_tutup : this.parseTime(this.jadwalSesi.jam_tutup)
        })
        this.spinner.hide('spinner1')
        this.modalService.open("modalFormContent");
      }
      if(this.reloadTable == true) {
        this.reLoadData()
        this.modalService.close("modalFormContent");
      }
    })
  }

  parseTime( t : any ) {
    var d = new Date();
    var time = t.match( /(\d+)(?::(\d\d))?\s*(p?)/ );
    d.setHours( parseInt( time[1]) + (time[3] ? 12 : 0) );
    d.setMinutes( parseInt( time[2]) || 0 );
    return d;
  }


  SubmitForm() {
    this.submitted = true

    if (this.formTambah.invalid) {
      return
    }
    this.spinner.show('spinner1')
    let payload = new JadwalSesiPayload
    payload.id_klinik = this.jadwalSesi.id_klinik
    payload.id_jadwal_sesi = this.jadwalSesi.id_jadwal_sesi
    payload.nama_sesi = this.formTambah.value.nama_sesi
    payload.jam_buka = moment(this.formTambah.value.jam_buka).format("HH:mm:ss")
    payload.jam_tutup = moment(this.formTambah.value.jam_tutup).format("HH:mm:ss")

    if(this.aksiModal === 'add') {
      this.store.dispatch( JadwalSesiActions.addInitial({ payload : payload }) )
    } else {
      this.store.dispatch( JadwalSesiActions.updateInitial({ payload : payload }) )
    }
    setTimeout(() => {
      this.spinner.hide('spinner1')
    }, 400);
  }

  FormModalOpen() {
    this.submitted = false
    this.modalService.open("modalFormContent");
    this.titleModal= "Form Tambah Jadwal Sesi"
    this.aksiModal = 'add'
    this.formTambah.patchValue({
      nama_sesi : "",
      jam_buka : new Date,
      jam_tutup : new Date
    })
    this.store.dispatch( JadwalSesiActions.clearData() )
  }

  editData(data : any) {
    this.submitted = false
    this.aksiModal = 'update'
    this.titleModal= "Form Edit Jadwal Sesi"
    this.spinner.show('spinner1')
    this.store.dispatch( JadwalSesiActions.getByIdInitial({ payload : { id : data.id_jadwal_sesi } }) )
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
      if (result.value) {
        this.spinner.show('spinner1')
        this.store.dispatch(
          JadwalSesiActions.deleteInitial({ payload: { id : data.id_jadwal_sesi } })
        )
        setTimeout(() => {
          this.spinner.show('spinner1')
        }, 400);
      }
    })
  }

  modalClose() {
    this.modalService.close("modalFormContent")

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
        this.jadwalSesiService.getDataTables(dataTablesParameters)
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
          data : 'nama_sesi'
        },{
          data : 'jam_buka',
          render(data: any, type: any, row: any, full: any) {


            // console.log(data.slice(0, 5))
            return data.slice(0, 5)
            // return moment(this.parseTime(data)).format('hh:mm')
          }
        },{
          data: 'jam_tutup',
          render(data: any, type: any, row: any, full: any) {
            return data.slice(0, 5)
            // console.log(this.parseTime(data))
            // return moment(this.parseTime(data)).format('hh:mm')
          }
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
