import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { DataTableDirective } from 'angular-datatables'
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NgxSpinnerService } from "ngx-spinner";
import * as moment from 'moment';
import { WilayahService } from 'src/app/private/services/master-data/wilayah.service';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import { ModalService } from 'src/app/shared/_modal';
import { RoleService } from 'src/app/private/services/role-and-rights/role.service'
import { listState as listFlag } from 'src/app/private/services/listState'
import { ValidateService} from 'src/app/private/services/validate/validateService'
@Component({
  selector: 'app-detail-staff',
  templateUrl: './detailStaff.component.html',
  styleUrls: ['./detailStaff.component.scss']
})
export class detailStaffComponent implements OnInit {
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
  listState=[]
  loadingState = false
  constructor(
    private spinner:NgxSpinnerService,
    private fb: FormBuilder,
    private modal:ModalService,
    private wilayahService:WilayahService,
    private ValidateService:ValidateService,
    private listFlag:listFlag,
  ){}
  ngOnInit(): void {
    this.listState=this.listFlag.state()
    this.formTambah = this.fb.group({
			date_from: ["", [Validators.required]],
      role_akun: [null, [Validators.required]],
    })

  }
  prosesSelectState(event: any, aksi: string) {
    this.loadingState = true
   

    if (aksi == 'search') {
        let arr = []
        this.listState.map((val) => {
            if (val.name.search(event)) {
                arr.push(val)
            }
        })
        this.listState = arr
    }
    this.loadingState = false
  }
  isNumber(val){
    return this.ValidateService.Number(val)
  }
 
