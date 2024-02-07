import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from "@angular/forms";
import { ModalService } from 'src/app/shared/_modal';
import { AlatKesehatanPayload } from 'src/app/private/models/class-payload-api/alat-kesehatan/alat-kesehatan-payload';
import { Observable } from 'rxjs'
import { Store } from '@ngrx/store';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import * as fromApp from 'src/app/private/states/private-app.states'
import * as AlatKesehatanActions from 'src/app/private/states/alat-kesehatan/alat-kesehatan.action'
import { NgxSpinnerService } from "ngx-spinner";
import {MoneyService} from 'src/app/private/services/money/index'
import {ValidateService} from 'src/app/private/services/validate/validateService'
export interface Kemasan {
  nama_kemasan: string | null | undefined
  nama_kemasan_singkatan: string | null | undefined
  target_kemasan: string | null | undefined
  target_qty: number
  kemasan_level: number
}
@Component({
  selector: 'app-buat-baru',
  templateUrl: './buat-baru.component.html',
  styleUrls: ['./buat-baru.component.sass']
})
export class BuatBaruComponent implements OnInit {
  formInput: FormGroup;
  formKemasan: FormGroup;
  submitted: boolean = false
  submittedKemasan: boolean = false
  aksiModalKemasan: string
  indexListKemasan: number
  formKemasanTitle: string
  AlatKesehatanPayload: AlatKesehatanPayload = new AlatKesehatanPayload
  batchRequire=false
  isEdit: boolean
  isLoadingButton: boolean
  reloadTable: boolean
  errorMessage: any | null
  submitButton: boolean
  getState: Observable<any>;
  listBatch=[]
  add=false
  constructor(
    private fb: FormBuilder,
    private modalService: ModalService,
    private spinner : NgxSpinnerService,
    private money:MoneyService,
    private validate:ValidateService,
    private store: Store<fromApp.PrivateAppState>
  ) {
    this.getState = this.store.select('alat_kesehatan')
  }
  optionsCur =this.money.currency()
  ngOnInit(): void {

    this.getState.subscribe((state) => {
      this.AlatKesehatanPayload = state.AlatKesehatan
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
      nama_alat_kesehatan: [null, [Validators.required]],
      kemasan_terkecil: [null, [Validators.required]],
      kemasan_terkecil_singkatan: [null, [Validators.required]],
      komposisi: "",
      stok: "",
      harga_jual: 0,
      harga_beli:"",
      listBatch:this.fb.array([]),
      alat_kesehatan_kemasan: this.fb.array([]),
    });
    this.formKemasan = this.fb.group({
      nama_kemasan: [null, [Validators.required]],
      nama_kemasan_singkatan: [null, [Validators.required]],
      target_kemasan: [null, [Validators.required]],
      target_qty: [null, [Validators.required]],
    })


  }
  onFocus(id){
    document.getElementById(id).click()
  }
  setBatch(i,key,val){
    this.listBatch[i][key]=val.target.value
  }
  isNumber(e){
    return this.validate.Number(e)
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
    if (this.formInput.invalid) {
      return
    }
    this.spinner.show('spinner1')
    let input = this.formInput.value
    let detailKemasan = []
    let index = 1;
    let payload=new AlatKesehatanPayload
    payload.stok=0
    let harga_beli=0
    let batch=[]
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
    detailKemasan.push({
      nama_kemasan: input.kemasan_terkecil,
      nama_kemasan_singkatan: input.kemasan_terkecil_singkatan,
      target_kemasan: input.kemasan_terkecil_singkatan,
      target_qty: 1,
      kemasan_level: index
    })
    let i=1
    input.alat_kesehatan_kemasan.forEach((el, index) => {
      detailKemasan.push({
        nama_kemasan: el.nama_kemasan,
        nama_kemasan_singkatan: el.nama_kemasan_singkatan,
        target_kemasan: el.target_kemasan,
        target_qty: el.target_qty,
        kemasan_level: i+1
      })
      i++
    });
   
    payload.harga_beli=harga_beli
    payload.nama_alat_kesehatan = input.nama_alat_kesehatan
    payload.kemasan_terkecil = input.kemasan_terkecil
    payload.kemasan_terkecil_singkatan = input.kemasan_terkecil_singkatan
    payload.komposisi = input.komposisi
    payload.harga_jual=input.harga_jual
    payload.alat_kesehatan_kemasan = detailKemasan
    
    
    
    payload.batch=batch
    this.store.dispatch(AlatKesehatanActions.addInitial({ payload: payload }))
    // console.log({ input : input, kemasan : kemasan, detailKemasan : detailKemasan})
    setTimeout(() => {
      this.spinner.hide('spinner1')
    }, 400);
  }
  ambilSingkatan(value: any, jenis: string) {

    let get = value.substr(0, 3)
    if (jenis == 'parent') {
      this.formInput.patchValue({ kemasan_terkecil_singkatan: get })
    } else {
      this.formKemasan.patchValue({ nama_kemasan_singkatan: get })
    }

  }

