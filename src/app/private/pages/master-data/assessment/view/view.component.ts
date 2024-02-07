import { Component, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables'
import { Observable } from 'rxjs'
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Store } from '@ngrx/store';
import * as fromApp from 'src/app/private/states/private-app.states'
import { ModalService } from 'src/app/shared/_modal';
import { AssessmentPayload } from 'src/app/private/models/class-payload-api/master-data/assessment-payload';
import { AssessmentService } from 'src/app/private/services/master-data/assessment.service';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import * as AssessmentActions from 'src/app/private/states/master-data/assessment/assessment.actions'
import { NgxSpinnerService } from "ngx-spinner";
@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.sass']
})
export class ViewComponent implements OnInit {

  getState: Observable<any>;
  @ViewChild(DataTableDirective, {static: false}) datatableElement : any = DataTableDirective
  dtOptions: DataTables.Settings = {};

  titleModal : string
  aksiModal : string
  isEdit : boolean
  isLoadingButton: boolean
  reloadTable : boolean
  errorMessage : any | null
  submitButton : boolean
  submitted : boolean
  public formTambah: FormGroup;
  assessment : AssessmentPayload = new AssessmentPayload
  btnDetail=false
  btnDelete=false
  btnEdit=false
  btnSetting=false
  btnAdd=false
  view=false
  constructor(
    private modalService: ModalService,
    private fb: FormBuilder,
    private store : Store<fromApp.PrivateAppState>,
    private assessmentService : AssessmentService,
    private spinner : NgxSpinnerService,
  ) {
    this.getState = this.store.select('masterData_assessment')
  }

  ngOnInit(): void {
    let item=JSON.parse(localStorage.getItem('currentUser'))
    item=item.menu_right
    this.btnAdd=this.btnDelete=this.btnEdit=item.findIndex((val)=>val.kode=='MDMA02')!=-1?true:false
    this.btnDetail=this.view=item.findIndex((val)=>val.kode=='MDMA01')!=-1?true:false
    this.dtOptions = this.showDataTables(this.btnEdit)
    this.formTambah = this.fb.group({
      kode : ["", [Validators.required]],
      nama_id : ["", [Validators.required]],
      nama_en : [""]
    })
    if(!this.view){
      Swal.fire("Warning","Anda tidak mempunyai akses halaman ini",'warning').then(()=>{
        window.location.href='/'
      })
    }
    this.getState.subscribe((state) => {
      this.assessment = state.assessment
      this.isLoadingButton = state.isLoadingButton
      this.errorMessage = state.errorMessage
      this.reloadTable = state.reloadTable
      this.submitButton = state.submitButton
      this.isEdit = state.isEdit
      if (this.isEdit) {
        this.formTambah.patchValue({
          kode : this.assessment.kode,
          nama_id : this.assessment.nama_id,
          nama_en : this.assessment.nama_en
        })
        this.spinner.hide('spinner1')
        this.modalService.open("modalFormContent")
      }
      if(this.reloadTable) {
        this.reloadData()
        this.modalService.close("modalFormContent")
      }
    })
  }

  FormModalOpen() {
    this.submitted = false
    this.modalService.open("modalFormContent");
    this.titleModal= "Form Tambah Assessment"
    this.aksiModal = 'add'
    this.formTambah.reset()
  }

  SubmitForm() {
    this.submitted = true
    if (this.formTambah.invalid) {
      return
    }
    this.spinner.show('spinner1')
    let payload = new AssessmentPayload
    payload.id_assessment = this.assessment.id_assessment
    payload.id_klinik = this.assessment.id_klinik
    payload.kode = this.formTambah.value.kode
    payload.nama_en = this.formTambah.value.nama_en
    payload.nama_id = this.formTambah.value.nama_id

    if(this.aksiModal == 'add') {
      this.store.dispatch( AssessmentActions.addInitial({ payload : payload }) )
    } else {
      this.store.dispatch( AssessmentActions.updateInitial({ payload : payload }) )
    }
    setTimeout(() => {
      this.spinner.show('spinner1')
    }, 400);
  }
  modalClose() {
    this.modalService.close("modalFormContent")
  }
  editData(data : any) {
    this.submitted = false
    this.aksiModal = 'update'
    this.titleModal= "Form Edit Assesment"
    this.spinner.show('spinner1')
    this.store.dispatch( AssessmentActions.getByIdInitial({ payload : { id : data.id_assessment} }) )

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
          AssessmentActions.deleteInitial({ payload: { id : data.id_assessment } })
        )
        setTimeout(() => {
          this.spinner.hide('spinner1')
        }, 400);
      }
    })
  }
  showDataTables(edit) {
    this.spinner.show('spinner1')
    return {
      pageLength: 10,
      serverSide: true,
      processing: true,
      order : [],
      ajax : (dataTablesParameters: any, callback: any) => {
        this.assessmentService.getDataTables(dataTablesParameters)
        .subscribe((resp :any) => {
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
          data: "kode"
        },{
          data : "nama_id"
        },{
          data: "nama_en"
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
  reloadData() {
    this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.ajax.reload();
    });
  }

}
