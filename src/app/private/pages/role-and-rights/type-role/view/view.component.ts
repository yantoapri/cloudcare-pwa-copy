import { Component, OnInit, ViewChild } from '@angular/core';
import { TypeRoleService } from 'src/app/private/services/role-and-rights/type-role.service'
import { DataTableDirective } from 'angular-datatables';
import { Router } from '@angular/router';
import { Observable } from 'rxjs'
import Swal from 'sweetalert2/dist/sweetalert2.js'
import { Store } from '@ngrx/store';
import * as fromApp from 'src/app/private/states/private-app.states'
import * as TypeRoleActions from 'src/app/private/states/role-and-rights/type-role/type-role.actions'
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.sass']
})
export class ViewComponent implements OnInit {

  constructor(
    private typeRoleService : TypeRoleService,
    private router : Router,
    private spinner : NgxSpinnerService,
    private store : Store<fromApp.PrivateAppState>,
  ) {
    this.getState = this.store.select('typeRole')
  }
  @ViewChild(DataTableDirective, { static: false }) dtElement!: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  getState: Observable<any>;
  isLoadingButton: boolean = false
  errorMessage : string | null = ''
  reloadTable: boolean = false

  ngOnInit(): void {
    this.dtOptions = this.showDataTables()
    this.store.dispatch( TypeRoleActions.clearData() )
    this.getState.subscribe((state) => {
      this.reloadTable = state.reloadTable
      this.errorMessage = state.errorMessage
      this.isLoadingButton = state.isLoadingButton
      if (this.reloadTable) {
        this.reLoadData()
      }
    })
  }

  showDataTables () {
    this.spinner.show('spinner1')
    return {
      pageLength: 10,
      serverSide: true,
      processing: true,
      order : [],
      ajax : (dataTablesParameters: any, callback: any) => {
        this.typeRoleService.getDataTables(dataTablesParameters).subscribe((resp : any) =>{
          this.spinner.hide('spinner1')
          callback({
            draw: resp.response.draw,
            recordsTotal: resp.response.recordsTotal,
            recordsFiltered: resp.response.recordsFiltered,
            data: resp.response.data
          });
        })
      },
      columns: [
        {
          data: 'no',
          orderable: false,
          searchable: false,
          render(data: any, type: any, row: any, full: any) {
            return full.row + 1 + full.settings._iDisplayStart;
          }
        },
        {
          data: 'nama_role_type'
        },
        {
          orderable: false,
          searchable: false,
          render(data: any, type: any, row: any, full: any) {
            return `<button class="btn btn-link circle-primary text-ui-primary update-data"><i class="far fa-edit"></i></button>
            <button class="btn btn-link circle-danger text-ui-danger nonaktif-data"><i class="far fa-trash-alt"></i></button>`;
          }
        }
      ],
      rowCallback: (row: Node, data: any[] | Object, index: number) => {
        const self = this;
        $('td .update-data', row).on('click', () => {
          self.updateTypeRole(data);
        });
        $('td .nonaktif-data', row).on('click', () => {
          self.nonAktif(data);
        });
        return row;
      }
    }
  }

  nonAktif(info : any) {
    Swal.fire({
      title: 'Apakah anda yakin akan menghapus data ini ?',
      icon: 'warning',
      showCancelButton: true,
      allowOutsideClick: false,
      confirmButtonText: 'Ya, Non aktifkan saja!',
      cancelButtonText: 'Tidak, Batalkan'
    }).then((result) => {
      if (result.value) {
        this.spinner.show('spinner1')
        this.store.dispatch(
          TypeRoleActions.deleteTypeRole({ payload : { id : info.id_role_type} })
        )
        setTimeout(() => {
          this.spinner.hide('spinner1')
        }, 400);
      }
    });
  }

  updateTypeRole(info : any) {
    this.router.navigate(['role-and-rights', 'tipe-role', 'edit', info.id_role_type])
  }


  reLoadData() {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.ajax.reload();
    });
  }

}
