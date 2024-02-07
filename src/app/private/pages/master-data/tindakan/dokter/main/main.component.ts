import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ModalService } from 'src/app/shared/_modal';
// import Swal from 'sweetalert2/dist/sweetalert2.js'
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.sass']
})
export class MainComponent implements OnInit {
  btnDetail=false
  btnDelete=false
  btnEdit=false
  btnSetting=false
  btnAdd=false
  view=false
  constructor(
    private fb: FormBuilder,
    // private swal:Swal,
    private modalService: ModalService
  ) { }
  public addCusForm: FormGroup;
  public fname: string = "";

  ngOnInit(): void {
    this.addCusForm = this.fb.group({
      firstname: [
        this.fname,
        [Validators.required, Validators.pattern("[a-zA-Z]+([a-zA-Z ]+)*")],
      ]
    });
    let item=JSON.parse(localStorage.getItem('currentUser'))
    item=item.menu_right
    this.btnAdd=this.btnDelete=this.btnEdit=item.findIndex((val)=>val.kode=='MDMTDK2')!=-1?true:false
    this.btnDetail=this.view=item.findIndex((val)=>val.kode=='MDMTDK1')!=-1?true:false

    // if(!this.view){
    //   this.Swal.fire("Warning","Anda tidak mempunyai akses halaman ini",'warning').then(()=>{
    //     window.location.href='/'
    //   })
    // }
  }
  FormModalOpen() {
    this.modalService.open("modalFormContent");
  }
  dialogSubmit() {

  }
  modalClose() {
    this.modalService.close("modalFormContent")
  }
}
