import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { DataTableDirective } from 'angular-datatables'
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NgxSpinnerService } from "ngx-spinner";
import { Router } from '@angular/router';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import { ModalService } from 'src/app/shared/_modal';
import { RoleService } from 'src/app/private/services/role-and-rights/role.service'
import { JadwalStafService } from 'src/app/private/modul-api/modul-master/modul-jadwal-staf.service';
import * as moment from 'moment';
import {
	CalendarOptions,
	DateSelectArg,
	EventClickArg,
	EventApi,
	FullCalendarComponent,
} from "@fullcalendar/angular";
import { EventInput } from "@fullcalendar/angular";
@Component({
  selector: 'app-jadwal-staff',
  templateUrl: './jadwal-staff.component.html',
  styleUrls: ['./jadwal-staff.component.scss']
})
export class jadwalStaffComponent implements OnInit {
  @ViewChild('calendar_ref') calendar_ref: FullCalendarComponent
  @ViewChild(DataTableDirective, {static: false}) datatableElement : any = DataTableDirective
  dtOptions: DataTables.Settings = {};
  detailEvent = null
  reloadTable : boolean
  getState: Observable<any>;
  kategori=false
  public formTambah: FormGroup;
  constructor(
    private spinner:NgxSpinnerService,
    private roleService: RoleService,
    private fb: FormBuilder,
    private modal:ModalService,
    private jadwalStaffService: JadwalStafService,
    private router:Router
  ) {
    this.dtOptions= this.showDataTables()
   }
   filterLibur=true
   filterMasuk=true
   calendarApi: any
   listShift: any = []
   calendarEvents: EventInput[];
   calendarOptions: CalendarOptions = {
		headerToolbar: {
			// left: "createButton",
			left: "prev,next today",
			center: "title",
			right: null,
		},
		customButtons: {
			createButton: {
				text: 'Tambah Baru',
				click: () => this.CreateNew()
			},
			next: {
				click: this.nextMonth.bind(this),
			},
			prev: {
				click: this.backMonth.bind(this),
			},
			today: {
			  text: 'Today',
			  click: this.buttonToday.bind(this),
			}
		},
		initialView: "dayGridMonth",
		weekends: true,
		editable: true,
		selectable: true,
		selectMirror: true,
		dayMaxEvents: true,
		select: this.handleDateSelect.bind(this),
		eventClick: this.handleEventClick.bind(this),
	};
  showFilter=false
  showKalender=false
  titleModal=""
  month=["Jan","Feb","Mar","Apr","Mei","Jun","Jul","Aug","Sep","Oct","Nov","Des"]
  ngOnInit(): void {
    this.formTambah = this.fb.group({
			date_from: ["", [Validators.required]],
      id_shift: [null, [Validators.required]],
    })
    // this.roleService.getRoleByAKun()
		// 	.subscribe(succ => {
		// 		this.listShift = succ.response
		// 	})
    this.listShift=[
      {id_shift:1,nama_shift:"Shift1"}
    ]
    this.dtOptions=this.showDataTables()
    this.loadCalender()
  }
  loadCalender(){
		const tanggal = new Date()
		let m = parseInt(moment(new Date(tanggal)).format('M'))
		let y = moment(new Date(tanggal)).format('YYYY')
		// this.jadwalStaffService.getCalender(y, m)
		// 	.subscribe((resp: any) => {
		// 		if (resp.metaData.response_code == '0000') {
		// 			let event = []
		// 			resp.response.map((val, index) => {
					// if(this.filterLibur&&val.groupId=='libur')
					// event.push({
					// 	'id': val.id_jadwal_dokter,
					// 	'start': val.start,
					// 	'end': val.end,
					// 	'title': val.title,
					// 	'groupId':val.groupId,
					// 	'className': val.groupId == 'libur' ? 'bg-danger' : 'bg-info'
					// })
					
					// if(this.filterMasuk&&val.groupId=='masuk')
					// event.push({
					// 	'id': val.id_jadwal_dokter,
					// 	'start': val.start,
					// 	'end': val.end,
					// 	'title': val.title,
					// 	'groupId':val.groupId,
					// 	'className': val.groupId == 'libur' ? 'bg-danger' : 'bg-info'
					// })
		// 			})
		// 			this.calendarOptions.events = event
		// 		}

		// 	})
	}
	CreateNew() {
		this.calendarApi = this.calendar_ref.getApi();
		this.calendarOptions.events = this.calendarEvents

		this.calendarApi.render();
	}
	buttonToday(ini: any): void {
		this.loadCalender()
		this.calendarApi = this.calendar_ref.getApi();
		this.calendarApi.gotoDate(new Date())
	}

