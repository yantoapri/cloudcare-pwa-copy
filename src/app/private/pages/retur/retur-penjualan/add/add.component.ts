import { Component, OnInit,ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables'
import { Observable } from 'rxjs';
import { CurrencyMaskInputMode } from 'ngx-currency';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Params } from '@angular/router';
import * as fromApp from 'src/app/private/states/private-app.states'
import * as returAction from 'src/app/private/states/retur-penjualan/retur.action'
import { ModulPenjualanService} from 'src/app/private/modul-api/modul-gudang-transaksi/modul-penjualan.service';
import { NgxSpinnerService } from "ngx-spinner";
import {ValidateService} from 'src/app/private/services/validate/validateService'
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
  listPenjualanObat:any[]=[]
  listPenjualanAlat:any[]=[]
  totalBayar=0
  totalRetur=0
  metode=""
  listReturObat=[]
  listReturAlat=[]
  satuan_qty_obat:number[]=[]
  satuan_qty_alat:number[]=[]
  alasan:string=""
  action:string=""
  id_penjualan=""
  submitted = false
  constructor(
    private validate:ValidateService,
    private spinner : NgxSpinnerService,
    private ModulPenjualanService:ModulPenjualanService,
    private activatedRoute: ActivatedRoute,
    private store: Store<fromApp.PrivateAppState>,
  ) {
    this.getState = this.store.select('retur')
   }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params : Params) => {
      if(params) {
        this.spinner.show('spinner1')
        this.id_penjualan=params.id
        this.ModulPenjualanService.show(params.id)
        .subscribe((resp: any) => {
          setTimeout(()=>{
            this.metode=resp.response.metode_pembayaran
            this.setData(resp.response.penjualan_detail,resp.response.penjualan_alat_kesehatan)
          },400)
          
        })
        setTimeout(() => {
          this.spinner.hide('spinner1')
        }, 600);
      }
    })
  }
  isNumber(e){
    return this.validate.Number(e)
  }
  setData(dataObat,dataAlat){
    this.listPenjualanObat=dataObat
    this.listPenjualanAlat=dataAlat
    dataObat.map((val,index)=>{
      this.listPenjualanObat[index].isDisable=false
      this.totalBayar+=parseInt(val.total_harga)
    })
    dataAlat.map((val,index)=>{
      this.listPenjualanAlat[index].isDisable=false
      this.totalBayar+=parseInt(val.total_harga)
    })
  }
  addRetur(item,i,type){
    if(type=="obat")
    {
      this.listPenjualanObat[i].isDisable=true
      this.listReturObat.push(item)
    }
    else
    {
      this.listPenjualanAlat[i].isDisable=true
      this.listReturAlat.push(item)
    }
    
  }
  setTotalRetur(){
    this.totalRetur=0
    this.listReturObat.map((val,index)=>{
      this.totalRetur+=parseInt(val.satuan_harga) * this.satuan_qty_obat[index]
    })
    this.listReturAlat.map((val,index)=>{
      this.totalRetur+=parseInt(val.satuan_harga) * this.satuan_qty_alat[index]
    })
  }
  hapusRetur(i,item,type){
    if(type=="obat")
    {
      this.listReturObat.splice(i,1)
      let index=this.listPenjualanObat.indexOf(item)
      this.listPenjualanObat[index].isDisable=false
    }
    else
    {
      this.listReturAlat.splice(i,1)
      let index=this.listPenjualanAlat.indexOf(item)
      this.listPenjualanAlat[index].isDisable=false
    }
  }

  simpan(){
    this.submitted=false
    setTimeout(() => {
      this.submitted=true
    }, 400);
    let dataObat=[]
    let dataAlat=[]
    let qtyObat=false
    let qtyAlat=false
    this.listReturObat.map((val,index)=>{
      if(this.satuan_qty_obat[index]==null||this.satuan_qty_obat[index]==0){
        qtyObat=true
      }
      dataObat.push({
        "id_penjualan_detail":val.id_penjualan_detail,
        "satuan_qty": this.satuan_qty_obat[index]
      })
    })
    this.listReturAlat.map((val,index)=>{
      if(this.satuan_qty_alat[index]==null||this.satuan_qty_alat[index]==0){
        qtyAlat=true
      }
      dataAlat.push({
        "id_penjualan_alat_kesehatan":val.id_penjualan_alat_kesehatan,
        "satuan_qty": this.satuan_qty_alat[index]
      })
    })
    if(this.alasan==""||this.action==""||(this.listReturObat.length==0&&this.listReturAlat.length==0)||qtyAlat||qtyObat){
      return false
    }
    this.spinner.show('spinner1')
    
  
    
    let data={
      "id_penjualan":this.id_penjualan,
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
