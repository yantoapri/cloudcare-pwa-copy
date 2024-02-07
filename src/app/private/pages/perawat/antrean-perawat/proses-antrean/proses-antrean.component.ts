import { Component, OnInit, ElementRef } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormBuilder, FormGroup,  Validators,FormArray } from "@angular/forms";
import { ProsesAntreanPerawatPayload } from "src/app/private/models/class-payload-api/perawat/proses-antrean-perawat-payload";
import * as fromApp from 'src/app/private/states/private-app.states'
import { Observable } from 'rxjs'
import { Store } from '@ngrx/store';
import * as ProsesAntreanPerawatActions from 'src/app/private/states/perawat/proses-antrean-perawat/proses-antrean-perawat.actions'
import { AntreanPerawatService } from 'src/app/private/services/perawat/antrean-perawat.service';
import { NgxSpinnerService } from "ngx-spinner";
import Swal from 'sweetalert2/dist/sweetalert2.js'
import {ValidateService} from 'src/app/private/services/validate/validateService'
import { TindakanMedisUmumService } from 'src/app/private/services/master-data/tindakan/tindakan-medis-umum.service';
@Component({
  selector: 'app-proses-antrean',
  templateUrl: './proses-antrean.component.html',
  styleUrls: ['./proses-antrean.component.sass']
})
export class ProsesAntreanComponent implements OnInit {

  tabPane : any = {
    pane1: true,
    pane2: false,
    pane3: false,
  }
  getState: Observable<any>;
  type_poli : string = ''
  poli_name : string = ''
  prosesAntrean : ProsesAntreanPerawatPayload = new ProsesAntreanPerawatPayload
  formTambah: FormGroup;
  submitted : boolean = false
  isLoadingButton : boolean
  errorMessage : any | null
  submitButton : boolean
  idAntrean : string
  time_input=null
  time=false
  listTindakanMedis: Array<any> = []
  idTindakanMedis:any
  loadingTindakanMedis=false
  paramTindakanMedis = { last_data: 0, get_data: 10, search: "" }
  isLastMedis=false
  constructor(
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private router : Router,
    private el : ElementRef,
    private validate:ValidateService,
    private spinner : NgxSpinnerService,
    private tindakanMedisUmumService: TindakanMedisUmumService,
    private store : Store<fromApp.PrivateAppState>,
    private antreanPerawatService : AntreanPerawatService
  ) {
    this.getState = this.store.select('perawat_prosesAntreanPerawat')
  }

  ngOnInit(): void {
    this.store.dispatch( ProsesAntreanPerawatActions.clearData() )
    this.activatedRoute.params.subscribe((params: Params) => {
      if (params) {
        this.type_poli = params.kode
        this.idAntrean = params.id
        this.poli_name = 'Poli ' + this.capitalizeFirstLetter(params.kode)
      }
    })
    
    this.getState.subscribe((state) => {
      this.prosesAntrean = state.prosesAntrean
      this.errorMessage = state.errorMessage
      this.submitButton = state.submitButton
      this.isLoadingButton = state.isLoadingButton
    })
    this.formTambah = this.fb.group({
      // id_tindakan_perawat
      // id_antrian
      nama_pasien : ["", []],
      catatan_khusus : ["", [] ],
      alergi : ["", [] ],
      hambatan : ["", [] ],
      keluhan : ["", [Validators.required] ],
      sistole : ["", [] ],
      diastole : ["", [] ],
      tindakan_medis: this.fb.array([]),
      // pxfisik
      suhu : ["", []],
      hr : ["", []],
      status_hr : ["teratur", []],
      rr : ["", []],
      keterangan_rr : ["", []],
      tb : ["", []],
      bb : ["", []]
    })
    this.loadNamaPasien()
  }
  addTindakanMedis() {
		if (this.idTindakanMedis != "") {
			let idxTindakan = this.listTindakanMedis.findIndex((el, index) => {
				return el.id_tindakan_medis == this.idTindakanMedis
			})
			if (idxTindakan >= 0) {
				let find = this.listTindakanMedis[idxTindakan]

				let have = this.formTambah.controls.tindakan_medis.value.findIndex((el, index) => {
					return el.id_tindakan_medis == find.id_tindakan_medis
				})

				if (have >= 0) {
					Swal.fire("Warning","sepertinya anda sudah menambahkan data ini",'warning')
				} else {
					let control = <FormArray>this.formTambah.controls.tindakan_medis;
					control.push(
						this.fb.group({
							id_tindakan_medis: [find.id_tindakan_medis],
							nama_tindakan: [find.nama_tindakan],
							keterangan: [""],
							id_akun_pelaksana: [""]
						})
					)
					this.idTindakanMedis=null
				}
			}
		}
	}

