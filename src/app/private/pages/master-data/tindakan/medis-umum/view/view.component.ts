import { Component, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables'
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import Swal from 'sweetalert2/dist/sweetalert2.js'
import { ModalService } from 'src/app/shared/_modal';
import { Store } from '@ngrx/store';
import * as fromApp from 'src/app/private/states/private-app.states'
import * as TindakanMedisUmumActions from 'src/app/private/states/master-data/tindakan/tindakan-medis-umum/tindakan-medis-umum.actions'
import { Observable } from 'rxjs';
import { TindakanMedisUmumService } from 'src/app/private/services/master-data/tindakan/tindakan-medis-umum.service';
import { TindakanMedisUmumPayload } from 'src/app/private/models/class-payload-api/master-data/tindakan/tindakan-medis-umum-payload';
import { CurrencyMaskInputMode } from 'ngx-currency';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.sass']
})
export class ViewComponent implements OnInit {

  @ViewChild(DataTableDirective, {static: false}) datatableElement : any = DataTableDirective
  dtOptions: DataTables.Settings = {};
  public formTambah: FormGroup;
  titleModal : string
  aksiModal : string
  isEdit : boolean
  isLoadingButton: boolean
  reloadTable : boolean
  errorMessage : any | null
  submitButton : boolean
  submitted : boolean
  getState: Observable<any>
  tindakanMedisUmum : TindakanMedisUmumPayload = new TindakanMedisUmumPayload
  optionsCur = {
    prefix: '',
    align: 'left',
    thousands: '.',
    precision: '0',
    inputMode: CurrencyMaskInputMode.NATURAL,
  };
  btnDetail=false
  btnDelete=false
  btnEdit=false
  btnSetting=false
  btnAdd=false
  view=false
  constructor(
    private modalService : ModalService,
    private fb : FormBuilder,
    private store : Store<fromApp.PrivateAppState>,
    private tindakanMedisUmumService : TindakanMedisUmumService,
    private spinner : NgxSpinnerService,

  ) {
    this.getState = this.store.select('masterData_tindakan_tindakanMedisUmum')
  }
  // masterData_tindakan_tindakanMedisUmum
  ngOnInit(): void {
    


    let item=JSON.parse(localStorage.getItem('currentUser'))
    item=item.menu_right
    this.btnAdd=this.btnDelete=this.btnEdit=item.findIndex((val)=>val.kode=='MDMTMU2')!=-1?true:false
    this.btnDetail=this.view=item.findIndex((val)=>val.kode=='MDMTMU1')!=-1?true:false

    if(!this.view){
        Swal.fire("Warning","Anda tidak mempunyai akses halaman ini",'warning').then(()=>{
          window.location.href='/'
        })
    }
    this.dtOptions = this.showDataTables(this.btnEdit)
    this.formTambah = this.fb.group({
      nama_tindakan : ["", [Validators.required]],
      biaya_tindakan : ["", [Validators.required]]
    })
    this.getState.subscribe((state) => {
      this.tindakanMedisUmum = state.tindakanMedisUmum
      this.isLoadingButton = state.isLoadingButton
      this.errorMessage = state.errorMessage
      this.reloadTable = state.reloadTable
      this.submitButton = state.submitButton
      this.isEdit = state.isEdit
      if (this.isEdit === true) {
        this.formTambah.patchValue({
          nama_tindakan : this.tindakanMedisUmum.nama_tindakan,
          biaya_tindakan : this.tindakanMedisUmum.biaya_tindakan
        })
        this.spinner.hide('spinner1')
        this.modalService.open("modalFormContent");
      }
      if(this.reloadTable) {
        this.reLoadData()
        this.modalService.close("modalFormContent")
      }
    })
  }
  FormModalOpen() {
    this.submitted = false
    this.modalService.open("modalFormContent");
    this.titleModal= "Form Tambah Tindakan Medis Umum"
    this.aksiModal = 'add'
    this.formTambah.reset()
    this.store.dispatch( TindakanMedisUmumActions.clearData() )
  }
  modalClose() {
    this.modalService.close("modalFormContent");
  }
  SubmitForm() {
    this.submitted = true
    if (this.formTambah.invalid) {
      return
    }
    this.spinner.show('spinner1')
    let payload = new TindakanMedisUmumPayload
    payload.id_klinik = this.tindakanMedisUmum.id_klinik
    payload.id_tindakan_medis = this.tindakanMedisUmum.id_tindakan_medis
    payload.nama_tindakan = this.formTambah.value.nama_tindakan
    payload.biaya_tindakan = this.formTambah.value.biaya_tindakan

    if(this.aksiModal == 'add') {
      this.store.dispatch( TindakanMedisUmumActions.addInitial({ payload : payload }) )
    } else {
      this.store.dispatch( TindakanMedisUmumActions.updateInitial({ payload : payload }) )
    }
    setTimeout(() => {
      this.spinner.hide('spinner1')
    }, 400);
  }
  editData(data : any) {
    this.submitted = false
    this.aksiModal = 'update'
    this.titleModal= "Form Edit Tindakan Medis Umum"
    this.spinner.show('spinner1')
    this.store.dispatch( TindakanMedisUmumActions.getByIdInitial({ payload: { id : data.id_tindakan_medis }}) )
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
          TindakanMedisUmumActions.deleteInitial({ payload: { id : data.id_tindakan_medis } })
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
        this.tindakanMedisUmumService.getDataTables(dataTablesParameters)
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
          data : 'nama_tindakan'
        },{
          data : 'biaya_tindakan',
          render(data: any, type: any, row: any, full: any) {
            return 'Rp ' + Number(data).toLocaleString('id')
          }
        }, {
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
