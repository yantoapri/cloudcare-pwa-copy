import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { DataPasienService } from 'src/app/private/services/pasien/data-pasien.service';
import { AuthService } from 'src/app/authentication/core/services/auth.service'
import { AESService } from 'src/app/private/services/AES/aes'
import { NgxSpinnerService } from "ngx-spinner";
import * as moment from 'moment';
@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.sass']
})
export class DetailComponent implements OnInit {

  tabPane : Array<boolean> = [true, false]
  idPasien : string = ""
  pasien :any
  constructor(
    private activatedRoute: ActivatedRoute,
    private dataPasienService : DataPasienService,
    private spinner :  NgxSpinnerService,
    private auth:AuthService,
    private aes:AESService
  ) { }
  keyGen:any
  ngOnInit(): void {
    this.keyGen=this.aes.getKeyLogin(this.auth.currentUserValue)
    this.activatedRoute.params.subscribe((params : Params) => {
      if(params) {
        this.idPasien = params.id
        this.loadDetailPasien(params.id)
      }
    })
  }
  dekryp(val){
    try{
        return this.aes.decrypt(val,this.keyGen.key,this.keyGen.iv,256)
    }
    catch(err){
        return val
    }
  }
  convertDate(val){
    return moment(new Date(val)).format("DD-MM-YYYY")
  }
  ShowTabPane(nomor : number) {
    this.tabPane.forEach((el, index) => {
      this.tabPane[index] = false
    });
    this.tabPane[nomor] = true
  }

  loadDetailPasien(id : string) {
    this.spinner.show('spinner1')
    this.dataPasienService.show(id)
    .subscribe(res => {
      this.pasien = res.response
      if(this.pasien.alamat.ktp!=""){
        this.pasien.alamat.ktp.alamat = this.pasien.alamat?.ktp?.alamat!=null?this.pasien.alamat.ktp?.alamat:'';
        this.pasien.alamat.ktp.village = this.pasien.alamat?.ktp?.village!=null?this.pasien.alamat.ktp?.village:'';
        this.pasien.alamat.ktp.district = this.pasien.alamat?.ktp.district!=null?this.pasien.alamat.ktp?.district:'';
        this.pasien.alamat.ktp.regency = this.pasien.alamat?.ktp?.regency!=null?this.pasien.alamat.ktp?.regency:'';
        this.pasien.alamat.ktp.province = this.pasien.alamat?.ktp?.province!=null?this.pasien.alamat.ktp?.province:'';
      }
      if(this.pasien.alamat.domisili!=""){
        this.pasien.alamat.domisili.alamat = this.pasien.alamat?.domisili?.alamat!=null?this.pasien.alamat.domisili?.alamat:'';
        this.pasien.alamat.domisili.village = this.pasien.alamat?.domisili?.village!=null?this.pasien.alamat.domisili?.village:'';
        this.pasien.alamat.domisili.district = this.pasien.alamat?.domisili.district!=null?this.pasien.alamat.domisili?.district:'';
        this.pasien.alamat.domisili.regency = this.pasien.alamat?.domisili?.regency!=null?this.pasien.alamat.domisili?.regency:'';
        this.pasien.alamat.domisili.province = this.pasien.alamat?.domisili?.province!=null?this.pasien.alamat.domisili?.province:'';
      }
      this.spinner.hide('spinner1')
    })
  }


}
