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
  selector: 'app-kpi',
  templateUrl: './kpi.component.html',
  styleUrls: ['./kpi.component.scss']
})
export class kpiComponent implements OnInit {
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
			date_from: ["", [Validators.required]],
      id_akun: [null, [Validators.required]],
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
            nama_kpi:'Jhon Doe',
            nama_akun:"Admin",
            tanggal:new Date(),
            jumlah_pasien:10,
            waktu_tunggu:5,
            tingkat_kepuasan:'80%'
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
          data: 'nama_kpi'
        },
        {
          data: 'nama_akun'
        },
        {
          data: 'tanggal',
          render(data: any, type: any, row: any, full: any) {
            let date=new Date(data)
            return date.getDate()+" "+selft.month[date.getMonth()]+" "+date.getFullYear()+", "+date.getHours()+":"+date.getMinutes()
          }
        },
        {
          data: 'jumlah_pasien',
        },
        {
          data:"waktu_tunggu"
        },
        {
          data:"tingkat_kepuasan"
        },
        {
          orderable: false,
          searchable: false,
          render(data: any, type: any, row: any, full: any) {
            return `
            <button class="btn btn-link circle-info text-ui-primary detail"><i class="far fa-eye"></i></button>`;
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
    this.router.navigate(['kpi/detail', 1])
  }
}
