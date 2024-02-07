import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { FormBuilder, FormGroup} from "@angular/forms";
import {ModulConfigDefekta} from "src/app/private/modul-api/modul-master-node/modul-config-defekta"
@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.sass']
})
export class ViewComponent implements OnInit {

  constructor(
    private ModulConfigDefekta:ModulConfigDefekta,
    private fb : FormBuilder,
    ) { }
  formInput : FormGroup
  btnDetail=false
  btnDelete=false
  btnEdit=false
  btnSetting=false
  btnAdd=false
  view=false
  submitted=false
  listConfig=[]
  valConfig=[]
  ngOnInit(): void {
    let item=JSON.parse(localStorage.getItem('currentUser'))
    item=item.menu_right
    // this.btnAdd,this.btnDelete,this.btnEdit=item.findIndex((val)=>val.kode=='IVKLAK2')!=-1?true:false
    this.btnDetail=this.view=item.findIndex((val)=>val.kode=='IVDFPD1')!=-1?true:false

    if(!this.view){
      Swal.fire("Warning","Anda tidak mempunyai akses halaman ini",'warning').then(()=>{
        window.location.href='/'
      })
    }
    this.formInput = this.fb.group({
      min_ed : [""],
      min_stok : [""],
    })
    this.ModulConfigDefekta.show()
    .subscribe((resp : any) => {
      if(resp.metaData.response_code=='0000'){
        this.listConfig=resp.response
        resp.response.map(val=>{
          this.valConfig.push(val.value_config)
        })
      }
    })
  }

  update(id,value){
    this.submitted=true
    let param={}
      param={
        "id_config": id,
        "value_config": value
      }
   
    this.ModulConfigDefekta.update(param)
    .subscribe((resp : any) => {
      if(resp.metaData.response_code=='0000'){
        Swal.fire("Success","Data berhasil disimpan","success")
      }else{
        Swal.fire("Error",resp.metaData.message,"error")
      }
    })
  }

}