  submitKemasan() {

    
      this.submittedKemasan = false
      setTimeout(() => {
        this.submittedKemasan = true
      }, 300)
      if (this.formKemasan.invalid) {
        return
      }
      if (this.aksiModalKemasan == 'add') {
        let i=this.formInput.value.alat_kesehatan_kemasan.length>0?this.formInput.value.alat_kesehatan_kemasan.findIndex(x=>x.nama_kemasan==this.formInput.value.satuan_terkecil):-1
        if(i<0&&this.formInput.value.kemasan_terkecil!=this.formKemasan.value.nama){
          this.insertKemasanToAray()
        }else{
          Swal.fire("Error","Duplicated data",'error')
        }
      } else {
        this.updateKemasanArray()
      }
    
  }

  insertKemasanToAray() {
    let control = <FormArray>this.formInput.controls.alat_kesehatan_kemasan;
    control.push(
      this.fb.group({
        nama_kemasan: this.formKemasan.value.nama_kemasan,
        target_qty: this.formKemasan.value.target_qty,
        nama_kemasan_singkatan: this.formKemasan.value.nama_kemasan_singkatan,
        target_kemasan: this.formKemasan.value.target_kemasan,
      })
    )
    this.closeBtnTambahKemasan()
  }
  updateKemasanArray() {
    let index = this.indexListKemasan;
    // this.hapusListKemasaan(index);
    let err=false
    this.formInput.value.alat_kesehatan_kemasan.map((val,i)=>{
      if(val.nama_kemasan==this.formKemasan.value.nama_kemasan&&i!=index){
        err=true
      }
    })
    if(err){
      Swal.fire("Error","Duplicated data",'error')
    }else{
      (<FormArray>this.formInput.controls['alat_kesehatan_kemasan']).at(index).patchValue({

        nama_kemasan: this.formKemasan.value.nama_kemasan,
        target_qty: this.formKemasan.value.target_qty,
        nama_kemasan_singkatan: this.formKemasan.value.nama_kemasan_singkatan,
        target_kemasan: this.formKemasan.value.target_kemasan,

      });
      this.closeBtnTambahKemasan()
      // this.insertKemasanToAray()
    }
  }

  hapusListKemasaan(i: number) {
    const fa = this.formInput.get('alat_kesehatan_kemasan') as FormArray;
    fa.removeAt(i);
  }

  editListKemasan(i: number) {
    let fa = this.formInput.value.alat_kesehatan_kemasan[i]
    this.formKemasanTitle = 'Edit kemasan'
    this.indexListKemasan = i
    this.aksiModalKemasan = 'update'
    this.formKemasan.reset()
    this.formKemasan.patchValue({
      nama_kemasan: fa.nama_kemasan,
      target_qty: fa.target_qty,
      nama_kemasan_singkatan: fa.nama_kemasan_singkatan,
      target_kemasan: fa.target_kemasan,
    })
    this.submittedKemasan=false
    this.modalService.open("modalFormContent");
  }

  btnTambahKemasan() {
    this.submitted = false
    setTimeout(() => {
      this.submitted = true
    }, 300);
    if (this.formInput.invalid) {
      return
    }
  
    this.formKemasanTitle = 'Tambah kemasan'
    this.submittedKemasan = false
    this.formKemasan.reset()
    this.formKemasan.patchValue({
      target_kemasan: this.formInput.value.kemasan_terkecil_singkatan
    })
    this.aksiModalKemasan = 'add'
    this.submittedKemasan=false
    this.modalService.open("modalFormContent");
  }

  closeBtnTambahKemasan() {
    this.modalService.close("modalFormContent");
  }

}
