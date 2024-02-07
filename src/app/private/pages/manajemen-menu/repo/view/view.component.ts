import { Component, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables'
import { Observable } from 'rxjs'
import { RepoService } from 'src/app/private/services/manajemen-menu/repo.service'
import { RepoPayload } from 'src/app/private/models/class-payload-api/manajemen-menu/repo-payload'
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Store } from '@ngrx/store';
import * as fromApp from 'src/app/private/states/private-app.states'
import * as RepoActions from 'src/app/private/states/manajemen-menu/repo/repo.actions'
import Swal from 'sweetalert2/dist/sweetalert2.js'
import { ModalService } from 'src/app/shared/_modal';
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
  errorMessage : any | null

  repo : RepoPayload = new RepoPayload
  submitButton : boolean
  reloadTable : boolean
  public formTambah: FormGroup;
  submitted : boolean = false
  constructor(
    private repoService : RepoService,
    private modalService: ModalService,
    private fb: FormBuilder,
    private store : Store<fromApp.PrivateAppState>,
    private spinner : NgxSpinnerService,

  ) {
    this.getState = this.store.select('manajemenMenu_repo')
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
    this.btnAdd=this.btnDelete=this.btnEdit=item.findIndex((val)=>val.kode=='RRMNR2')!=-1?true:false
    this.btnDetail=this.view=item.findIndex((val)=>val.kode=='RRMNR1')!=-1?true:false

    if(!this.view){
        Swal.fire("Warning","Anda tidak mempunyai akses halaman ini",'warning').then(()=>{
          window.location.href='/'
        })
    }

    this.dtOptions = this.showDataTables(this.btnEdit)
    this.formTambah = this.fb.group({
      key_repo : ["", [Validators.required]],
      nama_repo : ["", [Validators.required]],
      url_repo: ["", [Validators.required]],
    })

    this.getState.subscribe((state) => {
      this.repo = state.repo
      this.isLoadingButton = state.isLoadingButton
      this.errorMessage = state.errorMessage
      this.reloadTable = state.reloadTable
      this.submitButton = state.submitButton
      this.isEdit = state.isEdit
      if (this.isEdit) {
        this.formTambah.patchValue({
          key_repo : this.repo.key_repo,
          nama_repo : this.repo.nama_repo,
          url_repo : this.repo.url_repo
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

  showDataTables(edit) {
    this.spinner.show('spinner1')
    return {
      pageLength: 10,
      serverSide: true,
      processing: true,
      order : [],
      ajax : (dataTablesParameters: any, callback: any) => {
        this.repoService.getDataTables(dataTablesParameters)
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
        },{
          data : 'key_repo'
        },{
          data : 'nama_repo'
        },{
          data : 'url_repo'
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
    this.titleModal= "Form Edit Repo"
    this.store.dispatch(
      RepoActions.getRepoById({ payload : {id : data.id_repo } })
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
          RepoActions.deleteRepo({ payload: { id : data.id_repo } })
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
  modalClose () {
    this.modalService.close("modalFormContent");
  }
  FormModalOpen() {
    this.submitted = false
    this.modalService.open("modalFormContent");
    this.titleModal= "Form Tambah Repo"
    this.aksiModal = 'add'
    this.store.dispatch(
      RepoActions.clearData()
    )
    this.formTambah.reset()
  }

  SubmitForm() {
    this.submitted = false
    setTimeout(() => { this.submitted = true }, 200)
    if (this.formTambah.invalid) {
      return
    }
    this.spinner.show('spinner1')
    let payload = new RepoPayload
    payload.id_repo = this.repo.id_repo
    payload.key_repo = this.formTambah.value.key_repo
    payload.nama_repo = this.formTambah.value.nama_repo
    payload.url_repo = this.formTambah.value.url_repo
    if (this.aksiModal == 'add') {
      this.store.dispatch(
        RepoActions.addRepo({ payload  : payload })
      )
    } else {
      this.store.dispatch(
        RepoActions.updateRepo({ payload: payload })
      )
    }
    setTimeout(() => {
      this.spinner.hide('spinner1')
    }, 400);
  }
}
