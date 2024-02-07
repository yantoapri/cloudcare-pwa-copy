import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from "@angular/forms";
import { ModalService } from 'src/app/shared/_modal';
import { MetodeBayarPayload } from 'src/app/private/models/class-payload-api/master-data/metode-bayar-payload';
import { Observable } from 'rxjs'
import { Store } from '@ngrx/store';
import * as fromApp from 'src/app/private/states/private-app.states'
import * as MetodeBayarActions from 'src/app/private/states/master-data/metode-bayar/metode-bayar.actions'
import { ModulMetodeBayarService } from 'src/app/private/modul-api/modul-master-node/modul-metode-bayar.service';
import { DataTableDirective } from 'angular-datatables'
import Swal from 'sweetalert2/dist/sweetalert2.js'
import {ValidateService} from 'src/app/private/services/validate/validateService'
@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.sass']
})
export class ViewComponent implements OnInit {

  titleModal : string
  formInput : FormGroup
  isEdit : boolean
  isLoadingButton : boolean
  reloadTable : boolean
  errorMessage : any | null
  submitButton : boolean
  getState: Observable<any>;
  submitted : boolean = false
  aksiModal : string

  metodeBayar : MetodeBayarPayload = new MetodeBayarPayload
  @ViewChild(DataTableDirective, {static: false}) datatableElement : any = DataTableDirective
  dtOptions: DataTables.Settings = {}
  btnDetail=false
  btnDelete=false
  btnEdit=false
  btnSetting=false
  btnAdd=false
  view=false
  constructor (
    private fb : FormBuilder,
    private modalService : ModalService,
    private store : Store<fromApp.PrivateAppState>,
    private el : ElementRef,
    private validate:ValidateService,
    private modulMetodeBayarService : ModulMetodeBayarService
  ) {
    // masterData_metodeBayar
    this.getState = this.store.select('masterData_metodeBayar')
  }

  ngOnInit(): void {
    let item=JSON.parse(localStorage.getItem('currentUser'))
    item=item.menu_right
    this.btnAdd=this.btnDelete=this.btnEdit=item.findIndex((val)=>val.kode=='MDMBMB2')!=-1?true:false
    this.btnDetail=this.view=item.findIndex((val)=>val.kode=='MDMBMB1')!=-1?true:false

    if(!this.view){
        Swal.fire("Warning","Anda tidak mempunyai akses halaman ini",'warning').then(()=>{
          window.location.href='/'
        })
      }
    this.dtOptions = this.showDataTables(this.btnEdit)
    this.formInput = this.fb.group({
      nama_bank : ["null", [Validators.required]],
      no_rekening : ["", [Validators.required]],
      pemilik_rekening: [""]
    })

    this.getState.subscribe((state) => {
      this.metodeBayar = state.metodeBayar
      this.isLoadingButton = state.isLoadingButton
      this.errorMessage = state.errorMessage
      this.reloadTable = state.reloadTable
      this.submitButton = state.submitButton
      this.isEdit = state.isEdit
      if (this.isEdit === true) {
        this.formInput.patchValue({
          no_rekening : this.metodeBayar.no_rekening,
          nama_bank : this.metodeBayar.nama_bank,
        });
        this.modalService.open("modalFormContent");
      }
      if(this.reloadTable == true) {
        this.reLoadData()
        this.modalService.close("modalFormContent");
      }
    });
  }
  isNumber(e){
    return this.validate.Number(e)
  }
  SubmitForm() {
    this.submitted = false
    setTimeout(() => { this.submitted = true }, 200)
    if (this.formInput.invalid) {
      for (const key of Object.keys(this.formInput.controls)) {
        if (this.formInput.controls[key].invalid) {
          const invalidControl = this.el.nativeElement.querySelector('[formcontrolname="' + key + '"]');
          invalidControl.focus()
          break;
        }
      }
      return
    }

    let payload = new MetodeBayarPayload
    payload.nama_bank = this.formInput.value.nama_bank
    payload.pemilik_rekening=this.formInput.value.pemilik_rekening
    payload.no_rekening = this.formInput.value.no_rekening
    if(this.aksiModal === 'add') {
      payload.id_metode_bayar = ""
      this.store.dispatch( MetodeBayarActions.addInitial({ payload : payload }) )
    } else {
      payload.id_metode_bayar = this.metodeBayar.id_metode_bayar
      this.store.dispatch( MetodeBayarActions.updateInitial({ payload : payload }) )
    }
  }

  btnTambahBaru() {
    this.submitted = false
    this.titleModal = 'Tambah Baru'
    this.aksiModal = 'add'
    this.formInput.reset()
    this.modalService.open("modalFormContent");
    this.store.dispatch( MetodeBayarActions.clearData() )
  }
  modalClose() {
    this.modalService.close("modalFormContent")
  }

  editData(data: any) {
    this.submitted = false
    this.aksiModal = 'update'
    this.titleModal= "Form Edit Metode Bayar"
    this.metodeBayar=data
    this.formInput.patchValue({
      nama_bank:data.nama_bank,
      no_rekening:data.no_rekening,
      pemilik_rekening:data.pemilik_rekening
    })
    this.modalService.open("modalFormContent");
    // this.store.dispatch( MetodeBayarActions.getByIdInitial({ payload : { id : data.id_metode_bayar } }) )
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
        this.store.dispatch(
          MetodeBayarActions.deleteInitial({ payload: { id : data.id_metode_bayar } })
        )
      }
    })
  }

  reLoadData() {
    this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.ajax.reload();
    });
  }

  showDataTables(edit) {
    return {
      pageLength: 10,
      serverSide: true,
      processing: true,
      order : [],
      ajax : (dataTablesParameters: any, callback: any) => {
        this.modulMetodeBayarService.listDatatables(dataTablesParameters)
        .subscribe((resp : any) => {
          callback({
            draw: resp.response.draw,
            recordsTotal: resp.response.recordsTotal,
            recordsFiltered: resp.response.recordsFiltered,
            data: resp.response.data
          })
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
          data : 'nama_bank'
        },
        {
          data:'pemilik_rekening'
        },
        {
          data: 'no_rekening'
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