	nextMonth(): void {
		this.calendarApi = this.calendar_ref.getApi();
		const tanggal = this.calendarApi.view.calendar.currentData.currentDate
		let m = parseInt(moment(new Date(tanggal)).format('M')) + 1
		let y = moment(new Date(tanggal)).format('YYYY')
		this.jadwalStaffService.getCalender(y, m)
			.subscribe((resp: any) => {
				if (resp.metaData.response_code == '0000') {
					let event = []
					resp.response.map((val, index) => {
						event.push({
							'id': val.id_jadwal_staff,
							'start': val.start,
							'end': val.end,
							'title': val.title,
							'className': val.groupId == 'libur' ? 'bg-danger' : 'bg-info'
						})
					})
					this.calendarOptions.events = event
				}

			})



		// this.calendarApi.destroy();
		// this.calendarApi.render();
		this.calendarApi.next();
	}
	backMonth(): void {
		this.calendarApi = this.calendar_ref.getApi();
		const tanggal = this.calendarApi.view.calendar.currentData.currentDate
		let m = parseInt(moment(new Date(tanggal)).format('M')) - 1
		let y = moment(new Date(tanggal)).format('YYYY')
		this.jadwalStaffService.getCalender(y, m)
			.subscribe((resp: any) => {
				if (resp.metaData.response_code == '0000') {
					let event = []
					resp.response.map((val, index) => {
						event.push({
							'id': val.id_jadwal_staff,
							'start': val.start,
							'end': val.end,
							'user':'',
							'title': val.title,
							'className': val.groupId == 'libur' ? 'bg-danger' : 'bg-info'
						})
					})

					this.calendarOptions.events = event
				}

			})

		// this.calendarApi.destroy();
		// this.calendarApi.render();
		this.calendarApi.prev();
	}
	handleDateSelect(selectInfo: DateSelectArg) {
		this.addNewEvent(selectInfo);
	}
	addNewEvent(selectInfo: any) {
		console.log('selectInfo', selectInfo.row)
	}
	setDate(tgl) {
		return moment(new Date(tgl)).format('DD-MM-YYYY')
	}
	handleEventClick(info: EventClickArg) {
		this.eventClick(info.event);
	}

	eventClick(row) {
		this.detailEvent = row
		this.openModal('modalFormContent')
	}

  closeJadwal(){
    this.showFilter=false
  }
  prosesSelectShift(event: any, aksi: string) {
		this.listShift = this.searchProses(this.listShift, 'nama_shift', event)
	}
  openModal(val){
    this.modal.open(val);
  }
  closeModal(val){
    this.modal.close(val);
  }
  searchProses(data, key, search) {
		let res = []
		data.map((val, index) => {
			if (val[key].search(search) != -1) {
				res.push(val)
			}
		})
		return res
	}
  submitForm(){

  }
  onFocus(id){
		document.getElementById(id).click()
	}
  showDataTables() {
    this.spinner.show('spinner1')
    let selft=this
    return {
      pageLength: 10,
      serverSide: true,
      processing: true,
	  pagingType:'simple',
      order : [],
      ajax : (dataTablesParameters: any, callback: any) => {
        // this.daftarRuangService.getDataTables(dataTablesParameters)
        // .subscribe((resp : any) => {
        //   callback({
        //     draw: resp.response.draw,
        //     recordsTotal: resp.response.recordsTotal,
        //     recordsFiltered: resp.response.recordsFiltered,
        //     data: resp.response.data
        //   })
        //   this.spinner.hide('spinner1')
        // })
        callback({
          draw: 1,
          recordsTotal: 1,
          recordsFiltered: 1,
          data: [
            {
            nama_staff:'Jhon Doe',
            nama_akun:"Admin",
            shift:"Shift1",
            tanggal:new Date(),
            waktu_masuk:"10:30",
            waktu_keluar:"11:00",
            },
            
          ]
        })
        this.spinner.hide('spinner1')
      },
      columns : [
        {
          orderable: false,
          searchable: false,
          render(data: any, type: any, row: any, full: any) {
            return full.row + 1 + full.settings._iDisplayStart;
          }
        },
        {
          data: 'nama_staff'
        },
        {
          data: 'nama_akun'
        },
        {
          data: 'tanggal',
          render(data: any, type: any, row: any, full: any) {
            let date=new Date(data)
            return date.getDate()+" "+selft.month[date.getMonth()]+" "+date.getFullYear()+", "+date.getHours()+":"+date.getMinutes()
          }
        },
        {
          data: 'shift',
          render(data: any, type: any, row: any, full: any) {
            return `<div class="badge badge-success">${data}</div>`
          }
        },
        {
          data: 'waktu_masuk',
          render(data: any, type: any, row: any, full: any) {
            return row.waktu_masuk+'-'+row.waktu_keluar
          }
        },
        {
          orderable: false,
          searchable: false,
          render(data: any, type: any, row: any, full: any) {
            return `
           <button class="btn btn-link circle-primary text-ui-primary edit"><i class="far fa-edit"></i></button>
            <button class="btn btn-link circle-danger text-ui-danger nonaktif-data"><i class="far fa-trash-alt"></i></button>`;
          }
        }
      ],
      rowCallback: (row: Node, data: any[] | Object, index: number) => {
        const self = this;
        $('td .nonaktif-data', row).on('click', () => {
          self.nonAktif(data);
        });
        $('td .edit', row).on('click', () => {
          self.edit(data);
        });
      
        return row;
      }
    }
  }
  nonAktif(data){
    Swal.fire({
			title: 'Apakah anda yakin akan menghapus data ini ?',
			icon: 'warning',
			showCancelButton: true,
			allowOutsideClick: false,
			confirmButtonText: 'Ya, hapus saja!',
			cancelButtonText: 'Tidak, Batalkan'
		}).then((result) => {
			if (result.value) {

      }
    })
  }
  edit(data){
    this.titleModal='Edit'
    this.router.navigate(['jadwal-staff/edit', 1])
  }
 
}
