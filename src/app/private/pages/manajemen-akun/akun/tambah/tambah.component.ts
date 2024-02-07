import { Component, OnInit, ViewChild } from '@angular/core';
import { AkunPayload } from 'src/app/private/models/class-payload-api/manajemen-akun/akun-payload'
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";
import { Observable } from 'rxjs'
import { Store } from '@ngrx/store';
import * as fromApp from 'src/app/private/states/private-app.states'
import * as AkunActions from 'src/app/private/states/manajemen-akun/akun/akun.actions'
import Validation from '../utils/validation'
import { RoleService } from 'src/app/private/services/role-and-rights/role.service'
import { DaftarKlinikService } from 'src/app/private/services/manajemen-klinik/daftar-klinik.service';
// import { event } from 'jquery';
import { NgxSpinnerService } from "ngx-spinner";
import {ValidateService} from 'src/app/private/services/validate/validateService'
import {listState} from 'src/app/private/services/listState'
@Component({
	selector: 'app-tambah',
	templateUrl: './tambah.component.html',
	styleUrls: ['./tambah.component.sass']
})
export class TambahComponent implements OnInit {

	constructor(
		private fb: FormBuilder,
		private store: Store<fromApp.PrivateAppState>,
		private roleService: RoleService,
		private validate:ValidateService,
		private spinner : NgxSpinnerService,
		private daftarKlinikService: DaftarKlinikService,
		private codeNum:listState
	) {
		this.getState = this.store.select('managemenAkun_akun')
		this.errorMessage = null
	}
	// tabPane : any = [true, false, false]
	@ViewChild('saveStatusAkunCheckbox') saveStatusAkunCheckbox: any;
	tabPane: any = {
		pane1: true,
		pane2: false,
		pane3: false,
	}
	listRoleAKun: any = []
	levelRoleAkun: number = 0
	dataMenu: any = []
	akun: AkunPayload = new AkunPayload()
	getState: Observable<any>;
	public formTambah: FormGroup;
	labelStatusAkun: string = 'Aktif'
	isLoadingButton: boolean
	errorMessage: string = ''
	reloadTable: boolean
	statusAkunValueCheckbox: boolean = true
	listKlinik: Array<any> = []
	submitted: boolean = false
	loadingRole = false
	loadingKlinik = false
	loadingState = false
	multi = false
	hideKlinik = true
	listState = []
	paramSelect = {
		"last_data": "0",
		"get_data": "10",
		"search": ""
	}
	// role_akun = new FormControl("")
	ngOnInit(): void {
		this.listState = this.codeNum.state()
		this.loadListKlinik()
		this.loadListNamaRole()
		this.formTambah = this.fb.group({
			nameakun: ["", [Validators.required]],
			password: ['', [Validators.required, Validators.minLength(6),]],
			confirm_password: ['', [Validators.required]],
			nama_lengkap: ["", [Validators.required]],
			email: ["", [Validators.required, Validators.email]],
			no_hp:[null, [Validators.required]],
			level_akun: [""],
			role_akun: [null, [Validators.required]],
			status_akun: ["true"],
			id_klinik: [],
			dial_code: ["+62", [Validators.required]]
		}, {
			validators: [Validation.match('password', 'confirm_password')]
		});

		this.roleService.getRoleByAKun()
			.subscribe(succ => {
				this.listRoleAKun = succ.response
			})

		this.daftarKlinikService.getSelect(this.paramSelect)
			.subscribe(succ => {
				this.listKlinik = succ.response
			})

		this.formTambah.controls['role_akun'].valueChanges.subscribe(value => {
			let level = this.listRoleAKun.find((op) => { return op.id_akun_role == value })
			if(level){
				this.levelRoleAkun = level.level_akun
				// console.log('value_level' , this.levelRoleAkun);
				if (level.level_akun >= 3) {
					this.formTambah.get('id_klinik').setValidators([Validators.required])
				} else {
					this.formTambah.get('id_klinik').clearValidators()
				}
				this.formTambah.get('id_klinik').updateValueAndValidity()
			}
		});

		this.store.dispatch(
			AkunActions.clearState()
		)

		this.getState.subscribe((state) => {
			this.akun = state.akun
			this.isLoadingButton = state.isLoadingButton
			this.errorMessage = state.errorMessage
			
		})
		// this.dataMenu = this.rightService.ShowData()
	}

	loadListKlinik() {
		
	}
	isNumber(e){
		return this.validate.Number(e)
	}
	ngAfterContentInit() {

	}

