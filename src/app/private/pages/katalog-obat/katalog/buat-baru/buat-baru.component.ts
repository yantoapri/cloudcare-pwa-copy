import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from "@angular/forms";
import { ModalService } from 'src/app/shared/_modal';
import { DataObatPayload } from 'src/app/private/models/class-payload-api/master-data/data-obat-payload';
import { Observable } from 'rxjs'
import { Store } from '@ngrx/store';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import * as fromApp from 'src/app/private/states/private-app.states'
import * as DataObatActions from 'src/app/private/states/master-data/data-obat/data-obat.actions'
import { NgxSpinnerService } from "ngx-spinner";
import {ValidateService} from 'src/app/private/services/validate/validateService'
import {MoneyService} from 'src/app/private/services/money/index'
export interface Kemasan {
  nama_kemasan : string | null | undefined
  nama_kemasan_singkatan : string | null | undefined
  target_kemasan : string | null | undefined
  target_qty : string | null | undefined
  kemasan_level : string | null | undefined
}
@Component({
  selector: 'app-buat-baru',
  templateUrl: './buat-baru.component.html',
  styleUrls: ['./buat-baru.component.sass']
})
export class BuatBaruComponent implements OnInit {
 
  formInput: FormGroup;
  formKemasan: FormGroup;
  submitted : boolean = false
  submittedKemasan : boolean = false
  aksiModalKemasan: string
  indexListKemasan : number
  formKemasanTitle : string
  dataObatPayload : DataObatPayload = new DataObatPayload
  batchRequire=false
  isEdit : boolean
  isLoadingButton : boolean
  reloadTable : boolean
  errorMessage : any | null
  submitButton : boolean
  getState: Observable<any>;
  listBatch=[]
  constructor(
    private fb : FormBuilder,
    private spinner : NgxSpinnerService,
    private validate:ValidateService,
    private modalService : ModalService,
    private store : Store<fromApp.PrivateAppState>,
    private money:MoneyService,
  ) {
    this.getState = this.store.select('masterData_dataObat')
  }
  optionsCur =this.money.currency()

  add=false
  ngOnInit(): void {

    this.getState.subscribe((state) => {
      this.dataObatPayload = state.dataObatPayload
      this.errorMessage = state.errorMessage
      this.submitButton = state.submitButton
      this.isLoadingButton = state.isLoadingButton
      if(this.errorMessage!=null){
        let msg=''
        this.errorMessage.response.map(val=>{
          msg+=val.field+' '+val.message+'\n'
        })
        Swal.fire('Error',msg,'error')
      }
    })

    this.formInput = this.fb.group({
      nama_barang: [null, [Validators.required]],
      satuan_terkecil : [null, [Validators.required]],
      singkatan : [null, [Validators.required]],
      komposisi : "",
      stok :"0",
      harga_jual :"0",
      harga_beli : "0",
      listBatch:this.fb.array([]),
      kemasan: this.fb.array([]),
      expired_date:null,
      no_sertifikat:null,
    });

    this.formKemasan = this.fb.group({
      nama : [null, [Validators.required]],
      isi : [null, [Validators.required]],
      singkatan: [null, [Validators.required]],
      satuan : []
    })


  }
 
