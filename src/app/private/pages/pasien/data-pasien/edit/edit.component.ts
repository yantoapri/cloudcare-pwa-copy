import { Component, OnInit, ElementRef} from '@angular/core';
import { Observable } from 'rxjs';
import { WilayahService } from 'src/app/private/services/master-data/wilayah.service';
import { FormBuilder, FormGroup,  Validators} from "@angular/forms";
import { PasienPayload, AlamatDomisili, AlamatKtp, Alamat } from 'src/app/private/models/class-payload-api/pasien/pasien-payload';
import * as moment from 'moment';
import * as fromApp from 'src/app/private/states/private-app.states'
import { Store } from '@ngrx/store';
import * as PasienActions from 'src/app/private/states/pasien/data-pasien/pasien.actions'
import { ActivatedRoute, Params } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";
import { AESService } from 'src/app/private/services/AES/aes'
import { ValidateService} from 'src/app/private/services/validate/validateService'
import { listState as listFlag } from 'src/app/private/services/listState'
export enum TipeAlamat {
  KTP = 'ktp',
  DOMISILI = 'domisili'
}

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.sass']
})
export class EditComponent implements OnInit {

  paramProvinsiKtp  = { last_data : 0, get_data : 10, search : "" }
  paramKabupatenKtp = { last_data : 0, get_data : 10, search : "" }
  paramKecamatanKtp = { last_data : 0, get_data : 10, search : "" }
  paramDesaKtp      = { last_data : 0, get_data : 10, search : "" }

  paramProvinsiDomisili  = { last_data : 0, get_data : 10, search : "" }
  paramKabupatenDomisili = { last_data : 0, get_data : 10, search : "" }
  paramKecamatanDomisili = { last_data : 0, get_data : 10, search : "" }
  paramDesaDomisili      = { last_data : 0, get_data : 10, search : "" }

  listProvinsiKtp  : Array<any> = []
  listKabupatenKtp : Array<any> = []
  listKecamatanKtp : Array<any> = []
  listDesaKtp      : Array<any> = []

  isLastProv=false
  isLastKab=false
  isLastKec=false
  isLastDes=false
  isLastProvDom=false
  isLastKabDom=false
  isLastKecDom=false
  isLastDesDom=false

  listProvinsiDomisili  : Array<any> = []
  listKabupatenDomisili : Array<any> = []
  listKecamatanDomisili : Array<any> = []
  listDesaDomisili      : Array<any> = []

  idProvinsiKtp  : any = null
  idKabupatenKtp : any = null
  idKecamatanKtp : any = null
  idDesaKtp      : any = null

  idProvinsiDomisili  : any = null
  idKabupatenDomisili : any = null
  idKecamatanDomisili : any = null
  idDesaDomisili      : any = null

