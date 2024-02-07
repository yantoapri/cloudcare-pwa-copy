import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from "@angular/forms";
import { ModalService } from 'src/app/shared/_modal';
import { Observable } from 'rxjs'
import { ActivatedRoute, Params } from '@angular/router';
import { AlatKesehatanPayload } from 'src/app/private/models/class-payload-api/alat-kesehatan/alat-kesehatan-payload';
import { Store } from '@ngrx/store';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import { Router } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";
import {ValidateService} from 'src/app/private/services/validate/validateService'
import * as fromApp from 'src/app/private/states/private-app.states'
import * as AlatKesehatanActions from 'src/app/private/states/alat-kesehatan/alat-kesehatan.action'
import {MoneyService} from 'src/app/private/services/money/index'
@Component({
  selector: 'app-edit-buat-baru',
  templateUrl: './edit-buat-baru.component.html',
  styleUrls: ['./edit-buat-baru.component.sass']
})
export class EditBuatBaruComponent implements OnInit {

  formInput: FormGroup;
  formKemasan: FormGroup;
  submitted: boolean = false
  submittedKemasan: boolean = false
  aksiModalKemasan: string
  indexListKemasan: number
  formKemasanTitle: string
  listBatch=[]
  AlatKesehatan: AlatKesehatanPayload = new AlatKesehatanPayload

  isEdit: boolean
  isLoadingButton: boolean
  reloadTable: boolean
  errorMessage: any | null
  submitButton: boolean
  getState: Observable<any>;

