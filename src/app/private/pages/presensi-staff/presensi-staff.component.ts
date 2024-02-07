import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { DataTableDirective } from 'angular-datatables'
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NgxSpinnerService } from "ngx-spinner";
import * as moment from 'moment';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import { ModalService } from 'src/app/shared/_modal';
import { RoleService } from 'src/app/private/services/role-and-rights/role.service'
@Component({
  selector: 'app-presensi-staff',
  templateUrl: './presensi-staff.component.html',
  styleUrls: ['./presensi-staff.component.scss']
})
export class PresensiStaffComponent implements OnInit {
  @ViewChild(DataTableDirective, {static: false}) datatableElement : any = DataTableDirective
  dtOptions: DataTables.Settings = {};
  reloadTable : boolean
  getState: Observable<any>;
  public formTambah: FormGroup;
  constructor(
    private spinner:NgxSpinnerService,
    private roleService: RoleService,
    private fb: FormBuilder,
    private modal:ModalService
  ) {
    this.dtOptions= this.showDataTables()
   }
   listRoleAKun: any = []
  showHistory=false
  titleModal=""
  month=["Jan","Feb","Mar","Apr","Mei","Jun","Jul","Aug","Sep","Oct","Nov","Des"]
  ngOnInit(): void {
    this.formTambah = this.fb.group({
			date_from: ["", [Validators.required]],
      role_akun: [null, [Validators.required]],
    })
    this.roleService.getRoleByAKun()
			.subscribe(succ => {
				this.listRoleAKun = succ.response
			})
    this.dtOptions=this.showDataTables()
  }
  closeHistory(){
    this.showHistory=false
  }
  prosesSelectRole(event: any, aksi: string) {
		this.listRoleAKun = this.searchProses(this.listRoleAKun, 'nama_role', event)
	}
  openModal(val){
    this.modal.open(val);
  }
  closeModal(val){
    this.modal.close(val);
  }
  searchProses(data, key, search) {
		let res = []
		data.map((val, index) => {
			if (val[key].search(search) != -1) {
				res.push(val)
			}
		})
		return res
	}
  submitForm(){

  }
  onFocus(id){
		document.getElementById(id).click()
	}
  showDataTables() {
    this.spinner.show('spinner1')
    let selft=this
    return {
      pageLength: 10,
      serverSide: true,
      processing: true,
      pagingType:'simple',
      order : [],
      ajax : (dataTablesParameters: any, callback: any) => {
        // this.daftarRuangService.getDataTables(dataTablesParameters)
        // .subscribe((resp : any) => {
        //   callback({
        //     draw: resp.response.draw,
        //     recordsTotal: resp.response.recordsTotal,
        //     recordsFiltered: resp.response.recordsFiltered,
        //     data: resp.response.data
        //   })
        //   this.spinner.hide('spinner1')
        // })
        callback({
          draw: 1,
          recordsTotal: 1,
          recordsFiltered: 1,
          data: [
            {
            nama_staff:'Jhon Doe',
            nama_akun:"Admin",
            shift:"Shift1",
            tanggal:new Date(),
            waktu_masuk:"10:30:00",
            waktu_keluar:"11:00:00",
            keterlambatan:10
            },
            
          ]
        })
        this.spinner.hide('spinner1')
      },
      columns : [
        {
          orderable: false,
          searchable: false,
          render(data: any, type: any, row: any, full: any) {
            return full.row + 1 + full.settings._iDisplayStart;
          }
        },
        {
          data: 'nama_staff'
        },
        {
          data: 'nama_akun'
        },
        {
          data: 'shift',
          render(data: any, type: any, row: any, full: any) {
            return `<div class="badge badge-success">${data}</div>`
          }
        },
        {
          data: 'tanggal',
          render(data: any, type: any, row: any, full: any) {
            let date=new Date(data)
            return date.getDate()+" "+selft.month[date.getMonth()]+" "+date.getFullYear()+", "+date.getHours()+":"+date.getMinutes()
          }
        },
        {
          data: 'waktu_masuk'
        },
        {
          data: 'waktu_keluar'
        },
        {
          data: 'keterlambatan'
        },
        {
          orderable: false,
          searchable: false,
          render(data: any, type: any, row: any, full: any) {
            return `
            <button class="btn btn-link circle-info text-ui-info detail"><i class="far fa-eye"></i></button>
            <button class="btn btn-link circle-primary text-ui-primary edit"><i class="far fa-edit"></i></button>
            <button class="btn btn-link circle-danger text-ui-danger nonaktif-data"><i class="far fa-trash-alt"></i></button>`;
          }
        }
      ],
      rowCallback: (row: Node, data: any[] | Object, index: number) => {
        const self = this;
        $('td .nonaktif-data', row).on('click', () => {
          self.nonAktif(data);
        });
        $('td .edit', row).on('click', () => {
          self.edit(data);
        });
        $('td .detail', row).on('click', () => {
          self.detail(data);
        });
        return row;
      }
    }
  }
  nonAktif(data){
    Swal.fire({
			title: 'Apakah anda yakin akan menghapus data ini ?',
			icon: 'warning',
			showCancelButton: true,
			allowOutsideClick: false,
			confirmButtonText: 'Ya, hapus saja!',
			cancelButtonText: 'Tidak, Batalkan'
		}).then((result) => {
			if (result.value) {

      }
    })
  }
  edit(data){
    this.titleModal='Edit'
    this.openModal('modalStaff')
  }
  detail(data){
    this.openModal('detailStaff')
  }
}