	ChangeStatusAkun(status: any) {
		this.statusAkunValueCheckbox = status
		if (status) {
			this.labelStatusAkun = "Aktif"
		} else {
			this.labelStatusAkun = "Tidak Aktif"
		}
	}
	ChangeKlinikAKun(event) {
		console.log(event)
		console.log(this.formTambah.value)
	}
	submitForm() {
		this.submitted = false;
		setTimeout(() => {
			this.submitted = true;
		}, 300)
		if (this.formTambah.invalid) {
			return
		}
		this.spinner.show('spinner1')
		let payload = new AkunPayload()
		payload.nameakun = this.formTambah.value.nameakun
		payload.passakun = this.formTambah.value.password
		payload.confirm_password = this.formTambah.value.confirm_password
		payload.nama_lengkap = this.formTambah.value.nama_lengkap
		payload.email = this.formTambah.value.email
		
		let no_hp = this.formTambah.value.no_hp.toString().substr(0, 1) == '0' ? this.formTambah.value.no_hp.toString().substr(1, this.formTambah.value.no_hp.length) : this.formTambah.value.no_hp
		payload.no_hp = no_hp
		payload.dial_code = this.formTambah.value.dial_code
		payload.level_akun = this.levelRoleAkun
		payload.id_klinik = this.formTambah.value.id_klinik
		payload.role_akun = this.formTambah.value.role_akun
		payload.id_klinik = Array.isArray(this.formTambah.value.id_klinik) ? this.formTambah.value.id_klinik : [this.formTambah.value.id_klinik]
		// payload.status_akun = this.formTambah.value.status_akun
		// if (this.formTambah.value.status_akun === true)  {
		//   payload.status_akun = 1
		// } else {
		//   payload.status_akun = 0
		//   // console.log('isi false')
		// }

		if (this.statusAkunValueCheckbox === true) {
			payload.status_akun = 1
		} else {
			payload.status_akun = 0
		}
		// payload.id_klinik

		this.store.dispatch(
			AkunActions.addAkun({ payload: payload })
		)
		setTimeout(() => {
			this.spinner.hide('spinner1')
		}, 400);

	}
	ShowTabPane(nomor: number) {
		if (nomor == 1) {
			this.tabPane.pane1 = true
			this.tabPane.pane2 = false
			this.tabPane.pane3 = false
		} else if (nomor == 2) {
			this.tabPane.pane1 = false
			this.tabPane.pane2 = true
			this.tabPane.pane3 = false
		} else {
			this.tabPane.pane1 = false
			this.tabPane.pane2 = false
			this.tabPane.pane3 = true
		}
	}
	ChangeState($event: any) {

	}
	ChangeRoleAKun($event: any) {
		if($event){
			if ($event.plant == "all") {
				this.hideKlinik = true;
			} else
				if ($event.plant == "multi") {
	
					this.hideKlinik = false
					this.multi = true
				} else {
					this.hideKlinik = false
					this.multi = false
				}
			this.formTambah.patchValue({
				id_klinik: []
			})
		}
	}

	ngAfterViewInit() {
	}
	loadListNamaRole() {
		this.roleService.getRoleByAKun()
			.subscribe(succ => {
				this.listRoleAKun = succ.response

			})
	}
	prosesSelectState(event: any, aksi: string) {
		this.loadingState = true

		if (aksi == 'search') {
			let arr = []
			this.listState.map((val) => {
				if (val.name.search(event)) {
					arr.push(val)
				}
			})
			this.listState = arr
		}
		this.loadingState = false
	}
	prosesSelectRole(event: any, aksi: string) {
		this.listRoleAKun = this.searchProses(this.listRoleAKun, 'nama_role', event)
	}
	prosesSelectKlinik(event: any, aksi: string) {
		this.listKlinik = this.searchProses(this.listKlinik, 'nama_klinik', event)
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
	fieldsChange($event: any, index: any) {
		this.dataMenu[index].value_checkbox = $event.target.checked
		this.loop_pertama($event.target.checked, index)
	}

	loop_pertama(value: boolean, index: number) {
		this.dataMenu[index].child.forEach((el, ind) => {
			el.value_checkbox = value
			if (el.child.length > 0) {
				el.child.forEach(ele => {
					ele.value_checkbox = value
					if (ele.child.length > 0) {
						ele.child.forEach(elem => {
							elem.value_checkbox = value
							if (elem.child.length > 0) {
								elem.child.forEach(elemen => {
									elemen.value_checkbox = value
								});
							}
						});
					}
				});
			}
		});
	}

	fieldsChange_kedua($event: any, simbah: any, ayah: any) {
		this.dataMenu[simbah].child[ayah].value_checkbox = $event.target.checked
		this.loop_kedua($event.target.checked, simbah, ayah)

		let data_false = this.dataMenu[simbah].child.find((o) => {
			return o.value_checkbox === false
		})

		if (data_false === undefined) {
			/**nek diisi kabeh */
			this.dataMenu[simbah].value_checkbox = true
			this.dataMenu[simbah].indeterminate = false
		} else {
			this.dataMenu[simbah].value_checkbox = false
			this.dataMenu[simbah].indeterminate = true
		}
	}

	loop_kedua(value: boolean, simbah: number, ayah: number) {
		this.dataMenu[simbah].child[ayah].child.forEach(el => {
			el.value_checkbox = value
			if (el.child.length > 0) {
				el.child.forEach(ele => {
					ele.value_checkbox = value
					if (ele.child.length > 0) {
						ele.child.forEach(elem => {
							elem.value_checkbox = value
						});
					}
				});
			}
		});
	}

	public noWhitespaceValidator(control: FormControl) {
		const isWhitespace = (control.value || '').trim().length === 0;
		const isValid = !isWhitespace;
		return isValid ? null : { 'whitespace': true };
	}

}



