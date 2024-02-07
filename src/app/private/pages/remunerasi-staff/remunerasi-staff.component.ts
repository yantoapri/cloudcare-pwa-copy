import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { DataTableDirective } from 'angular-datatables'
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NgxSpinnerService } from "ngx-spinner";
import * as moment from 'moment';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import { ModalService } from 'src/app/shared/_modal';
import { RoleService } from 'src/app/private/services/role-and-rights/role.service'
import { listState } from '../../services/listState';
import { Router } from '@angular/router';
@Component({
  selector: 'app-remunerasi-staff',
  templateUrl: './remunerasi-staff.component.html',
  styleUrls: ['./remunerasi-staff.component.scss']
})
export class remunerasiStaffComponent implements OnInit {
  @ViewChild(DataTableDirective, {static: false}) datatableElement : any = DataTableDirective
  dtOptions: DataTables.Settings = {};
  reloadTable : boolean
  getState: Observable<any>;
  showFilter=false
  public formTambah: FormGroup;
  constructor(
    private spinner:NgxSpinnerService,
    private fb: FormBuilder,
    private router:Router,
    private modal:ModalService
  ) {
    this.dtOptions= this.showDataTables()
   }

  showHistory=false
  titleModal=""
  month=["Jan","Feb","Mar","Apr","Mei","Jun","Jul","Aug","Sep","Oct","Nov","Des"]
  ngOnInit(): void {
    this.formTambah = this.fb.group({
			unit_kerja: [null, [Validators.required]],
      lama_kerja: [null, [Validators.required]],
    })

    this.dtOptions=this.showDataTables()
  }
  closeHistory(){
    this.showHistory=false
  }
 
  openModal(val){
    this.modal.open(val);
  }
  closeModal(val){
    this.modal.close(val);
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
            lama_kerja:1,
            unit_kerja:"Pelayanan Kesehatan",
            gaji:'Rp 5.000.000',
            bonus:'0'
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
          data: 'lama_kerja'
        },
        {
          data: 'unit_kerja',
        },
        {
          data:"gaji"
        },
        {
          data:"bonus"
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
    this.openModal('modalRemunerasi')
  }
  detail(data){
    this.openModal('detailRemunerasi')
  }
}