  constructor(
    private fb: FormBuilder,
    private validate:ValidateService,
    private spinner : NgxSpinnerService,
    private modalService: ModalService,
    private router: Router,
    private store: Store<fromApp.PrivateAppState>,
    private activatedRoute: ActivatedRoute,
    private money:MoneyService
  ) {
    this.getState = this.store.select('alat_kesehatan')
  }
  optionsCur =this.money.currency()
  lastPage=''
  last=''
  id=''
  ngOnInit(): void {

    this.activatedRoute.params.subscribe((params: Params) => {
      if (params) {
        this.spinner.show('spinner1')
        this.lastPage=params.page
        this.id=params.id
        
        this.store.dispatch(AlatKesehatanActions.getByIdInitial({ payload: { id: params.id } }))
      }
    })

    this.getState.subscribe((state) => {
      this.AlatKesehatan = state.AlatKesehatan
      this.errorMessage = state.errorMessage 
      this.submitButton = state.submitButton
      this.isLoadingButton = state.isLoadingButton
      this.isEdit = state.isEdit
      if(this.AlatKesehatan.nama_alat_kesehatan!=undefined){
        if( this.AlatKesehatan.alat_kesehatan_kemasan.length>0){
          let control = <FormArray>this.formInput.controls.kemasan;
          this.AlatKesehatan.alat_kesehatan_kemasan.map(val=>{
            control.push(
              this.fb.group({
                nama: val.nama_kemasan,
                isi: val.target_qty,
                singkatan: val.nama_kemasan_singkatan,
                satuan: val.nama_kemasan,
                kemasan_leverl:val.kemasan_level
              })
            )
          })
        }
       
      }
      if (this.isEdit === true) {

        if (this.AlatKesehatan) {
          let find = this.AlatKesehatan.alat_kesehatan_kemasan.findIndex((x) => {
            return x.kemasan_level == 1
          })
          if (find >= 0) {
            this.formInput.patchValue({
              satuan_terkecil: this.AlatKesehatan.kemasan_terkecil,
              singkatan: this.AlatKesehatan.kemasan_terkecil_singkatan,
              
              // this.AlatKesehatan.alat_kesehatan_kemasan[find].target_qty
            })
          }
          let control = <FormArray>this.formInput.controls.kemasan;
          control.clear()
          let totalLength = this.AlatKesehatan.alat_kesehatan_kemasan.length
          for (let index = 0; index < totalLength; index++) {
            
            control.push(
              this.fb.group({
                id_alat_kesehatan_kemasan:this.AlatKesehatan.alat_kesehatan_kemasan[index]?.id_alat_kesehatan_kemasan,
                nama: this.AlatKesehatan.alat_kesehatan_kemasan[index]?.nama_kemasan,
                isi: this.AlatKesehatan.alat_kesehatan_kemasan[index]?.target_qty,
                singkatan: this.AlatKesehatan.alat_kesehatan_kemasan[index]?.nama_kemasan_singkatan,
                satuan: this.AlatKesehatan.alat_kesehatan_kemasan[index]?.target_kemasan,
                kemasan_level:this.AlatKesehatan.alat_kesehatan_kemasan[index]?.kemasan_level
              })
            )
          }
        }
        this.formInput.patchValue({
          nama_barang: this.AlatKesehatan.nama_alat_kesehatan,
          stok:this.AlatKesehatan.stok,
          komposisi:this.AlatKesehatan.komposisi,
          harga_jual:this.AlatKesehatan.harga_jual,
        })
        this.last=this.lastPage==undefined?'/barang/katalog/view':'/barang/stok/detail/'+this.id+"/"+this.AlatKesehatan.nama_alat_kesehatan
        this.spinner.hide('spinner1')
      }
      else
      if(this.isEdit === false&&this.AlatKesehatan.nama_alat_kesehatan!=undefined){
        
        setTimeout(() => {
          if(this.errorMessage!=null){
            let msg=''
            this.errorMessage.response.map(val=>{
              msg+=val.field+' '+val.message+'\n'
            })
            Swal.fire('Error',msg,'error')
          }else{
            this.last=this.lastPage==undefined?'/barang/katalog/view':'/barang/stok/detail/'+this.id+"/"+this.formInput.value.nama_barang
            this.spinner.hide('spinner1')
            this.router.navigate([this.last])
          }
          
        }, 600);
      }
    })

    this.formInput = this.fb.group({
      nama_barang: [null, [Validators.required]],
      satuan_terkecil: [null, [Validators.required]],
      singkatan: [null, [Validators.required]],
      komposisi: "",
      stok: "",
      harga_jual: "",
      harga_beli:"",
      kemasan: this.fb.array([])
    });

    this.formKemasan = this.fb.group({
      nama: [null, [Validators.required]],
      isi: [null, [Validators.required]],
      singkatan: [null, [Validators.required]],
      satuan: []
    })


  }
  isNumber(e){
    return this.validate.Number(e)
  }
  setBatch(i,key,val){
    this.listBatch[i][key]=val.target.value
  }
  addBatch(){
    this.listBatch.push({'stok_batch':'','ed_batch':'','no_batch':'','harga_beli':''})
  }
  removeBatch(i){
    this.listBatch.splice(i,1)
  }
  submitInput() {
    this.submitted = false
    setTimeout(() => {
      this.submitted = true
    }, 300);
    if (this.formInput.invalid||this.formInput.value.harga_jual<=0) {
      return
    }
    this.spinner.show('spinner1')
    let input = this.formInput.value
    let kemasan = this.formKemasan.value
    let detailKemasan = []
    let index = 1;

    let i=1
    input.kemasan.forEach((el, index) => {
      detailKemasan.push({
        id_alat_kesehatan_kemasan:el.id_alat_kesehatan_kemasan,
        nama_kemasan: el.nama,
        nama_kemasan_singkatan: el.singkatan,
        target_kemasan: el.satuan,
        target_qty: el.isi,
        kemasan_level:i+1
      })
      i++
    });
    let payload = new AlatKesehatanPayload
    payload.id_alat_kesehatan = this.AlatKesehatan.id_alat_kesehatan
    payload.nama_alat_kesehatan = input.nama_barang
    payload.kemasan_terkecil = input.satuan_terkecil
    payload.kemasan_terkecil_singkatan = input.singkatan
    payload.komposisi = input.komposisi
    payload.harga_jual = parseInt(input.harga_jual)
    payload.alat_kesehatan_kemasan = detailKemasan
   
    this.store.dispatch(AlatKesehatanActions.updateInitial({ payload: payload }))
  
  } 
  ambilSingkatan(value: any, jenis: string) {
    let get = value.substr(0, 3)
    
    if (jenis == 'parent') {
      this.formInput.controls.kemasan.value[0].nama=value
      this.formInput.controls.kemasan.value[0].singkatan=get
      this.formInput.controls.kemasan.value[0].satuan=get
      this.formInput.patchValue({ singkatan: get })
    } else {
      this.formKemasan.patchValue({ singkatan: get })
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
        let i=this.formInput.value.kemasan.length>0?this.formInput.value.kemasan.findIndex(x=>x.nama==this.formKemasan.value.nama):-1
        if(i<0){
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
          isi: this.formKemasan.value.isi,
          singkatan: this.formKemasan.value.singkatan,
          satuan: this.formKemasan.value.satuan,
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
          isi: this.formKemasan.value.isi,
          singkatan: this.formKemasan.value.singkatan,
          satuan: this.formKemasan.value.satuan,

        });
        this.closeBtnTambahKemasan()
      }
      // this.insertKemasanToAray()
  }

  hapusListKemasaan(i: number) {
    const fa = this.formInput.get('kemasan') as FormArray;
    fa.removeAt(i);
  }

  editListKemasan(i: number) {
    let fa = this.formInput.value.kemasan[i]
    this.formKemasanTitle = 'Edit kemasan'
    this.indexListKemasan = i
    this.aksiModalKemasan = 'update'
    this.formKemasan.reset()
    this.formKemasan.patchValue({
      nama: fa.nama,
      isi: fa.isi,
      singkatan: fa.singkatan,
      satuan: fa.satuan
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
    // this.formKemasan.patchValue({
    //   satuan: this.formInput.value.singkatan
    // })
    this.aksiModalKemasan = 'add'
    this.submittedKemasan=false
    this.modalService.open("modalFormContent");
  }

  closeBtnTambahKemasan() {
    this.modalService.close("modalFormContent");
  }

}
