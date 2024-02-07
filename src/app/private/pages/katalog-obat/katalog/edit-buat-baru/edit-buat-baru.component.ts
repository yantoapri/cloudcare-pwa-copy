import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from "@angular/forms";
import { ModalService } from 'src/app/shared/_modal';
import { Observable } from 'rxjs'
import { ActivatedRoute, Params } from '@angular/router';
import { DataObatPayload } from 'src/app/private/models/class-payload-api/master-data/data-obat-payload';
import { Store } from '@ngrx/store';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import { Router } from '@angular/router';
import {ValidateService} from 'src/app/private/services/validate/validateService'
import * as fromApp from 'src/app/private/states/private-app.states'
import * as DataObatActions from 'src/app/private/states/master-data/data-obat/data-obat.actions'
import { NgxSpinnerService } from "ngx-spinner";
import {MoneyService} from 'src/app/private/services/money/index'
@Component({
  selector: 'app-edit-buat-baru',
  templateUrl: './edit-buat-baru.component.html',
  styleUrls: ['./edit-buat-baru.component.sass']
})
export class EditBuatBaruComponent implements OnInit {
  listBatch=[]
  formInput: FormGroup;
  formKemasan: FormGroup;
  submitted : boolean = false
  submittedKemasan : boolean = false
  aksiModalKemasan: string
  indexListKemasan : number
  formKemasanTitle : string

  dataObat:any =[]

  isEdit : boolean
  isLoadingButton : boolean
  reloadTable : boolean
  errorMessage : any | null
  submitButton : boolean
  getState: Observable<any>;
  
