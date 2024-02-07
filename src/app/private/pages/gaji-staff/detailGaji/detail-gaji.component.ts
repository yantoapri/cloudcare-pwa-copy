import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { DataTableDirective } from 'angular-datatables'
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NgxSpinnerService } from "ngx-spinner";
import * as moment from 'moment';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import { ModalService } from 'src/app/shared/_modal';

import { Router } from '@angular/router';
@Component({
  selector: 'app-detail-gaji-staff',
  templateUrl: './detail-gaji.component.html',
  styleUrls: ['./detail-gaji.component.scss']
})
export class detailGajiStaffComponent implements OnInit {
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
 
  paid(){
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


}
