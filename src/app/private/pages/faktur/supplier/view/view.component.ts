import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ModalService } from 'src/app/shared/_modal';
import { SupplierPayload } from "src/app/private/models/class-payload-api/master-data/supplier-payload";
import { DataTableDirective } from 'angular-datatables'
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import Swal from 'sweetalert2/dist/sweetalert2.js'
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromApp from 'src/app/private/states/private-app.states'
// import * as JadwalSesiActions from 'src/app/private/states/master-data/ruang-dan-jadwal/jadwal-sesi/jadwal-sesi.actions'
import * as SupplierActions from 'src/app/private/states/master-data/supplier/supplier.actions'
import { ModulSupplierService } from "src/app/private/modul-api/modul-master-node/modul-supplier.service";
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.sass']
})
export class ViewComponent implements OnInit {

  @ViewChild(DataTableDirective, {static: false}) datatableElement : any = DataTableDirective
  dtOptions: DataTables.Settings = {}

  formInput: FormGroup

  titleModal : string
  isLoadingButton : boolean
  aksiModal : string
  isEdit : boolean

  reloadTable : boolean
  errorMessage : any | null
  submitButton : boolean
  submitted : boolean
  getState: Observable<any>
  supplier : SupplierPayload = new SupplierPayload
  btnDetail=false
  btnDelete=false
  btnEdit=false
  btnSetting=false
  btnAdd=false
  view=false
  constructor(
    private modalService : ModalService,
    private modulSupplierService : ModulSupplierService,
    private fb : FormBuilder,
    private spinner : NgxSpinnerService,
    private store : Store<fromApp.PrivateAppState>,
    private el : ElementRef,
  ) {
    this.getState = this.store.select('masterData_supplier')
  }

  ngOnInit(): void {
    this.spinner.show('spinner1')
    let item=JSON.parse(localStorage.getItem('currentUser'))
    item=item.menu_right
    this.btnAdd=this.btnDelete=this.btnEdit=item.findIndex((val)=>val.kode=='MDMIPS2')!=-1?true:false
    this.btnDetail=this.view=item.findIndex((val)=>val.kode=='MDMIPS1')!=-1?true:false

    if(!this.view){
        Swal.fire("Warning","Anda tidak mempunyai akses halaman ini",'warning').then(()=>{
          window.location.href='/'
        })
      }
    this.dtOptions = this.showDataTables(this.btnEdit)

    this.formInput = this.fb.group({
      nama_supplier : ['', [Validators.required]],
      no_telp: ['', [Validators.required]],
      keterangan : ['', [Validators.required]],
      jenis : ["", [Validators.required]],
      alamat : ['', [Validators.required]],
    })
    setTimeout(() => {
      this.spinner.hide('spinner1')
    }, 400);
    this.getState.subscribe((state) => {
      this.supplier = state.supplier
      this.isLoadingButton = state.isLoadingButton
      this.errorMessage = state.errorMessage
      this.reloadTable = state.reloadTable
      this.submitButton = state.submitButton
      this.isEdit = state.isEdit
      if (this.isEdit === true) {

        this.formInput.patchValue({
          nama_supplier : this.supplier.nama_supplier,
          no_telp : this.supplier.no_telp,
          keterangan : this.supplier.keterangan,
          jenis : this.supplier.jenis,
          alamat : this.supplier.alamat,
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

  SubmitForm() {


    this.submitted = false
    setTimeout(() => { this.submitted = true }, 200)

    if (this.formInput.invalid) {
      for (const key of Object.keys(this.formInput.controls)) {
        if (this.formInput.controls[key].invalid) {
          const invalidControl = this.el.nativeElement.querySelector('[formcontrolname="' + key + '"]');
          // invalidControl.focus()
          break;
        }
      }
      return
    }
    this.spinner.show('spinner1')
    let payload = new SupplierPayload
    payload.id_supplier = this.supplier.id_supplier
    payload.nama_supplier = this.formInput.value.nama_supplier
    payload.no_telp = this.formInput.value.no_telp
    payload.keterangan = this.formInput.value.keterangan
    payload.jenis = this.formInput.value.jenis
    payload.alamat = this.formInput.value.alamat

    if(this.aksiModal === 'add') {
      this.store.dispatch( SupplierActions.addInitial({ payload : payload }) )
    } else {
      this.store.dispatch( SupplierActions.updateInitial({ payload : payload }) )
    }
    setTimeout(() => {
      this.spinner.hide('spinner1')
    }, 400);
  }

  btnOpenModal() {
    this.submitted = false
    this.titleModal = 'Tambah Baru'
    this.aksiModal = 'add'
    this.titleModal= "Form Tambah Baru"
    this.modalService.open("modalFormContent");
    this.formInput.reset()
    this.formInput.patchValue({
      jenis:""
    })
    this.store.dispatch( SupplierActions.clearData() )
  }

  modalClose() {
    this.modalService.close("modalFormContent");
  }

  editData(data: any) {
    this.submitted = false
    this.aksiModal = 'update'
    this.titleModal= "Form Edit Supplier"
    this.spinner.show('spinner1')
    this.store.dispatch( SupplierActions.getByIdInitial({ payload : { id : data.id_supplier } }) )
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
          SupplierActions.deleteInitial({ payload: { id : data.id_supplier } })
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
    
    return {
      pageLength: 10,
      serverSide: true,
      processing: true,
      order : [],
      ajax : (dataTablesParameters: any, callback: any) => {
        this.modulSupplierService.listDatatables(dataTablesParameters)
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
          data: 'nama_supplier'
        },{
          data: 'alamat'
        },{
          data: 'no_telp'
        },{
          data: 'keterangan'
        },{
          data: 'jenis'
        },{
          orderable: false,
          searchable: false,
          render(data: any, type: any, row: any, full: any) {
            let res=''
            res+=edit?` <button  class="btn btn-link circle-primary text-ui-primary update-data mb-1"><i class="far fa-edit"></i></button>`:''
            res+=edit?` <button  class="btn btn-link circle-danger text-ui-danger nonaktif-data mb-1"><i class="far fa-trash-alt"></i></button>`:'';
            return res
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
