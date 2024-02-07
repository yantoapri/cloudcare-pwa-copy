import { Component, OnInit, ViewChild } from '@angular/core';
import { AkunPayload } from 'src/app/private/models/class-payload-api/manajemen-akun/akun-payload'
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Observable } from 'rxjs'
import { Store } from '@ngrx/store';
import * as fromApp from 'src/app/private/states/private-app.states'
import * as AkunActions from 'src/app/private/states/manajemen-akun/akun/akun.actions'
import Validation from '../utils/validation'
import { RoleService } from 'src/app/private/services/role-and-rights/role.service'
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DaftarKlinikService } from 'src/app/private/services/manajemen-klinik/daftar-klinik.service';
import { NgxSpinnerService } from "ngx-spinner";
import {ValidateService} from 'src/app/private/services/validate/validateService'
import {listState} from 'src/app/private/services/listState'
@Component({
	selector: 'app-edit',
	templateUrl: './edit.component.html',
	styleUrls: ['./edit.component.sass']
})
export class EditComponent implements OnInit {
	@ViewChild('saveStatusAkunCheckbox') saveStatusAkunCheckbox: any;

	listRoleAKun: any = []
	levelRoleAkun: number = 0
	dataMenu: any = []
	akun: AkunPayload = new AkunPayload
	getState: Observable<any>;
	public formTambah: FormGroup;
	isEdit: boolean
	isLoadingButton: boolean
	errorMessage: string = ''
	reloadTable: boolean
	statusAkunValueCheckbox: boolean = false
	labelStatusAkun: string = 'Aktif'
	listKlinik: Array<any> = []
	submitted: boolean = false
	hide: boolean = false
	hideRetype: boolean = false
	multi = false
	loadingRole = false
	loadingKlinik = false
	loadingState = false
	hideKlinik = true
	listState = []
	paramSelect = {
		"last_data": "0",
		"get_data": "10",
		"search": ""
	}
	constructor(
		private activatedRoute: ActivatedRoute,
		private fb: FormBuilder,
		private store: Store<fromApp.PrivateAppState>,
		private roleService: RoleService,
		private spinner : NgxSpinnerService,
		private validate:ValidateService,
		private daftarKlinikService: DaftarKlinikService,
		private codeNum:listState
	) {
		this.getState = this.store.select('managemenAkun_akun')
	}

	ngOnInit(): void {
		this.listState = this.codeNum.state()
		this.loadListKlinik()
		this.loadListNamaRole()
		this.formTambah = this.fb.group({
			nameakun: ["", [Validators.required]],

			password: ['', [Validators.minLength(6),]],
			confirm_password: ['', []],

			nama_lengkap: ["", [Validators.required]],
			email: ["", [Validators.required, Validators.email]],
			no_hp: [null, [Validators.required]],
			level_akun: [""],
			role_akun: [null, [Validators.required]],
			status_akun: [false],
			id_klinik: [""],
			dial_code:["+62", [Validators.required]]
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
		this.activatedRoute.params.subscribe((params: Params) => {
			if (params) {
				// console.log(params)
				this.store.dispatch(
					AkunActions.getAkunById({ payload: { id: params.id } })
				)
			}
		})
		this.getState.subscribe((state) => {
			this.akun = state.akun
			this.isLoadingButton = state.isLoadingButton
			this.errorMessage = state.errorMessage
			this.isEdit = state.isEdit

			if (this.akun != null) {
				if (this.isEdit === true) {

					this.levelRoleAkun = this.akun.level_akun
					let id_klinik = []
					this.akun.id_klinik.map((val, index) => {
						id_klinik.push(val.id_klinik)
					})
					if (this.akun.plant == 'all') {
						this.hideKlinik = true
						this.multi = false
					} else
						if (this.akun.plant == 'single') {
							this.hideKlinik = false
							this.multi = false
							id_klinik = id_klinik[0]
						} else
							if (this.akun.plant == 'multi') {
								this.hideKlinik = false
								this.multi = true
							}
					this.formTambah.patchValue({
						nameakun: this.akun.nameakun,
						nama_lengkap: this.akun.nama_lengkap,
						email: this.akun.email,
						no_hp: this.akun.no_hp,
						dial_code:this.akun.dial_code,
						status_akun: String(this.akun.status_akun),
						role_akun: this.akun.role_akun,
						level_akun: String(this.akun.level_akun),
						id_klinik: id_klinik
					})
					if (String(this.akun.status_akun) === '1') {
						this.statusAkunValueCheckbox = true
						this.labelStatusAkun = "Aktif"
					} else {
						this.statusAkunValueCheckbox = false
						this.labelStatusAkun = "Tidak Aktif"
					}

				}
			}

		})

		this.formTambah.controls['role_akun'].valueChanges.subscribe(value => {
			let cekIndex = this.listRoleAKun.findIndex((el, index) => {
				return el.id_akun_role == value
			})

			if (cekIndex >= 0) {
				let level = this.listRoleAKun[cekIndex] //find((op) => { return op.id_akun_role == value  })
				this.levelRoleAkun = level.level_akun
				if (level.level_akun >= 3) {
					this.formTambah.get('id_klinik').setValidators([Validators.required])
				} else {
					this.formTambah.get('id_klinik').clearValidators()
				}
				this.formTambah.get('id_klinik').updateValueAndValidity()
			}
		});

	}

	loadListKlinik() {
		this.daftarKlinikService.getAll()
			.subscribe(succ => {
				this.listKlinik = succ.response
			})
	}
	isNumber(e){
		return this.validate.Number(e)
	}
	changeStatusAkun(status: any) {
		this.statusAkunValueCheckbox = status
		if (status) {
			this.labelStatusAkun = "Aktif"
		} else {
			this.labelStatusAkun = "Tidak Aktif"
		}
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
	ChangeState($event: any) {

	}
	ngAfterViewInit() {
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
	submitForm() {
		this.submitted = false;
		setTimeout(() => {
			this.submitted = true;
		}, 300)
		if (this.formTambah.invalid) {
			return
		}
		this.spinner.show('spinner1')
		let payload = new AkunPayload
		payload.id_akun = this.akun.id_akun
		payload.passakun = this.formTambah.value.password
		payload.confirm_password = this.formTambah.value.confirm_password
		payload.nama_lengkap = this.formTambah.value.nama_lengkap
		payload.email = this.formTambah.value.email
		
		let no_hp = this.formTambah.value.no_hp.toString().substr(0, 1) == 0 ? this.formTambah.value.no_hp.toString().substr(1, this.formTambah.value.no_hp.length) : this.formTambah.value.no_hp
		payload.no_hp = no_hp
		payload.dial_code = this.formTambah.value.dial_code
		payload.level_akun = this.levelRoleAkun
		payload.role_akun = this.formTambah.value.role_akun
		payload.id_klinik = Array.isArray(this.formTambah.value.id_klinik) ? this.formTambah.value.id_klinik : [this.formTambah.value.id_klinik]
		if (this.statusAkunValueCheckbox === true) {
			payload.status_akun = 1
		} else {
			payload.status_akun = 0
		}
		// return false
		this.store.dispatch(
			AkunActions.updateAkun({ payload: payload })
		)
		setTimeout(() => {
			this.spinner.hide('spinner1')
		}, 400);
		// console.log('submit_form_bisa ', payload)
	}
	loadListNamaRole() {
		this.roleService.getRoleByAKun()
			.subscribe(succ => {
				this.listRoleAKun = succ.response
			})
	}

}