  isNumber(e){
    return this.validate.Number(e)
  }
  onFocus(id){
    document.getElementById(id).click()
  }
  setBatch(i,key,val){
    this.listBatch[i][key]=val.target.value
  }
  addBatch(){
    let control = <FormArray>this.formInput.controls.listBatch;
		control.push(
				this.fb.group({'stok_awal':0,'ed_batch':'',
        'no_batch':'','harga_beli':0})
		)
  }
  removeBatch(i){
    let index = this.formInput.get('listBatch') as FormArray
		index.removeAt(i)
  }
  submitInput() {
    this.submitted = false
    setTimeout(() => {
      this.submitted = true
    }, 300);
    if(this.formInput.invalid) {
      return
    }
    
    let input = this.formInput.value
    let kemasan = this.formKemasan.value
    let detailKemasan = []
    let payload = new DataObatPayload
    let batch=[]
    payload.stok=0
    let harga_beli=0
    input.listBatch.map((val)=>{
      if(val.no_batch==''||val.ed_batch==''||val.stok_awal<=0||val.harga_beli<=0){
        return
      }else{
        batch.push(
          {
              "no_batch": val.no_batch,
              "tanggal_ed": new Date(val.ed_batch).getTime(),
              "stok_batch": val.stok_awal,
              "harga_beli": val.harga_beli
          }
        )
        harga_beli+=Number(val.harga_beli)
        payload.stok+=val.stok_awal
      }
     
      
    })
    this.spinner.show('spinner1')
    detailKemasan.push({
      nama_kemasan : input.satuan_terkecil,
      nama_kemasan_singkatan : input.singkatan,
      target_kemasan : input.singkatan,
      target_qty : 1,
      kemasan_level : 1
    })
    let i=1
    input.kemasan.forEach((el) => {
      detailKemasan.push({
        nama_kemasan: el.nama,
        nama_kemasan_singkatan : el.singkatan,
        target_kemasan : el.satuan,
        target_qty: el.isi,
        kemasan_level : i + 1
      })
      i++;
    });

    payload.nama_obat = input.nama_barang
    payload.komposisi = input.komopsisi
    payload.kemasan_terkecil=input.satuan_terkecil
    payload.kemasan_terkecil_singkatan=input.singkatan
    payload.komposisi = input.komposisi
    payload.harga_jual=input.harga_jual
    payload.harga_beli=harga_beli
    payload.obat_kemasan = detailKemasan
    payload.expired_date=input.expired_date
    payload.no_sertifikat=input.no_sertifikat
    payload.batch=batch
    this.store.dispatch( DataObatActions.addInitial({ payload : payload }) )
    setTimeout(() => {
      this.spinner.hide('spinner1')
    }, 600);
    // console.log({ input : input, kemasan : kemasan, detailKemasan : detailKemasan})

  }
  ambilSingkatan(value : any, jenis : string){

    let get = value.substr(0, 3)
    if (jenis == 'parent') {
      this.formInput.patchValue({singkatan : get})
    } else {
      this.formKemasan.patchValue({singkatan : get})
    }

  }

  submitKemasan() {
      this.submittedKemasan = false
      setTimeout(() => {
        this.submittedKemasan = true
      }, 300)
      if (this.formKemasan.invalid) {
        return false
      }
      if(this.aksiModalKemasan == 'add') {
        let i=this.formInput.value.kemasan.length>0?this.formInput.value.kemasan.findIndex(x=>x.nama==this.formKemasan.value.nama):-1
        if(i<0&&this.formInput.value.satuan_terkecil!=this.formKemasan.value.nama){
          this.insertKemasanToAray()
        }else{
          Swal.fire("Error","Duplicated data",'error')
        }
      } else {
        this.updateKemasanArray()
      }
    
  }

  insertKemasanToAray() {
    let control = <FormArray>this.formInput.controls.kemasan;
    control.push(
      this.fb.group({
        nama: this.formKemasan.value.nama,
        isi : this.formKemasan.value.isi,
        singkatan : this.formKemasan.value.singkatan,
        satuan : this.formKemasan.value.satuan,
      })
    )
    this.closeBtnTambahKemasan()
  }
  updateKemasanArray() {
    let index = this.indexListKemasan;
    // this.hapusListKemasaan(index);
    let err=false
    this.formInput.value.kemasan.map((val,i)=>{
      if(val.nama==this.formKemasan.value.nama&&i!=index){
        err=true
      }
    })
    if(err){
      Swal.fire("Error","Duplicated data",'error')
    }else{
      (<FormArray>this.formInput.controls['kemasan']).at(index).patchValue({

        nama: this.formKemasan.value.nama,
        isi : this.formKemasan.value.isi,
        singkatan : this.formKemasan.value.singkatan,
        satuan : this.formKemasan.value.satuan,

      });
      this.closeBtnTambahKemasan()
    }
    // this.insertKemasanToAray()
  }

  hapusListKemasaan(i: number) {
    const fa = this.formInput.get('kemasan') as FormArray;
    fa.removeAt(i);
  }

  editListKemasan(i : number) {
    let fa = this.formInput.value.kemasan[i]
    this.formKemasanTitle = 'Edit kemasan'
    this.indexListKemasan = i
    this.aksiModalKemasan = 'update'
    this.formKemasan.reset()
    this.formKemasan.patchValue({
      nama: fa.nama,
      isi : fa.isi,
      singkatan : fa.singkatan,
      satuan : fa.satuan
    })
    this.submittedKemasan=false
    this.modalService.open("modalFormContent");
  }

  btnTambahKemasan() {
    this.submitted = false
    setTimeout(() => {
      this.submitted = true
    }, 300);
    if(this.formInput.invalid) {
      return
    }
      this.formKemasanTitle = 'Tambah kemasan'
      this.submittedKemasan = false
      this.formKemasan.reset()
      this.formKemasan.patchValue({
        satuan : this.formInput.value.singkatan
      })
      this.aksiModalKemasan = 'add'
      this.submittedKemasan=false
      this.modalService.open("modalFormContent");
  }

  closeBtnTambahKemasan() {
    this.modalService.close("modalFormContent");
  }

}
