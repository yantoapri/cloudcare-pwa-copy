import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { DataTableDirective } from 'angular-datatables'
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NgxSpinnerService } from "ngx-spinner";
import * as moment from 'moment';
import { WilayahService } from 'src/app/private/services/master-data/wilayah.service';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import { ModalService } from 'src/app/shared/_modal';
@Component({
  selector: 'app-detail-kpi',
  templateUrl: './detailKPI.component.html',
  styleUrls: ['./detailKPI.component.scss']
})
export class detailKPIComponent implements OnInit {
  @ViewChild(DataTableDirective, {static: false}) datatableElement : any = DataTableDirective
  dtOptions: DataTables.Settings = {};
  reloadTable : boolean
  getState: Observable<any>;
  showFilter=false
  public formTambah: FormGroup;
  paramProvinsiKtp  = { last_data : 0, get_data : 10, search : "" }
  paramKabupatenKtp = { last_data : 0, get_data : 10, search : "" }
  paramKecamatanKtp = { last_data : 0, get_data : 10, search : "" }
  paramDesaKtp      = { last_data : 0, get_data : 10, search : "" }

  paramProvinsiDomisili  = { last_data : 0, get_data : 10, search : "" }
  paramKabupatenDomisili = { last_data : 0, get_data : 10, search : "" }
  paramKecamatanDomisili = { last_data : 0, get_data : 10, search : "" }
  paramDesaDomisili      = { last_data : 0, get_data : 10, search : "" }

  idProvinsiKtp  : any = null
  idKabupatenKtp : any = null
  idKecamatanKtp : any = null
  idDesaKtp      : any = null

  isLastProv=false
  isLastKab=false
  isLastKec=false
  isLastDes=false
  listProvinsiKtp  = []
  listKabupatenKtp = []
  listKecamatanKtp = []
  listDesaKtp      = []
  constructor(
    private spinner:NgxSpinnerService,
    private fb: FormBuilder,
    private modal:ModalService,
    private wilayahService:WilayahService
  ){}
  ngOnInit(): void {
    this.formTambah = this.fb.group({
			date_from: ["", [Validators.required]],
      role_akun: [null, [Validators.required]],
    })

  }
  onFocus(id){
		document.getElementById(id).click()
	}
 
}