  tipeAlamat = TipeAlamat
  checkboxAlamatDomisili : boolean = false
  formTambah: FormGroup;
  submitted : boolean = false
  isEdit : boolean
  isLoadingButton : boolean
  reloadTable : boolean
  errorMessage : any | null
  submitButton : boolean
  getState : Observable<any>
  pasien :any
  listState=[]
  loadingState=false
  tgl_changed=false
  constructor(
    private wilayahService : WilayahService,
    private fb: FormBuilder,
    private el: ElementRef,
    private store : Store<fromApp.PrivateAppState>,
    private activatedRoute: ActivatedRoute,
    private spinner : NgxSpinnerService,
    private aes:AESService,
    private listFlag:listFlag,
    // private auth:AuthService,
    private ValidateService:ValidateService
  ) {
    this.getState = this.store.select('pasien_dataPasien')
  }
  keyGen:any
  ngOnInit(): void {
    this.listState=this.listFlag.state()
    let auth=localStorage.getItem('currentUser')?JSON.parse(localStorage.getItem('currentUser')):null
    this.keyGen=auth?this.aes.getKeyLogin(auth):''
    this.formTambah = this.fb.group({
      no_rm : ["", []],
      jenis_kelamin : ["", [Validators.required]],
      nik : ["", [Validators.required]],
      tgl_lahir : ["", [Validators.required]],
      tanggal_daftar:["", [Validators.required]],
      nama : ["", [Validators.required]],
      no_bpjs : ["", []],
      golongan_darah : ["", []],
      no_hp : ["", [Validators.required]],
      nama_panggilan : ["SDR", []],
      tempat_lahir : ["", []],
      agama : ["", []],
      status_perkawinan : ["", []],
      pekerjaan : ["", []],
      kewarganegaraan : ["", []],
      status_bpjs : ["0", []],
      jenis_alamat: ["ktp", []],
      alamat_ktp : ["", [Validators.required]],
      alamat_domisili : ["", []],
      dial_code:[null,[Validators.required]],
      isDomisili:[false, []],
    })
    this.activatedRoute.params.subscribe((params : Params) => {
      if(params) {
        this.spinner.show('spinner1')
        this.store.dispatch( PasienActions.getByIdInitial({ payload : { id : params.id } }) )
      }
    })
  
    this.getState.subscribe((state) => {
      this.pasien = state.pasien
      this.errorMessage = state.errorMessage
      this.submitButton = state.submitButton
      this.isLoadingButton = state.isLoadingButton
      this.isEdit = state.isEdit
      if(this.isEdit === true) {
        this.formTambah.patchValue({
          no_rm : this.pasien.full_rm,
          jenis_kelamin : this.pasien.jenis_kelamin,
          no_bpjs : this.pasien.no_bpjs,
          golongan_darah : this.pasien.golongan_darah ? this.pasien.golongan_darah : "",
          nik : this.aes.decrypt(this.pasien.nik,this.keyGen.key,this.keyGen.iv,256),
          no_hp :this.aes.decrypt(this.pasien.no_hp,this.keyGen.key,this.keyGen.iv,256),
          nama_panggilan : this.pasien.nama_panggilan,
          tempat_lahir : this.pasien.tempat_lahir,
          tgl_lahir :new Date(this.aes.decrypt(this.pasien.tgl_lahir,this.keyGen.key,this.keyGen.iv,256)),
          agama : this.pasien.agama ? this.pasien.agama : "",
          status_perkawinan : this.pasien.status_perkawinan ? this.pasien.status_perkawinan : "",
          pekerjaan : this.pasien.pekerjaan ? this.pasien.pekerjaan : "",
          kewarganegaraan : this.pasien.kewarganegaraan ? this.pasien.kewarganegaraan : "",
          nama : this.pasien.nama,
          status_bpjs : this.pasien.status_bpjs ? this.pasien.status_bpjs : "0",
          jenis_alamat : this.pasien.jenis_alamat,
          dial_code: this.pasien.kode_phone!=''?this.pasien.kode_phone:'+62',
          tanggal_daftar:moment(this.pasien.tanggal_daftar).format("DD-MM-YYYY")
        })
        this.tgl_changed=false
        if (this.pasien.alamat !== undefined ) {
          if(typeof this.pasien.alamat.ktp === 'object') {
            this.formTambah.patchValue({
              alamat_ktp : this.pasien.alamat.ktp.alamat ? this.aes.decrypt(this.pasien.alamat.ktp.alamat,this.keyGen.key,this.keyGen.iv,256) : "",
            })
            this.idProvinsiKtp = this.pasien.alamat.ktp.id_province;
            this.listProvinsiKtp = [ { id : this.idProvinsiKtp, name : this.pasien.alamat.ktp.province }]
            this.idKabupatenKtp = this.pasien.alamat.ktp.id_regency
            this.listKabupatenKtp = [ { id: this.idKabupatenKtp, name : this.pasien.alamat.ktp.regency } ]
            this.idKecamatanKtp = this.pasien.alamat.ktp.id_district
            this.listKecamatanKtp = [ { id : this.idKecamatanKtp, name : this.pasien.alamat.ktp.district } ]
            this.idDesaKtp = this.pasien.alamat.ktp.id_village
            this.listDesaKtp = [ { id : this.idDesaKtp, name : this.pasien.alamat.ktp.village } ]
          }
          if(typeof this.pasien.alamat.domisili === 'object') {
            this.formTambah.patchValue({
              alamat_domisili : this.pasien.alamat.domisili.alamat ? this.aes.decrypt(this.pasien.alamat.domisili.alamat,this.keyGen.key,this.keyGen.iv,256) : "",
              isDomisili:true
            })
            this.checkboxAlamatDomisili =true
            this.idProvinsiDomisili = this.pasien.alamat.domisili.id_province
            this.listProvinsiDomisili = [ { id : this.idProvinsiDomisili, name : this.pasien.alamat.domisili.province }]
            this.idKabupatenDomisili = this.pasien.alamat.domisili.id_regency
            this.listKabupatenDomisili = [ { id : this.idKabupatenDomisili, name : this.pasien.alamat.domisili.regency }]
            this.idKecamatanDomisili = this.pasien.alamat.domisili.id_district
            this.listKecamatanDomisili = [ { id : this.idKecamatanDomisili, name : this.pasien.alamat.domisili.district }]
            this.idDesaDomisili = this.pasien.alamat.domisili.id_village
            this.listDesaDomisili = [ { id : this.idDesaDomisili, name : this.pasien.alamat.domisili.village }]
          }

        }
        setTimeout(() => {
          this.spinner.hide('spinner1')
        }, 400);
        
      }
    })
  }
  isNumber(val){
    return this.ValidateService.Number(val)
  }
  setJenis(val){
    if (val=='domisili') {
      this.checkboxAlamatDomisili = true
    } else {
      this.checkboxAlamatDomisili = false
    }
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
  onFocus(id){
    document.getElementById(id).click()
  }
  changeTglLahir(){
    this.tgl_changed=true
  }
  SubmitForm() {
    this.submitted = false
    setTimeout(() => { this.submitted = true }, 200)

    if (this.formTambah.invalid) {
      for (const key of Object.keys(this.formTambah.controls)) {
        if (this.formTambah.controls[key].invalid) {
          const invalidControl = this.el.nativeElement.querySelector('[formcontrolname="' + key + '"]');
          invalidControl.focus()
          break;
        }
      }
      return
    }
    this.spinner.show('spinner1')
    let payload=new PasienPayload;
    
    payload.id_pasien = this.pasien.id_pasien
    payload.no_rm =this.pasien.no_rm
    payload.no_bpjs =  this.formTambah.value.no_bpjs
    payload.status_bpjs = this.formTambah.value.status_bpjs
    payload.no_hp = this.formTambah.value.no_hp.toString().substr(0, 1) == '0' ? this.formTambah.value.no_hp.toString().substr(1, this.formTambah.value.no_hp.length) : this.formTambah.value.no_hp
    payload.no_hp=this.aes.encrypt(payload.no_hp,this.keyGen.key,this.keyGen.iv,256)
    payload.nik = this.aes.encrypt(this.formTambah.value.nik,this.keyGen.key,this.keyGen.iv,256)
    payload.nama = this.formTambah.value.nama
    payload.nama_panggilan = this.formTambah.value.nama_panggilan
    payload.tempat_lahir = this.formTambah.value.tempat_lahir
    payload.tgl_lahir =moment(new Date(this.formTambah.value.tgl_lahir)).format("YYYY-MM-DD")
    payload.tgl_lahir=this.aes.encrypt(payload.tgl_lahir,this.keyGen.key,this.keyGen.iv,256)
    payload.jenis_kelamin = this.formTambah.value.jenis_kelamin
    payload.golongan_darah = this.formTambah.value.golongan_darah
    payload.agama = this.formTambah.value.agama
    payload.status_perkawinan = this.formTambah.value.status_perkawinan
    payload.pekerjaan = this.formTambah.value.pekerjaan
    payload.kewarganegaraan = this.formTambah.value.kewarganegaraan
    payload.jenis_alamat = 'ktp'
    payload.alamat = new Alamat
    payload.alamat.ktp = new AlamatKtp
    payload.alamat.ktp.alamat = this.formTambah.value.alamat_ktp!=''?this.aes.encrypt(this.formTambah.value.alamat_ktp,this.keyGen.key,this.keyGen.iv,256):''
    payload.alamat.ktp.id_pasien_alamat = this.pasien.alamat.ktp.id_pasien_alamat?this.pasien.alamat.ktp.id_pasien_alamat:null
    payload.alamat.ktp.id_province = this.idProvinsiKtp
    payload.alamat.ktp.id_regency = this.idKabupatenKtp
    payload.alamat.ktp.id_district = this.idKecamatanKtp
    payload.alamat.ktp.id_village = this.idDesaKtp
    payload.alamat.ktp.jenis_alamat = 'ktp'
    payload.alamat.ktp.id_pasien = this.pasien.id_pasien
    payload.kode_phone=this.formTambah.value.dial_code
    payload.tanggal_daftar=this.formTambah.value.tanggal_daftar
    if(this.checkboxAlamatDomisili == true) {
      payload.alamat.domisili = new AlamatDomisili
      payload.alamat.domisili.alamat = this.formTambah.value.alamat_domisili!=''?this.aes.encrypt(this.formTambah.value.alamat_domisili,this.keyGen.key,this.keyGen.iv,256):''
      payload.alamat.domisili.id_pasien = this.pasien.id_pasien;
      payload.alamat.domisili.id_pasien_alamat = this.pasien.alamat.domisili.id_pasien_alamat?this.pasien.alamat.domisili.id_pasien_alamat:null;
      payload.alamat.domisili.id_province = this.idProvinsiDomisili
      payload.alamat.domisili.id_regency = this.idKabupatenDomisili
      payload.alamat.domisili.id_district = this.idKecamatanDomisili
      payload.alamat.domisili.id_village = this.idDesaDomisili
      payload.alamat.domisili.jenis_alamat = 'domisili'
      payload.jenis_alamat ='domisili'
    }

    this.store.dispatch( PasienActions.updateInitial({ payload : payload }) )
    setTimeout(() => {
      this.spinner.hide('spinner1')
    }, 400);
  }
  changeCheckboxAlamatDomisili(event : any) {
    if (event.target.checked) {
      this.checkboxAlamatDomisili = true
    } else {
      this.checkboxAlamatDomisili = false
    }
  }
  changeProvinsi(tipe : TipeAlamat) {
    if(tipe == this.tipeAlamat.KTP) {
      this.idKabupatenKtp = null
      this.idKecamatanKtp = null
      this.idDesaKtp = null
      this.listKabupatenKtp,this.listKecamatanKtp,this.listDesaKtp=[]
      this.isLastDes,this.isLastKab,this.isLastKec=false
    } else {
      this.idKabupatenDomisili = null
      this.idKecamatanDomisili = null
      this.idDesaDomisili = null
      this.listKabupatenDomisili,this.listKecamatanDomisili,this.listDesaDomisili=[]
      this.isLastDesDom,this.isLastKabDom,this.isLastKecDom=false
    }
  }
  changeKabupaten(tipe : TipeAlamat) {
    if(tipe == this.tipeAlamat.KTP) {
      this.idKecamatanKtp = null
      this.idDesaKtp = null
      this.listKecamatanKtp,this.listDesaKtp=[]
      this.isLastDes,this.isLastKec=false
    } else {
      this.idKecamatanDomisili = null
      this.idDesaDomisili = null
      this.listKecamatanDomisili,this.listDesaDomisili=[]
      this.isLastDesDom,this.isLastKecDom=false
    }
  }
  changeKecamatan(tipe: TipeAlamat) {
    if(tipe == this.tipeAlamat.KTP) {
      this.idDesaKtp=null
      this.listDesaKtp=[]
      this.isLastDes=false
    } else {
      this.idDesaDomisili = null
      this.listDesaDomisili=[]
      this.isLastDesDom=false
    }
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
            if(aksi=="search")this.listProvinsiKtp=[]
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
      this.paramKabupatenKtp.last_data=0
			this.paramDesaKtp.last_data=0
      this.paramKecamatanKtp.last_data=0
      this.isLastKab=false
      this.isLastKec=false
      this.isLastDes=false
      }else{
      this.isLastKab=true
      }
		}
		if(aksi=="open"||aksi=="clear"){
      this.paramKabupatenKtp.search = ""
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
            if(aksi=="search")this.listKabupatenKtp=[]
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
      this.paramKecamatanKtp.search = ""
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
            if(aksi=="search")this.listKecamatanKtp=[]
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
			this.paramDesaKtp.search = ""
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
            if(aksi=="search")this.listDesaKtp=[]
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
  
  // domisili
  prosesSelectProvinsiDomisili(event : any, aksi : string) {
    if (aksi == 'search')
		{
			this.paramProvinsiDomisili.search= event.term
      if(this.paramProvinsiDomisili.search==""||this.paramProvinsiDomisili.search.length>=3){
			this.listProvinsiDomisili=[]
      this.listKabupatenDomisili=[]
      this.listKecamatanDomisili=[]
      this.listDesaDomisili=[]
			this.paramDesaDomisili.last_data=0
      this.paramKabupatenDomisili.last_data=0
      this.paramKecamatanDomisili.last_data=0
      this.paramProvinsiDomisili.last_data=0
      this.isLastProvDom=false
      this.isLastKabDom=false
      this.isLastKecDom=false
      this.isLastDesDom=false
      }else{
      this.isLastProvDom=true
      }
		}
		if(aksi=="open"||aksi=="clear"){
			this.paramProvinsiDomisili.search = ""
      this.listProvinsiDomisili=[]
      this.listKabupatenDomisili=[]
      this.listKecamatanDomisili=[]
      this.listDesaDomisili=[]
			this.paramDesaDomisili.last_data=0
      this.paramKabupatenDomisili.last_data=0
      this.paramKecamatanDomisili.last_data=0
      this.paramProvinsiDomisili.last_data=0
      this.isLastProvDom=false
      this.isLastKabDom=false
      this.isLastKecDom=false
      this.isLastDesDom=false
    }
		if(aksi=="last_page"){
      if(!this.isLastProvDom){
        this.paramProvinsiDomisili.last_data += 10
      }
			
		}
    if(!this.isLastProvDom){
      this.wilayahService.getProvinsiSelectOption(this.paramProvinsiDomisili)
      .subscribe(succ => {
        if(succ.response.length>0){
          if(succ.response.length<10)
          {
            if(aksi=="search")this.listProvinsiDomisili=[]
            succ.response.map(val=>{
              let i=this.listProvinsiDomisili.findIndex(x=>x.id==val.id)
							if(i==-1)
              this.listProvinsiDomisili.push(val)
            })
            this.isLastProvDom=true
          }
          else{
            succ.response.map(val=>{
              let i=this.listProvinsiDomisili.findIndex(x=>x.id==val.id)
							if(i==-1)
              this.listProvinsiDomisili.push(val)
            })
          }
        }else{
          this.isLastProvDom=true
        }
      })
    }
    
  }
  prosesSelectKabupatenDomisili(event : any, aksi : string) {
    if (aksi == 'search')
		{
			this.paramKabupatenDomisili.search = event.term
      if(this.paramKabupatenDomisili.search==""||this.paramKabupatenDomisili.search.length>=3){
			this.listKabupatenDomisili=[]
      this.listKecamatanDomisili=[]
      this.listDesaDomisili=[]
			this.paramDesaDomisili.last_data=0
      this.paramKecamatanDomisili.last_data=0
      this.paramKabupatenDomisili.last_data=0
      this.isLastKabDom=false
      this.isLastKecDom=false
      this.isLastDesDom=false
      }else{
      this.isLastKabDom=true
      }
		}
		if(aksi=="open"||aksi=="clear"){
			this.paramKabupatenDomisili.search = ""
      this.listKabupatenDomisili=[]
      this.listKecamatanDomisili=[]
      this.listDesaDomisili=[]
			this.paramDesaDomisili.last_data=0
      this.paramKecamatanDomisili.last_data=0
      this.paramKabupatenDomisili.last_data=0
      this.isLastKabDom=false
      this.isLastKecDom=false
      this.isLastDesDom=false
    }
		if(aksi=="last_page"){
      if(!this.isLastKabDom){
        this.paramKabupatenDomisili.last_data += 10
      }
			
		}
    if(!this.isLastKabDom){
      this.wilayahService.getKabupatenSelectOption(this.paramKabupatenDomisili,this.idProvinsiDomisili)
      .subscribe(succ => {
        if(succ.response.length>0){
          if(succ.response.length<10)
          {
            if(aksi=="search")this.listKabupatenDomisili=[]
            succ.response.map(val=>{
              let i=this.listKabupatenDomisili.findIndex(x=>x.id==val.id)
							if(i==-1)
              this.listKabupatenDomisili.push(val)
            })
            this.isLastKabDom=true
          }
          else{
            succ.response.map(val=>{
              let i=this.listKabupatenDomisili.findIndex(x=>x.id==val.id)
							if(i==-1)
              this.listKabupatenDomisili.push(val)
            })
          }
        }else{
          this.isLastKabDom=true
        }
      })
    }
    
  }
  prosesSelectKecamatanDomisili(event : any, aksi : string) {
    if (aksi == 'search')
		{
			this.paramKecamatanDomisili.search = event.term
      if(this.paramKecamatanDomisili.search==""||this.paramKecamatanDomisili.search.length>=3){
			this.listKecamatanDomisili=[]
      this.listDesaDomisili=[]
			this.paramDesaDomisili.last_data=0
      this.paramKecamatanDomisili.last_data=0
      this.isLastKecDom=false
      this.isLastDesDom=false
      }else{
      this.isLastKecDom=true
      }
		}
		if(aksi=="open"||aksi=="clear"){
			this.paramKecamatanDomisili.search = ""
      this.listKecamatanDomisili=[]
      this.listDesaDomisili=[]
			this.paramDesaDomisili.last_data=0
      this.paramKecamatanDomisili.last_data=0
      this.isLastKecDom=false
      this.isLastDesDom=false
    }
		if(aksi=="last_page"){
      if(!this.isLastKecDom){
        this.paramKecamatanDomisili.last_data += 10
      }
			
		}
    if(!this.isLastKecDom){
      this.wilayahService.getKecamatanSelectOption(this.paramKecamatanDomisili,this.idKabupatenDomisili)
      .subscribe(succ => {
        if(succ.response.length>0){
          if(succ.response.length<10)
          {
            if(aksi=="search")this.listKecamatanDomisili=[]
            succ.response.map(val=>{
              let i=this.listKecamatanDomisili.findIndex(x=>x.id==val.id)
							if(i==-1)
              this.listKecamatanDomisili.push(val)
            })
            this.isLastKecDom=true
          }
          else{
            succ.response.map(val=>{
              let i=this.listKecamatanDomisili.findIndex(x=>x.id==val.id)
							if(i==-1)
              this.listKecamatanDomisili.push(val)
            })
          }
        }else{
          this.isLastKecDom=true
        }
      })
    }
    
  }
  prosesSelectDesaDomisili(event : any, aksi : string) {
    if (aksi == 'search')
		{
			this.paramDesaDomisili.search = event.term
      if(this.paramDesaDomisili.search==""||this.paramDesaDomisili.search.length>=3){
			this.listDesaDomisili=[]
			this.paramDesaDomisili.last_data=0
      this.isLastDesDom=false
      }else{
      this.isLastDesDom=true
      }
		}
		if(aksi=="open"||aksi=="clear"){
			this.paramDesaDomisili.search = ""
      this.listDesaDomisili=[]
			this.paramDesaDomisili.last_data=0
      this.isLastDesDom=false
    }
		if(aksi=="last_page"){
      if(!this.isLastDes){
        this.paramDesaDomisili.last_data += 10
      }
			
		}
    if(!this.isLastDesDom){
      this.wilayahService.getDesaSelectOption(this.paramDesaDomisili,this.idKecamatanDomisili)
      .subscribe(succ => {
        if(succ.response.length>0){
          if(succ.response.length<10)
          {
            if(aksi=="search")this.listDesaDomisili=[]
            succ.response.map(val=>{
              let i=this.listDesaDomisili.findIndex(x=>x.id==val.id)
							if(i==-1)
              this.listDesaDomisili.push(val)
            })
            this.isLastDesDom=true
          }
          else{
            succ.response.map(val=>{
              let i=this.listDesaDomisili.findIndex(x=>x.id==val.id)
							if(i==-1)
              this.listDesaDomisili.push(val)
            })
          }
        }else{
          this.isLastDesDom=true
        }
      })
    }
    
  }

}

