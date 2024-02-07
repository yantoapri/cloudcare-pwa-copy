import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { DataTableDirective } from 'angular-datatables'
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NgxSpinnerService } from "ngx-spinner";
import * as moment from 'moment';
import { Router } from '@angular/router';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import { ModalService } from 'src/app/shared/_modal';
import { RoleService } from 'src/app/private/services/role-and-rights/role.service'
import { listState } from '../../services/listState';
@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.scss']
})
export class StaffComponent implements OnInit {
  @ViewChild(DataTableDirective, {static: false}) datatableElement : any = DataTableDirective
  dtOptions: DataTables.Settings = {};
  reloadTable : boolean
  getState: Observable<any>;
  showFilter=false
  public formTambah: FormGroup;
  constructor(
    private spinner:NgxSpinnerService,
    private roleService: RoleService,
    private fb: FormBuilder,
    private router:Router,
    private modal:ModalService
  ) {
    this.dtOptions= this.showDataTables()
   }
   listStatus: any = [
    {status:"0",status_detail:"Belum Diperpanjang",color:"warning"},
    {status:"1",status_detail:"Exp < 1 Bulan",color:"pink"},
    {status:"2",status_detail:"Exp < 3 Bulan",color:"primary"},
    {status:"3",status_detail:"Aktif",color:"success"},
    {status:"4",status_detail:"Tidak Aktif",color:"danger"},
   ]
  showHistory=false
  titleModal=""
  month=["Jan","Feb","Mar","Apr","Mei","Jun","Jul","Aug","Sep","Oct","Nov","Des"]
  ngOnInit(): void {
    this.formTambah = this.fb.group({
			status: [null, [Validators.required]],
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
            no_str:"Shift1",
            tanggal_ed:new Date(),
            status:0
            },
            {
              nama_staff:'Jhon Doe',
              nama_akun:"Admin",
              no_str:"Shift1",
              tanggal_ed:new Date(),
              status:1
            },
            {
              nama_staff:'Jhon Doe',
              nama_akun:"Admin",
              no_str:"Shift1",
              tanggal_ed:new Date(),
              status:3
            },
            {
              nama_staff:'Jhon Doe',
              nama_akun:"Admin",
              no_str:"Shift1",
              tanggal_ed:new Date(),
              status:4
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
          data: 'no_str',
        },
        {
          data: 'tanggal_ed',
          render(data: any, type: any, row: any, full: any) {
            let date=new Date(data)
            return date.getDate()+" "+selft.month[date.getMonth()]+" "+date.getFullYear()+", "+date.getHours()+":"+date.getMinutes()
          }
        },
        {
          data: 'status',
          render(data: any, type: any, row: any, full: any) {
            return `<div class="badge badge-${selft.listStatus[data].color}">${selft.listStatus[data].status_detail}</div>`
          }
        },
        {
          orderable: false,
          searchable: false,
          render(data: any, type: any, row: any, full: any) {
            return `
            <button class="btn btn-link circle-primary text-ui-info detail"><img src="/assets/images/file.png" /></button>`;
          }
        }
      ],
      rowCallback: (row: Node, data: any[] | Object, index: number) => {
        const self = this;
        $('td .detail', row).on('click', () => {
          self.detail(data);
        });
        return row;
      }
    }
  }

  detail(data){
    this.router.navigate(['staff/detail', 1])
  }
}