  constructor(
    private fb : FormBuilder,
    private modalService : ModalService,
    private spinner : NgxSpinnerService,
    private store : Store<fromApp.PrivateAppState>,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private validate:ValidateService,
    private money:MoneyService
  ) {
    this.getState = this.store.select('masterData_dataObat')
  }
  optionsCur =this.money.currency()
  lastPage=''
  last=''
  id=''
  ngOnInit(): void {

    this.activatedRoute.params.subscribe((params : Params) => {
      if(params) {
        this.lastPage=params.page!=undefined?params.page:''
        this.spinner.show('spinner1')
        this.lastPage=params.page
        this.id=params.id
        this.store.dispatch( DataObatActions.getByIdInitial({ payload : { id : params.id } }) )
      }
    })

    this.getState.subscribe((state) => {
      this.dataObat = state.dataObat
      this.errorMessage = state.errorMessage
      this.submitButton = state.submitButton
      this.isLoadingButton = state.isLoadingButton
      this.isEdit = state.isEdit
      if(this.isEdit === true) {

        if (this.dataObat) {
          this.formInput.patchValue({
            kemasan_terkecil : this.dataObat.kemasan_terkecil,
            kemasan_terkecil_singkatan : this.dataObat.kemasan_terkecil_singkatan,
            isi:1
            // this.dataObat.obat_kemasan[find].target_qty
          })
          let totalLength = this.dataObat.obat_kemasan.length
          let control = <FormArray>this.formInput.controls.kemasan;
          for (let index = 0; index < totalLength; index++) {
            control.push(
              this.fb.group({
                id_obat_kemasan:this.dataObat.obat_kemasan[index]?.id_obat_kemasan,
                nama : this.dataObat.obat_kemasan[index]?.nama_kemasan,
                isi : this.dataObat.obat_kemasan[index]?.target_qty,
                singkatan : this.dataObat.obat_kemasan[index]?.nama_kemasan_singkatan,
                satuan : this.dataObat.obat_kemasan[index]?.target_kemasan,
                kemasan_level:this.dataObat.obat_kemasan[index]?.kemasan_level
              })
            )
          }
        }
        this.last=this.lastPage==undefined?'/katalog-obat/katalog/view':'/stok-obat/detail/'+this.id+'/'+this.dataObat.nama_obat
        this.formInput.patchValue({
          nama_barang : this.dataObat.nama_obat,
          komposisi : this.dataObat.komposisi,
          stok:this.dataObat.stok,
          harga_jual:this.dataObat.harga_jual,
          harga_pokok:this.dataObat.harga_pokok,
          expired_date:this.dataObat.expired_date?this.dataObat.expired_date:"",
          no_sertifikat:this.dataObat.no_sertifikat?this.dataObat.no_sertifikat:""
        })
        this.spinner.hide('spinner1')
      }
      else
      if(this.isEdit === false&&this.dataObat.nama_obat!=undefined){
        
        setTimeout(() => {
          if(this.errorMessage!=null){
            let msg=''
            this.errorMessage.response.map(val=>{
              msg+=val.field+' '+val.message+'\n'
            })
            Swal.fire('Error',msg,'error')
          }else{
            this.last=this.lastPage==undefined?'/katalog-obat/katalog/view':'/stok-obat/detail/'+this.id+'/'+this.formInput.value.nama_barang
            this.spinner.hide('spinner1')
            this.router.navigate([this.last])
          }
          
        }, 600);
      }
      
    })

    this.formInput = this.fb.group({
      nama_barang: [null, [Validators.required]],
      kemasan_terkecil: [null, [Validators.required]],
      kemasan_terkecil_singkatan : [null, [Validators.required]],
      komposisi: "",
      stok: "",
      harga_jual: "",
      harga_pokok:"",
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
  setBatch(i,key,val){
    this.listBatch[i][key]=val.target.value
  }
  addBatch(){
    this.listBatch.push({'stok_batch':'','ed_batch':'','no_batch':'','harga_beli':''})
  }
  removeBatch(i){
    this.listBatch.splice(i,1)
  }
  onFocus(id){
    document.getElementById(id).click()
  }
  submitInput() {
    this.submitted = false
    setTimeout(() => {
      this.submitted = true
    }, 300);
    if(this.formInput.invalid||this.formInput.value.harga_jual<=0) {
      return
    }
    this.spinner.show('spinner1')
    let input = this.formInput.value
    let kemasan = this.formKemasan.value
    let detailKemasan = []

    let i=1;
    input.kemasan.forEach((el) => {
      detailKemasan.push({
        id_obat_kemasan:el.id_obat_kemasan,
        nama_kemasan: el.nama,
        nama_kemasan_singkatan : el.singkatan,
        target_kemasan : el.satuan,
        target_qty: el.isi,
        kemasan_level : i + 1
      })
      i++;
    });
    let payload = new DataObatPayload
    payload.kemasan_terkecil=input.kemasan_terkecil
    payload.kemasan_terkecil_singkatan=input.kemasan_terkecil_singkatan
    payload.id_obat = this.dataObat.id_obat
    payload.nama_obat = input.nama_barang
    payload.komposisi = input.komposisi
    payload.harga_jual = parseInt(input.harga_jual)
    payload.obat_kemasan = detailKemasan
    payload.expired_date=input.expired_date
    payload.no_sertifikat=input.no_sertifikat
    // let batch=[]
    // input.listBatch.map((val)=>{
    //   batch.push(
    //     {
    //         "no_batch": val.no_batch,
    //         "tanggal_ed": new Date(val.ed_batch).getTime(),
    //         "stok_batch": val.stok_awal,
    //         "harga_beli": val.harga_beli
    //     }
    //   )
    // })
    // payload.batch=batch
    this.store.dispatch( DataObatActions.updateInitial({ payload : payload }) )
    
  }
  ambilSingkatan(value : any, jenis : string){
    let get = value.substr(0, 3)
   
    if (jenis == 'parent') {
      this.formInput.controls.kemasan.value[0].nama=value
      this.formInput.controls.kemasan.value[0].singkatan=get
      this.formInput.controls.kemasan.value[0].satuan=get
      this.formInput.patchValue({kemasan_terkecil_singkatan : get})
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
        // this.insertKemasanToAray()
      }
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
    // this.formKemasan.patchValue({
    //   satuan : this.formInput.value.singkatan
    // })
    this.aksiModalKemasan = 'add'
    this.submittedKemasan=false
    this.modalService.open("modalFormContent");
  }

  closeBtnTambahKemasan() {
    this.modalService.close("modalFormContent");
  }

}