  prosesSelectTindakanMedis(event: any, aksi: string) {
		
		let param = this.paramTindakanMedis
    
		if (aksi == 'search')
		{
      this.paramTindakanMedis.search = event.term
      if(this.paramTindakanMedis.search==""||this.paramTindakanMedis.search.length>=3){
			this.listTindakanMedis=[]
			this.paramTindakanMedis.last_data=0
      this.isLastMedis=false
      }else{
      this.isLastMedis=true
      }
		}
    if(aksi=="open"||aksi=="clear"){
      this.listTindakanMedis=[]
			this.paramTindakanMedis.last_data=0
      this.isLastMedis=false
      this.paramTindakanMedis.search = ""
    }
		if(aksi=="last_page"){
			if(!this.isLastMedis)
			this.paramTindakanMedis.last_data+=10
		}
    if(!this.isLastMedis){
      this.loadingTindakanMedis = true
		  this.tindakanMedisUmumService.prosesSelectOption(param, aksi)
			.subscribe(resp => {
				
				if(resp){
					if(resp.response.length==0){
						this.isLastMedis=true
					}else{
						if(resp.response.length<10){
              if(aksi=="search")this.listTindakanMedis=[]
              resp.response.map(val=>{
                let index=this.listTindakanMedis.findIndex(x=>x.id_tindakan_medis==val.id_tindakan_medis)
								if(index==-1)
                this.listTindakanMedis.push(val)
              })
              this.isLastMedis=true
            }else{
              resp.response.map(val=>{
                let index=this.listTindakanMedis.findIndex(x=>x.id_tindakan_medis==val.id_tindakan_medis)
								if(index==-1)
                this.listTindakanMedis.push(val)
              })
            }
					}
				}
        this.loadingTindakanMedis = false
			})
    }
	}
  setJson(val){
    return JSON.stringify(val)
  }
  setTime(){
    if(!this.time){
      this.time=true
      this.time_input=new Date().getTime()
    }
  }
  isNumber(e){
     return this.validate.Number(e) 
  }
  capitalizeFirstLetter(string : string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  loadNamaPasien() {
    if(this.idAntrean != "") {
      this.antreanPerawatService.getByIdAntreanPasien(this.idAntrean)
      .subscribe(succ => {
        this.formTambah.patchValue({ nama_pasien : succ.response.nama })
      })
    }
  }
  hapusTindakanMedis(i: number) {
		const fa = this.formTambah.get('tindakan_medis') as FormArray;
		fa.removeAt(i);
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
    let payload = new ProsesAntreanPerawatPayload
    // payload.id_tindakan_perawat
    payload.id_antrian = this.idAntrean
    payload.tindakan_medis=this.formTambah.value.tindakan_medis
    payload.catatan_khusus = this.formTambah.value.catatan_khusus
    payload.alergi = this.formTambah.value.alergi
    payload.hambatan = this.formTambah.value.hambatan
    payload.keluhan = this.formTambah.value.keluhan
    payload.sistole = this.formTambah.value.sistole
    payload.diastole = this.formTambah.value.diastole
    // payload.pxfisik
    payload.suhu = this.formTambah.value.suhu
    payload.hr = this.formTambah.value.hr
    payload.status_hr = this.formTambah.value.status_hr
    payload.rr = this.formTambah.value.rr
    payload.keterangan_rr = this.formTambah.value.keterangan_rr
    payload.tb = this.formTambah.value.tb
    payload.bb = this.formTambah.value.bb
    payload.time_input=this.time_input
    this.store.dispatch( ProsesAntreanPerawatActions.addInitial({ payload : payload, kode_poli : this.type_poli }) )
    setTimeout(() => {
      this.spinner.hide('spinner1')
    }, 400);
    // console.log(this.formTambah.value)
  }
  buttonKembali() {
    this.router.navigate(['perawat', 'antrean-perawat', this.type_poli, 'view'])
  }
  ShowTabPane(nomor : number) {
    if (nomor == 1) {
      this.tabPane.pane1 = true
      this.tabPane.pane2 = false
      this.tabPane.pane3 = false
    } else if (nomor == 2) {
      this.tabPane.pane1 = false
      this.tabPane.pane2 = true
      this.tabPane.pane3 = false
    }
  }

}
