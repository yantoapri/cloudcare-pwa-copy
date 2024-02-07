import { Component, OnInit,ViewChild } from '@angular/core';
import { ModalService } from 'src/app/shared/_modal';
import { DataTableDirective } from 'angular-datatables'
import { Observable } from 'rxjs';
import { CurrencyMaskInputMode } from 'ngx-currency';
import {ValidateService} from 'src/app/private/services/validate/validateService'
import { Store } from '@ngrx/store';
import { ActivatedRoute, Params } from '@angular/router';
import { FormBuilder,Validators,} from "@angular/forms";
import * as fromApp from 'src/app/private/states/private-app.states'
import * as returAction from 'src/app/private/states/retur-gudang/retur.action'
import { ModulObatService } from 'src/app/private/modul-api/modul-master-node/modul-obat.service'
import { ModulAlatKesehatanService } from 'src/app/private/modul-api/modul-master-node/modul-alat-kesehatan.service'
import { ModulReturPbfService } from 'src/app/private/modul-api/modul-gudang-transaksi/modul-retur-pbf';
import { ModulFakturPembelianService} from 'src/app/private/modul-api/modul-gudang-transaksi/modul-faktur-pembelian.service';
import { NgxSpinnerService } from "ngx-spinner";
import {MoneyService} from 'src/app/private/services/money/index'
import * as moment from 'moment';
@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.sass']
})
export class AddComponent implements OnInit {
  optionsCur = {
    prefix: '', align: 'left', thousands: '.',
    precision: '0', inputMode: CurrencyMaskInputMode.NATURAL,
  };
  formInput: any
  @ViewChild(DataTableDirective, { static: false }) datatableElement: any = DataTableDirective
  dtOptions: DataTables.Settings = {};
  reloadTable: boolean
  getState: Observable<any>;
  listPembelianObat:any[]=[]
  listPembelianAlat:any[]=[]
  totalBayar=0
  totalRetur=0
  detail:any={}
  metode=""
  returType=1
  listReturObat=[]
  listReturAlat=[]
  satuan_qty_obat:number[]=[]
  satuan_qty_alat:number[]=[]
  alasan:string=""
  action:string="distributor"
  id_Pembelian=""
  maxRetur=0
  returIndex=0
  openMutasi=false
  ppn=0
  satuanJual:any=[]
  listSatuan=[]
  submitted = false
  constructor(
    private modalService: ModalService,
    private ModulReturPbfService: ModulReturPbfService,
    private money:MoneyService,
    private fb: FormBuilder,
    private validate:ValidateService,
    private spinner : NgxSpinnerService,
    private ModulFakturPembelianService:ModulFakturPembelianService,
    private activatedRoute: ActivatedRoute,
    private modulObat:ModulObatService,
    private modulAlat:ModulAlatKesehatanService,
    private store: Store<fromApp.PrivateAppState>,
  ) {
    this.getState = this.store.select('retur')
   }
  mutasi=[]
  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params : Params) => {
      if(params) {
        this.id_Pembelian=params.id
        this.spinner.show('spinner1')
        this.ModulFakturPembelianService.show(params.id)
        .subscribe((resp: any) => {
          this.detail=resp.response;
          this.spinner.hide('spinner1')
         
          setTimeout(()=>{
            this.metode=resp.response.metode_pembayaran
            this.setData(resp.response.pembelian_detail,resp.response.pembelian_alat_kesehatan)
          },400)
          
        })
        this.ModulReturPbfService.getById(params.id)
        .subscribe((resp: any) => {
          if(resp){
            this.mutasi=resp.response
          }  
        })
      }
    })
    this.formInput = this.fb.group({
			tgl_terima: [null, [Validators.required]],
      nama: [null, [Validators.required]],
      satuan: [null, [Validators.required]],
      no_batch: [null, [Validators.required]],
      tanggal_ed: [null, [Validators.required]],
      jml: [null, [Validators.required]],
      stock:0,
      satuan_harga:0,
      id:null
    })
  }
  isNumber(e){
    return this.validate.Number(e)
  }
  onFocus(id){
    document.getElementById(id).click()
  }
  convertDate(val){
    return moment(val).utc().format("DD-MM-YYYY")
	}
  Money(val){
    return this.money.formatRupiah(parseInt(val))
  }
  setData(dataObat,dataAlat){
    this.listPembelianObat=dataObat
    this.listPembelianAlat=dataAlat
    dataObat.map((val,index)=>{
      this.listPembelianObat[index].isDisable=false
      this.totalBayar+=parseInt(val.total_harga)-parseInt(val.diskon_rupiah)
    })
    dataAlat.map((val,index)=>{
      this.listPembelianAlat[index].isDisable=false
      this.totalBayar+=parseInt(val.total_harga)-parseInt(val.diskon_rupiah)
    })
    this.setTotalRetur(dataObat,dataAlat)
  }
  close(){
    this.modalService.close("modalRetur");
  }
  async modalRetur(item,i,type){
    this.modalService.open("modalRetur");
    this.returType=type
    this.returIndex=i
    this.maxRetur=item.satuan_qty
    console.log(item)
    this.formInput.patchValue({
      nama:type?item.nama_obat:item.nama_alat_kesehatan,
      satuan:item.satuan,
      tgl_terima:new Date(),
      tanggal_ed:moment(new Date(item.tanggal_ed_unix)).format("DD-MM-YYYY"),
      no_batch:item.no_batch,
      jml:item.satuan_qty,
      stock:item.total_qty,
      satuan_harga:item.satuan_harga,
      id:type?item.id_pembelian_detail:item.id_pembelian_alat_kesehatan
    })
    this.listSatuan=[]
    if(type){
      await this.modulObat.show(item.id_obat).subscribe((res)=>{
        this.listSatuan=res.response.obat_kemasan;
        this.listSatuan.map(val=>{
          if(val.nama_kemasan==item.satuan){
            this.satuanJual=val
          }
        })
        
      })
    }else{
      await this.modulAlat.show(item.id_alat_kesehatan).subscribe((res)=>{
        this.listSatuan=res.response.alat_kesehatan_kemasan
        this.listSatuan.map(val=>{
          if(val.nama_kemasan==item.satuan){
            this.satuanJual=val
          }
        })
      })
    }
    
  }
  addRetur(){
    this.submitted = false
		setTimeout(() => { this.submitted = true }, 200);
    
		if (this.formInput.invalid||this.formInput.value.jml>this.maxRetur) {
			return
		}
    if(this.returType)
    {
      this.listPembelianObat[this.returIndex].isDisable=true
      this.listReturObat.push(this.formInput.value)
      this.satuan_qty_obat.push(this.formInput.value.jml)
    }
    else
    {
      this.listPembelianAlat[this.returIndex].isDisable=true
      this.listReturAlat.push(this.formInput.value)
      this.satuan_qty_alat.push(this.formInput.value.jml)
    }
    
    setTimeout(() => {
      this.submitted=false
    },400)
    this.modalService.close("modalRetur");
  }

  setTotalRetur(dataObat,dataAlat){
    
    this.totalRetur=0
    dataObat.map((val,index)=>{
      this.totalRetur+=parseInt(val.total_harga)-parseInt(val.diskon_rupiah)
    })
    dataAlat.map((val,index)=>{
      this.totalRetur+=parseInt(val.total_harga)-parseInt(val.diskon_rupiah)
    })
    this.ppn=this.totalRetur*(this.detail.ppn_nilai/100)
    this.totalRetur=this.totalRetur+this.ppn
  }

  hapusRetur(i,item,type){
    if(type=="obat")
    {
      this.listReturObat.splice(i,1)
      let index=this.listPembelianObat.findIndex(x=>x.id_pembelian_detail==item.id&&x.satuan==item.satuan)
      console.log(index)
      this.satuan_qty_obat.splice(i,1)
      this.listPembelianObat[index].isDisable=false
    }
    else
    {
      this.listReturAlat.splice(i,1)
      this.satuan_qty_alat.splice(i,1)
      let index=this.listPembelianAlat.findIndex(x=>x.id_pembelian_alat_kesehatan==item.id&&x.satuan==item.satuan)
      this.listPembelianAlat[index].isDisable=false
    }
  }

  simpan(){
    this.submitted=false
    setTimeout(() => {
      this.submitted=true
    }, 400);

    if(this.alasan==""||this.action==""||(this.listReturObat.length==0&&this.listReturAlat.length==0)){
      return false
    }
    this.spinner.show('spinner1')
    let dataObat=[]
    let dataAlat=[]
    this.listReturObat.map((val,index)=>{
      dataObat.push({
        "id_pembelian_detail":val.id,
        "satuan_qty": this.satuan_qty_obat[index],
        "satuan":val.satuan
      })
    })
    this.listReturAlat.map((val,index)=>{
      dataAlat.push({
        "id_pembelian_alat_kesehatan":val.id,
        "satuan_qty": this.satuan_qty_alat[index],
        "satuan":val.satuan
      })
    })
    let data={
      "id_pembelian":this.id_Pembelian,
      "retur_tujuan": this.action,
      "alasan_retur": this.alasan,
      "obat":dataObat,
      "alat_kesehatan":dataAlat
    }
    this.store.dispatch(returAction.addInitial({ payload: data }))
    setTimeout(() => {
      this.spinner.hide('spinner1')
    }, 400);
  }
}
