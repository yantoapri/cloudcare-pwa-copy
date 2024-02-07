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
  selector: 'app-gaji-staff',
  templateUrl: './gaji-staff.component.html',
  styleUrls: ['./gaji-staff.component.scss']
})
export class gajiStaffComponent implements OnInit {
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
  status=[
    {text:"Ditahan",color:"danger"},
    {text:"Paid",color:"prime"}
  ]
  dataChecked=[]
  defaultData
  month=["Jan","Feb","Mar","Apr","Mei","Jun","Jul","Aug","Sep","Oct","Nov","Des"]
  ngOnInit(): void {
    this.formTambah = this.fb.group({
			date_from: ["", [Validators.required]],
      role_akun: [null, [Validators.required]],
    })

    this.dtOptions=this.showDataTables()
  }
  closeHistory(){
    this.showHistory=false
  }
  checkedAll(e) {
		if (e.target.checked) {
			this.dataChecked = this.defaultData
			$('td .option-checkbox').prop('checked', true);
		} else {
			this.dataChecked = []
			$('td .option-checkbox').prop('checked', false);
		}
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
        this.defaultData= [
          {
          nama_staff:'Jhon Doe',
          tanggal_cut:new Date(),
          no_rek:"04633564",
          status:"Pelayanan Kesehatan",
          total_paid:'Rp 5.700.000',
          },
    
        ]
        callback({
          draw: 1,
          recordsTotal: 1,
          recordsFiltered: 1,
          data: [
            {
            nama_staff:'Jhon Doe',
            tanggal_cut:new Date(),
            no_rek:"04633564",
            status:"Pelayanan Kesehatan",
            total_paid:'Rp 5.700.000',
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
          orderable: false,
          searchable: false,
          data: 'nama_staff',
          render(data: any, type: any, row: any, full: any) {
            let no = full.row + 1 + full.settings._iDisplayStar
            return `<div class="form-check">
            <input class="form-check-input option-checkbox" type="checkbox" name="checkbox${no}"  value="1"> ${data}
            </div>`
          }
        },
        {
          orderable: false,
          searchable: false,
          data: 'tanggal_cut',
          render(data: any, type: any, row: any, full: any) {
            let date=new Date(data)
            return date.getDate()+" "+selft.month[date.getMonth()]+" "+date.getFullYear()+", "+date.getHours()+":"+date.getMinutes()
          }
        },
        {
          orderable: false,
          searchable: false,
          data: 'no_rek',
          render(data: any, type: any, row: any, full: any) {
            return `${data} <p class="text-secondary">${row.nama_staff}</p>`
          }
        },
        {
          orderable: false,
          searchable: false,
          data: 'status',
          render(data: any, type: any, row: any, full: any) {
            return `<div class="badge badge-${status=='Ditahan'?'danger':'primary'}">${data}</div>`
          }
        },
        {
          orderable: false,
          searchable: false,
          data:"total_paid"
        },
      
        {
          orderable: false,
          searchable: false,
          render(data: any, type: any, row: any, full: any) {
            return `
            <button class="btn btn-link circle-primary text-ui-primary paid"><i class="fab fa-telegram-plane"></i></button>
            <button class="btn btn-link circle-info text-ui-info detail"><i class="far fa-eye"></i></button>
            <button class="btn btn-link circle-primary text-ui-primary edit"><i class="far fa-edit"></i></button>
            `;
          }
        }
      ],
      rowCallback: (row: Node, data: any[] | Object, index: number) => {
        const self = this;
        $('td .paid', row).on('click', () => {
          self.paid(data);
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
  paid(data){
    Swal.fire({
			title: 'Paid Gaji',
      text:'Anda akan melakukan paid gaji, pastikan anda sudah melakukan pengecekan dengan baik',
			iconHtml: '<i class="fab fa-telegram-plane" style="ffont-size: 50px; color:#00bdff;"></i>',
      customClass: {
        icon: 'no-border'
      },
			showCancelButton: true,
			allowOutsideClick: false,
			confirmButtonText: 'Paid',
			cancelButtonText: 'Cancel'
		}).then((result) => {
			if (result.value) {

      }
    })
  }
  edit(data){
    this.titleModal='Edit'
    this.openModal('modalgaji')
  }
  detail(data){
    this.router.navigate(['gaji-staff/detail', 1])
  }
  paidMasal(){
    Swal.fire({
			title: 'Paid Gaji',
      text:'Anda akan melakukan paid gaji, pastikan anda sudah melakukan pengecekan dengan baik',
			iconHtml: '<i class="fab fa-telegram-plane" style="font-size: 50px; color:#00bdff;"></i>',
      customClass: {
        icon: 'no-border'
      },
			showCancelButton: true,
			allowOutsideClick: false,
			confirmButtonText: 'Paid',
			cancelButtonText: 'Cancel'
		}).then((result) => {
			if (result.value) {

      }
    })
  }
}
