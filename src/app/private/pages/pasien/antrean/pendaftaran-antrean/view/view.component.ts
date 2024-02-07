import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { PendaftaranAntreanPasienService } from 'src/app/private/services/pasien/pendaftaran-antrean-pasien.service';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { DataTableDirective } from 'angular-datatables'
import { ModalService } from 'src/app/shared/_modal';
import { DaftarPoliklinikService } from 'src/app/private/services/manajemen-klinik/daftar-poliklinik.service';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import { NgxSpinnerService } from "ngx-spinner";
import { AESService } from 'src/app/private/services/AES/aes'
@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.sass']
})
export class ViewComponent implements OnInit {


  @ViewChild('modalBody') modalBody : ElementRef
  @ViewChild(DataTableDirective, {static: false}) datatableElement : any = DataTableDirective
  @ViewChild('input_no_rm') input_no_rm: ElementRef
  @ViewChild('input_nama') input_nama: ElementRef
  @ViewChild('input_alamat') input_alamat: ElementRef
  @ViewChild('input_no_hp') input_no_hp: ElementRef

  dtOptions: DataTables.Settings = {};
  formTambah: FormGroup;
  submitted : boolean = false
  idPasien : string = ""
  listPoliklinik : Array<any> = []
  isLoadingButton : boolean  = false
  errorMessage : any
  // public el: ElementRef<any> | undefined;
  btnDetail=false
  btnDelete=false
  btnEdit=false
  btnSetting=false
  btnAdd=false
  view=false

  no_rm=""
  nama=""
  constructor(
    private pendaftaranAntreanPasienService : PendaftaranAntreanPasienService,
    private modalService : ModalService,
    private fb : FormBuilder,
    private aes:AESService,
    private el : ElementRef,
    private daftarPoliklinikService : DaftarPoliklinikService,
    private spinner : NgxSpinnerService,
  ) { }
  keyGen:any
  ngOnInit(): void {
    
    let item=localStorage.getItem('currentUser')?JSON.parse(localStorage.getItem('currentUser')):null
    this.keyGen=item?this.aes.getKeyLogin(item):''
    item=item.menu_right
    this.btnAdd=this.btnDelete=this.btnEdit=item.findIndex((val)=>val.kode=='AMPDAP2')!=-1?true:false
    this.btnDetail=this.view=item.findIndex((val)=>val.kode=='AMPDAP1')!=-1?true:false

    if(!this.view){
        Swal.fire("Warning","Anda tidak mempunyai akses halaman ini",'warning').then(()=>{
          window.location.href='/'
        })
    }
    this.dtOptions = this.showDataTables(this.btnEdit)
    this.loadPoliKlinik()
    this.formTambah = this.fb.group({
      id_poliklinik : ["", [Validators.required]]
    });
  }
  SubmitForm() {
    this.submitted = false
    setTimeout(() => { this.submitted = true }, 200)
    if (this.formTambah.invalid) {
      for (const key of Object.keys(this.formTambah.controls)) {
        if (this.formTambah.controls[key].invalid) {
          const invalidControl = this.el.nativeElement.querySelector('[formControlName="' + key + '"]');
          const ini = this.modalBody.nativeElement.querySelector('[formControlName="' + key + '"]');
          //   invalidControl.focus()
          ini.focus()
          break;
        }
      }
      return
    }
    this.spinner.show('spinner1')
    let payload = {
      id_poliklinik : this.formTambah.value.id_poliklinik,
      id_akun_dokter : "",
      id_pasien : this.idPasien,
    }
    this.isLoadingButton = true
    this.errorMessage = null
    this.pendaftaranAntreanPasienService.insert(payload)
    .subscribe(succ => {
      this.spinner.hide('spinner1')
      if(succ.metaData.response_code!="0000")  {
        this.errorMessage = {
          metaData : { message : "error" },
          response : [ { field : "antrean", message: succ.metaData.message } ]
        }
      } else {
        this.modalClose()
        this.idPasien = null
        Swal.fire({
          title: 'Pasien berhasil diantrekan',
          icon: 'success',
          showCancelButton: false,
          allowOutsideClick: false,
          confirmButtonText: 'Ya, lanjutkan!',
        }).then((result) => {
          if (result.value) {
            this.reLoadData()
          }
        })
      }
      this.isLoadingButton = false
    }, (error : any ) => {
      this.isLoadingButton = false
    })
  }
  antrikan(data : any) {
    this.submitted = false
    this.idPasien = data.id_pasien
    this.formTambah.patchValue({
      id_poliklinik : ""
    })
    this.errorMessage = null
    this.modalService.open('modalFormContent')
  }
  modalClose() {
    this.modalService.close('modalFormContent')
  }
  loadPoliKlinik () {
    this.daftarPoliklinikService.getByAkunKlinik()
    .subscribe(succ => {
      this.listPoliklinik = succ.response
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
  showDataTables(edit) {
    this.spinner.show('spinner1')
    let self=this
    return {
      pageLength: 10,
      serverSide: true,
      processing: true,
      order : [],
      ajax : (dataTablesParameters: any, callback: any) => {
        // let noHp=this.input_no_hp.nativeElement.value
        Object.assign(dataTablesParameters, {
          no_rm : this.no_rm,
          nama : this.nama,
          alamat :"",// this.input_alamat.nativeElement.value,
          no_hp : "" //noHp.toString()!=''&&noHp.toString().substr(0, 1) == '0' ? noHp.toString().substr(1, noHp.length) : noHp
        })
        this.pendaftaranAntreanPasienService.getDataTables(dataTablesParameters)
        .subscribe((resp : any) => {
          callback({
            draw: resp.response.draw,
            recordsTotal: resp.response.recordsTotal,
            recordsFiltered: resp.response.recordsFiltered,
            data: resp.response.data
          })
          this.spinner.hide('spinner1')
        })
      },
      columns: [
        {
          orderable: false,
          searchable: false,
          render(data: any, type: any, row: any, full: any) {
            return full.row + 1 + full.settings._iDisplayStart;
          }
        },{
          data : 'full_rm'
        },{
          data : 'no_bpjs',
          render(data: any, type: any, row: any, full: any) {
            return data==null?'-':data
          }
        },{
          data : 'nama'
        },{
          data : 'alamat',
          render(data: any, type: any, row: any, full: any) {
            return self.dekryp(data)
          }
          
        },{
          orderable: false,
          searchable: false,
          render(data: any, type: any, row: any, full: any) {
            return edit?`<div style="white-space: nowrap;">
                      <button class="btn btn text-ui-primary detail-data" title="Antrikan"><i class="fas fa-id-card-alt"></i> Antrekan</button>
                    <div>`:'';
          }
        }
      ],
      rowCallback: (row: Node, data: any[] | Object, index: number) => {
        const self = this;
        // Unbind first in order to avoid any duplicate handler
        // (see https://github.com/l-lin/angular-datatables/issues/87)
        // Note: In newer jQuery v3 versions, `unbind` and `bind` are
        // deprecated in favor of `off` and `on`
        $('td .detail-data', row).on('click', () => {
          self.antrikan(data);
        });

        return row;
      }
    }
  }
  reLoadData() {
    this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.ajax.reload();
    });
  }

}