  prosesSelectProvinsi(event : any, aksi : string) {
    if (aksi == 'search')
		{
			this.paramProvinsiKtp.search = event.term
      if(this.paramProvinsiKtp.search==""||this.paramProvinsiKtp.search.length>=3){
			this.listProvinsiKtp=[]
      this.listKabupatenKtp=[]
      this.listKecamatanKtp=[]
      this.listDesaKtp=[]
			this.paramDesaKtp.last_data=0
      this.paramKabupatenKtp.last_data=0
      this.paramKecamatanKtp.last_data=0
      this.paramProvinsiKtp.last_data=0
      this.isLastProv=false
      this.isLastKab=false
      this.isLastKec=false
      this.isLastDes=false
      }else{
        this.isLastProv=true
      }
		}
    if(aksi=="open"||aksi=="clear"){
      this.paramProvinsiKtp.search = ""
      this.listProvinsiKtp=[]
      this.listKabupatenKtp=[]
      this.listKecamatanKtp=[]
      this.listDesaKtp=[]
			this.paramDesaKtp.last_data=0
      this.paramKabupatenKtp.last_data=0
      this.paramKecamatanKtp.last_data=0
      this.paramProvinsiKtp.last_data=0
      this.isLastProv=false
      this.isLastKab=false
      this.isLastKec=false
      this.isLastDes=false
    }
		if(aksi=="last_page"){
      if(!this.isLastProv){
        this.paramProvinsiKtp.last_data += 10
      }
			
		}
    if(!this.isLastProv){
      this.wilayahService.getProvinsiSelectOption(this.paramProvinsiKtp)
      .subscribe(succ => {
        if(succ.response.length>0){
          if(succ.response.length<10)
          {
            succ.response.map(val=>{
              let i=this.listProvinsiKtp.findIndex(x=>x.id==val.id)
							if(i==-1)
              this.listProvinsiKtp.push(val)
            })
            this.isLastProv=true
          }
          else{
            succ.response.map(val=>{
              let i=this.listProvinsiKtp.findIndex(x=>x.id==val.id)
							if(i==-1)
              this.listProvinsiKtp.push(val)
            })
          }
        }else{
          this.isLastProv=true
        }
      })
    }
    
  }
  prosesSelectKabupatenKtp(event : any, aksi : string) {
    if (aksi == 'search')
		{
			this.paramKabupatenKtp.search = event.term
      if(this.paramKabupatenKtp.search==""||this.paramKabupatenKtp.search.length>=3){
			this.listKabupatenKtp=[]
      this.listKecamatanKtp=[]
      this.listDesaKtp=[]
			this.paramDesaKtp.last_data=0
      this.paramKecamatanKtp.last_data=0
      this.paramKabupatenKtp.last_data=0
      this.isLastKab=false
      this.isLastKec=false
      this.isLastDes=false
      }else{
        this.isLastKab=true
      }
		}
		if(aksi=="open"||aksi=="clear"){
      this.paramKabupatenKtp.search=""
      this.listKabupatenKtp=[]
      this.listKecamatanKtp=[]
      this.listDesaKtp=[]
			this.paramDesaKtp.last_data=0
      this.paramKecamatanKtp.last_data=0
      this.paramKabupatenKtp.last_data=0
      this.isLastKab=false
      this.isLastKec=false
      this.isLastDes=false
    }
		if(aksi=="last_page"){
      if(!this.isLastKab){
        this.paramKabupatenKtp.last_data += 10
      }
			
		}
    if(!this.isLastKab){
      this.wilayahService.getKabupatenSelectOption(this.paramKabupatenKtp,this.idProvinsiKtp)
      .subscribe(succ => {
        if(succ.response.length>0){
          if(succ.response.length<10)
          {
            succ.response.map(val=>{
              let i=this.listKabupatenKtp.findIndex(x=>x.id==val.id)
							if(i==-1)
              this.listKabupatenKtp.push(val)
            })
            this.isLastKab=true
          }
          else{
            succ.response.map(val=>{
              let i=this.listKabupatenKtp.findIndex(x=>x.id==val.id)
							if(i==-1)
              this.listKabupatenKtp.push(val)
            })
          }
        }else{
          this.isLastKab=true
        }
      })
    }
    
  }
  prosesSelectKecamatanKtp(event : any, aksi : string) {
    if (aksi == 'search')
		{
			this.paramKecamatanKtp.search = event.term
      if(this.paramKecamatanKtp.search==""||this.paramKecamatanKtp.search.length>=3){
			this.listKecamatanKtp=[]
      this.listDesaKtp=[]
			this.paramDesaKtp.last_data=0
      this.paramKecamatanKtp.last_data=0
      this.isLastKec=false
      this.isLastDes=false
      }else{
        this.isLastKec=true
      }
		}
		if(aksi=="open"||aksi=="clear"){
      this.paramKecamatanKtp.search=""
      this.listKecamatanKtp=[]
      this.listDesaKtp=[]
			this.paramDesaKtp.last_data=0
      this.paramKecamatanKtp.last_data=0
      this.isLastKec=false
      this.isLastDes=false
    }
		if(aksi=="last_page"){
      if(!this.isLastKec){
        this.paramKecamatanKtp.last_data += 10
      }
			
		}
    if(!this.isLastKec){
      this.wilayahService.getKecamatanSelectOption(this.paramKecamatanKtp,this.idKabupatenKtp)
      .subscribe(succ => {
        if(succ.response.length>0){
          if(succ.response.length<10)
          {
            succ.response.map(val=>{
              let i=this.listKecamatanKtp.findIndex(x=>x.id==val.id)
							if(i==-1)
              this.listKecamatanKtp.push(val)
            })
            this.isLastKec=true
          }
          else{
            succ.response.map(val=>{
              let i=this.listKecamatanKtp.findIndex(x=>x.id==val.id)
							if(i==-1)
              this.listKecamatanKtp.push(val)
            })
          }
        }else{
          this.isLastKec=true
        }
      })
    }
    
  }
  prosesSelectDesaKtp(event : any, aksi : string) {
    if (aksi == 'search')
		{
			this.paramDesaKtp.search = event.term
      if(this.paramDesaKtp.search==""||this.paramDesaKtp.search.length>=3){
			this.listDesaKtp=[]
			this.paramDesaKtp.last_data=0
      this.isLastDes=false
      }else{
        this.isLastDes=true
      }
		}
		if(aksi=="open"||aksi=="clear"){
      this.paramDesaKtp.search=""
      this.listDesaKtp=[]
			this.paramDesaKtp.last_data=0
      this.isLastDes=false
    }
		if(aksi=="last_page"){
      if(!this.isLastDes){
        this.paramDesaKtp.last_data += 10
      }
			
		}
    if(!this.isLastDes){
      this.wilayahService.getDesaSelectOption(this.paramDesaKtp,this.idKecamatanKtp)
      .subscribe(succ => {
        if(succ.response.length>0){
          if(succ.response.length<10)
          {
            succ.response.map(val=>{
              let i=this.listDesaKtp.findIndex(x=>x.id==val.id)
							if(i==-1)
              this.listDesaKtp.push(val)
            })
            this.isLastDes=true
          }
          else{
            succ.response.map(val=>{
              let i=this.listDesaKtp.findIndex(x=>x.id==val.id)
							if(i==-1)
              this.listDesaKtp.push(val)
            })
          }
        }else{
          this.isLastDes=true
        }
      })
    }
    
  }
  changeProvinsiKtp() {
    this.idKabupatenKtp = null
    this.idKecamatanKtp = null
    this.idDesaKtp = null
    this.listKabupatenKtp,this.listKecamatanKtp,this.listDesaKtp=[]
    this.isLastKab,this.isLastKec,this.isLastDes=false
  }

  changeKabupatenKtp() {
    this.idKecamatanKtp = null
    this.idDesaKtp = null
    this.listKecamatanKtp,this.listDesaKtp=[]
    this.isLastKec,this.isLastDes=false
  }
  changeKecamatanKtp() {
    this.idDesaKtp = null
    this.listDesaKtp=[]
    this.isLastDes=false
  }
}
