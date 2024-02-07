import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup,  Validators, FormControl, FormArray } from "@angular/forms";
import { Observable } from 'rxjs'
import { ActivatedRoute, Params } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromApp from 'src/app/private/states/private-app.states'
import * as moment from 'moment';
import { JadwalSesiService } from 'src/app/private/services/master-data/ruang-dan-jadwal/jadwal-sesi.service';
import { JadwalLiburPayload } from 'src/app/private/models/class-payload-api/master-data/ruang-dan-jadwal/jadwal-libur-payload';
import * as JadwalLiburActions from 'src/app/private/states/master-data/ruang-dan-jadwal/jadwal-libur/jadwal-libur.actions'
import { NgxSpinnerService } from "ngx-spinner";
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.sass']
})
export class EditComponent implements OnInit {

  formTambah: FormGroup;
  submitted : boolean
  isLoadingButton : boolean
  isEdit : boolean
  reloadTable : boolean
  errorMessage : any | null
  submitButton : boolean
  getState: Observable<any>;
  listJadwalSesi : Array<any> = []
  jadwalLibur : JadwalLiburPayload = new JadwalLiburPayload
  dumpJadwalSesi = new FormArray([])

  lastDataSelectJadwalSesi : number = 0
  selectJadwalSesi : any = {
    last_data : 0,
    get_data: 10,
    search : ""
  }
  idListJadwalSesi : any = null
  isLastSesi=false
  isLoadingSesi=false
  constructor(
    private fb: FormBuilder,
    private jadwalSesiService : JadwalSesiService,
    private store : Store<fromApp.PrivateAppState>,
    private activatedRoute: ActivatedRoute,
    private spinner : NgxSpinnerService,
  ) {
    this.getState = this.store.select('masterData_ruangDanJadwal_jadwalLibur');
  }
  // masterData_ruangDanJadwal_jadwalLibur
  ngOnInit(): void {
    this.formTambah = this.fb.group({
      tgl_libur : ["", [] ],
      keterangan_libur : ["", [] ]
    })
    this.activatedRoute.params.subscribe((params : Params) => {
      if(params) {
        this.spinner.show('spinner1')
        this.store.dispatch( JadwalLiburActions.getByIdInitial({ payload : { id : params.id } }) )
      }
    })

    this.getState.subscribe((state) => {

      this.errorMessage = state.errorMessage
      this.submitButton = state.submitButton
      this.isLoadingButton = state.isLoadingButton
      this.isEdit  = state.isEdit
      this.jadwalLibur = state.jadwalLibur
      if(this.isEdit === true) {
        this.formTambah.patchValue({
          tgl_libur : moment(this.jadwalLibur.tgl_libur).format('DD-MM-YYYY'),
          keterangan_libur : this.jadwalLibur.keterangan_libur
        })
        if(this.jadwalLibur.detail != undefined) {
          if(this.jadwalLibur.detail.length > 0) {
            this.jadwalLibur.detail.forEach(el => {
              const newGroup = new FormGroup({})
              newGroup.addControl('id_jadwal_sesi', new FormControl(el.id_jadwal_sesi))
              newGroup.addControl('nama_sesi', new FormControl(el.nama_sesi))
              newGroup.addControl('id_jadwal_libur_detail', new FormControl(""))
              this.dumpJadwalSesi.push(newGroup)
            })
            this.spinner.hide('spinner1')
          }
          this.spinner.hide('spinner1')
        }
      }

    })
  }

  searchlistJadwalSesi(event : any,aksi:any) {
    if (aksi == 'search')
		{
			this.listJadwalSesi=[]
			this.selectJadwalSesi.search = event.term
			this.selectJadwalSesi.last_data="0"
			this.isLastSesi=false
		}
		else
		{
			this.selectJadwalSesi.search = ""
		}
		
		if(aksi=="last_page"){
			if(!this.isLastSesi)
			this.selectJadwalSesi.last_data+=10
		}
    
    if(!this.isLastSesi){
      this.isLoadingSesi=true
      this.jadwalSesiService.getSelectOption(this.selectJadwalSesi)
      .subscribe(res => {
        
        if(res.response.length==0){
          this.isLastSesi=true
        }else{
          if(res.response.length<10){
            res.response.map(val=>{
              this.listJadwalSesi.push(val)
            })
            this.isLastSesi=true
          }else{
            res.response.map(val=>{
              this.listJadwalSesi.push(val)
            })
          }
        }
        this.isLoadingSesi=false
      })
    }
  }

  addDetailJadwalLibur() {
    let idSelected = this.idListJadwalSesi
    if(idSelected != "") {
      let idIndex = this.listJadwalSesi.findIndex((el, index) => {
        return el.id_jadwal_sesi == idSelected
      })
      if(idIndex >= 0) {
        let find = this.listJadwalSesi[idIndex]
        const newGroup = new FormGroup({})
        let haveJadwalSesi = this.dumpJadwalSesi.value.findIndex((el, index) => {
          return el.id_jadwal_sesi == find.id_jadwal_sesi
        })
        if(haveJadwalSesi >= 0) {
          alert("Sepertinya anda sudan menambahkan data ini")
        } else {
          newGroup.addControl('id_jadwal_sesi', new FormControl(find.id_jadwal_sesi))
          newGroup.addControl('nama_sesi', new FormControl(find.nama_sesi))
          newGroup.addControl('id_jadwal_libur_detail', new FormControl(""))
          this.dumpJadwalSesi.push(newGroup)
        }
      }
    }
  }
  HapusJadwalSesiFromDump(id: any) {
    let have = this.dumpJadwalSesi.value.findIndex((el, index) => {
      return el.id_jadwal_sesi == id
    })
    if(have >= 0) {
      this.dumpJadwalSesi.removeAt(have)
    }
  }

  SubmitForm() {
    this.submitted = true
    if (this.formTambah.invalid) {
      return
    }
    this.spinner.show('spinner1')
    let payload = new JadwalLiburPayload
    payload.id_jadwal_libur = this.jadwalLibur.id_jadwal_libur
    payload.id_klinik = this.jadwalLibur.id_klinik
    payload.tgl_libur = moment(this.formTambah.value.tgl_libur).format('YYYY-MM-DD')
    payload.keterangan_libur = this.formTambah.value.keterangan_libur
    payload.detail = this.dumpJadwalSesi.value

    this.store.dispatch( JadwalLiburActions.updateInitial({ payload : payload }) )
    setTimeout(() => {
      this.spinner.hide('spinner1')
    }, 400);
  }

}
