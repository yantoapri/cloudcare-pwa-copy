import { Component, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables'
import { Observable } from 'rxjs'
import { NgxSpinnerService } from "ngx-spinner";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import Swal from 'sweetalert2/dist/sweetalert2.js'
import { Store } from '@ngrx/store';
import * as fromApp from 'src/app/private/states/private-app.states'
import * as RepoServiceActions from 'src/app/private/states/manajemen-menu/repo-service/repo-service.actions'
import { RepoServicePayload } from 'src/app/private/models/class-payload-api/manajemen-menu/repo-service-payload';
import { RepoServiceService } from 'src/app/private/services/manajemen-menu/repo-service.service';
import { RepoService } from 'src/app/private/services/manajemen-menu/repo.service';
import { ModalService } from 'src/app/shared/_modal';
@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.sass']
})
export class ViewComponent implements OnInit {

  @ViewChild('formContent') formContent : any;
  getState: Observable<any>;
  @ViewChild(DataTableDirective, {static: false}) datatableElement : any = DataTableDirective
  dtOptions: DataTables.Settings = {};
  listRepo : any = []
  titleModal : string
  aksiModal : string
  isEdit : boolean
  isLoadingButton: boolean
  errorMessage : any | null

  repoServicePayload : RepoServicePayload = new RepoServicePayload
  submitButton : boolean
  reloadTable : boolean
  public formTambah: FormGroup;
  submitted : boolean = false
  constructor(
    private repoServiceService: RepoServiceService,
    private repoService : RepoService,
    private modalService: ModalService,
    private fb: FormBuilder,
    private spinner : NgxSpinnerService,
    private store : Store<fromApp.PrivateAppState>,
  ) {
    this.getState = this.store.select('manajemenMenu_repoService')
   }
  btnDetail=false
  btnDelete=false
  btnEdit=false
  btnSetting=false
  btnAdd=false
  view=false
  ngOnInit(): void {
    let item=JSON.parse(localStorage.getItem('currentUser'))
    item=item.menu_right
    this.btnAdd=this.btnDelete=this.btnEdit=item.findIndex((val)=>val.kode=='RRMNRS2')!=-1?true:false
    this.btnDetail=this.view=item.findIndex((val)=>val.kode=='RRMNRS1')!=-1?true:false

    if(!this.view){
        Swal.fire("Warning","Anda tidak mempunyai akses halaman ini",'warning').then(()=>{
          window.location.href='/'
        })
    }
    this.spinner.show('spinner1')
    this.loadlistRepo()
    this.dtOptions = this.showDataTables(this.btnEdit)

    this.formTambah = this.fb.group({
      kode_service : ["", [Validators.required]],
      nama_service : ["", [Validators.required]],
      id_repo: ["" , [Validators.required]],
    })
    this.getState.subscribe((state) => {
      this.repoServicePayload = state.repoService
      this.isLoadingButton = state.isLoadingButton
      this.errorMessage = state.errorMessage
      this.reloadTable = state.reloadTable
      this.submitButton = state.submitButton
      this.isEdit = state.isEdit
      if (this.isEdit) {
        this.formTambah.patchValue({
          kode_service : this.repoServicePayload.kode_service,
          nama_service : this.repoServicePayload.nama_service,
          id_repo : this.repoServicePayload.id_repo
        })
        this.spinner.hide('spinner1')
        this.modalService.open("modalFormContent");
      }
      if(this.reloadTable) {
        this.modalService.close("modalFormContent")
        this.reLoadData()
      }
    })
  }
  SubmitForm() {
    this.submitted = false
    setTimeout(() => { this.submitted = true }, 200)
    if (this.formTambah.invalid) {
      return
    }
    this.spinner.show('spinner1')
    let payload = new RepoServicePayload
    payload.id_repo_service = this.repoServicePayload.id_repo_service
    payload.id_repo = this.formTambah.value.id_repo
    payload.kode_service = this.formTambah.value.kode_service
    payload.nama_service = this.formTambah.value.nama_service
    if(this.aksiModal == 'add') {
      this.store.dispatch(
        RepoServiceActions.addRepoService({ payload :payload })
      )
    } else {
      this.store.dispatch(
        RepoServiceActions.updateRepoService({ payload: payload })
      )
    }
    setTimeout(() => {
      this.spinner.hide('spinner1')
    }, 400);
  }

  modalClose() {
    this.modalService.close("modalFormContent")
  }

  FormModalOpen() {
    this.submitted =false
    this.modalService.open("modalFormContent");
    this.titleModal= "Form Tambah Repo Service"
    this.aksiModal = 'add'
    this.store.dispatch(
      RepoServiceActions.clearData()
    )
    this.formTambah.reset()
    this.formTambah.patchValue({
      id_repo : ""
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
        this.repoServiceService.getDataTables(dataTablesParameters)
        .subscribe((resp : any) => {
          callback({
            draw: resp.response.draw,
            recordsTotal: resp.response.recordsTotal,
            recordsFiltered: resp.response.recordsFiltered,
            data: resp.response.data
          });
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
        },
        {
          data: 'kode_service'
        },{
          data: 'nama_service'
        },{
          data: 'nama_repo'
        },{
          orderable: false,
          searchable: false,
          render(data: any, type: any, row: any, full: any) {
            return edit?'<button class="btn btn-link circle-primary text-ui-primary update-data "><i class="far fa-edit"></i></button>'+
            '<button class="btn btn-link circle-danger text-ui-danger nonaktif-data"><i class="far fa-trash-alt"></i></button>':'';
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
  editData(data : any) {
    this.aksiModal = 'update'
    this.titleModal= "Form Edit Repo Service"
    this.store.dispatch(
      RepoServiceActions.getRepoServiceById({ payload : { id: data.id_repo_service } })
    )
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
          RepoServiceActions.deleteRepoService({ payload : { id : data.id_repo_service } })
        )
        setTimeout(() => {
          this.spinner.hide('spinner1')
        }, 400);
      }
    })
  }

  loadlistRepo() {
    this.repoService.listRepo()
    .subscribe(succ => {
      this.listRepo = succ.response
      this.spinner.hide('spinner1')
    })
  }
  reLoadData() {
    this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.ajax.reload();
    });
  }

}
