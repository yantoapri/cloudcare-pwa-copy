
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { Observable } from 'rxjs'
import { Store } from '@ngrx/store';
import * as fromApp from 'src/app/private/states/private-app.states'
import * as MenuRightActions from 'src/app/private/states/manajemen-menu/menu-right/menu-right.actions'
import { MenuRightPayload } from 'src/app/private/models/class-payload-api/manajemen-menu/menu-right-payload';
import { MenuService } from 'src/app/private/services/manajemen-menu/menu.service';
import { RepoServiceService } from 'src/app/private/services/manajemen-menu/repo-service.service'
import { RepoService } from 'src/app/private/services/manajemen-menu/repo.service'
import { NgxSpinnerService } from "ngx-spinner";
@Component({
	selector: 'app-add',
	templateUrl: './add.component.html',
	styleUrls: ['./add.component.sass']
})
export class AddComponent implements OnInit {
	@ViewChild('selectRepoService') selectRepoService: ElementRef;
	titleModal: string
	aksiModal: string
	isEdit: boolean
	isLoadingButton: boolean
	reloadTable: boolean
	errorMessage: any | null
	submitButton: boolean
	public formTambah?: FormGroup;
	listNamaMenu: any
	listNamaRepo: any
	listNamaRepoService: any
	dumpArrayRepoService = new FormArray([])
	getState: Observable<any>;
	menuRight: MenuRightPayload = new MenuRightPayload
	submitted: boolean = false
	id_repo_service: any = null
	constructor(
		private fb: FormBuilder,
		private menuService: MenuService,
		private repoServiceService: RepoServiceService,
		private repoService: RepoService,
		private store: Store<fromApp.PrivateAppState>,
		private spinner : NgxSpinnerService,

	) {
		this.getState = this.store.select('manajemenMenu_menuRight')
	}

	ngOnInit(): void {
		this.formTambah = this.fb.group({
			id_menu: ["", [Validators.required]],
			nama_menu_right: [null, [Validators.required]],
			status_rw: ["", [Validators.required]],
			status_aktif: [1, []],
			kode:""
		})
		this.loadListNamaMenu()
		this.loadListRepo()

		this.getState.subscribe((state) => {
			this.menuRight = state.menuRight
			this.isLoadingButton = state.isLoadingButton
			this.errorMessage = state.errorMessage
			this.submitButton = state.submitButton
		})
	}
	setStatus(val) {
		this.formTambah.patchValue({
			status_aktif: val
		})
	}

	SubmitForm() {
		this.submitted = false
		setTimeout(() => { this.submitted = true }, 200)
		if (this.formTambah.invalid) {
			return
		}
		this.spinner.show('spinner1')
		let payload = new MenuRightPayload
		payload.id_menu = this.formTambah.value.id_menu
		payload.nama_menu_right = this.formTambah.value.nama_menu_right
		payload.status_rw = this.formTambah.value.status_rw
		payload.status_aktif = Number(this.formTambah.value.status_aktif)
		payload.service = this.dumpArrayRepoService.value
		payload.kode=this.formTambah.value.kode
		this.store.dispatch(
			MenuRightActions.addMenuRight({ payload: payload })
		)
		setTimeout(() => {
			this.spinner.hide('spinner1')
		}, 400);
	}
	AddRepoServiceToArray() {
		let idSelectRepoService = this.id_repo_service
		if (idSelectRepoService != "") {
			let indexListRepoSer = this.listNamaRepoService.findIndex((el, index) => {
				return el.id_repo_service == idSelectRepoService
			})

			if (indexListRepoSer >= 0) {
				let find = this.listNamaRepoService[indexListRepoSer]
				const newGroup = new FormGroup({});
				let cekHaveRepo = this.dumpArrayRepoService.value.findIndex((el, index) => {
					return el.id_repo_service == find.id_repo_service
				})
				if (cekHaveRepo >= 0) {
					alert('Sepertinya anda sudah menambahkan data ini')
				} else {
					newGroup.addControl('id_repo_service', new FormControl(find.id_repo_service))
					newGroup.addControl('nama_service', new FormControl(find.nama_service))
					this.dumpArrayRepoService.push(newGroup)
				}
			}

		}
	}
	HapusRepoServiceFormList(id_repo_service: number) {
		let cekHaveRepo = this.dumpArrayRepoService.value.findIndex((el, index) => {
			return el.id_repo_service == id_repo_service
		})

		if (cekHaveRepo >= 0) {
			this.dumpArrayRepoService.removeAt(cekHaveRepo)
		}
	}
	loadListRepo() {
		this.repoService.listRepo()
			.subscribe(succ => {
				this.listNamaRepo = succ.response
			})
	}
	ChangeListRepo(event: any) {
		this.repoServiceService.getRepoServiceByIdRepo(event)
			.subscribe(succ => {
				this.listNamaRepoService = []
				this.listNamaRepoService = succ.response
			})
	}
	loadListNamaMenu() {
		this.menuService.getMenuAll()
			.subscribe(succ => {
				this.listNamaMenu = succ.response
			})
	}
	prosesSelectMenu(event, aksi) {
		if (aksi == 'search') {
			let arr = []
			this.listNamaMenu.map((val) => {
				if (val.nama_menu.search(event)) {
					arr.push(val)
				}
			})
			this.listNamaMenu = arr
		}
	}
	prosesSelectRepo(event, aksi) {
		if (aksi == 'search') {
			let arr = []
			this.listNamaRepo.map((val) => {
				if (val.nama_repo.search(event)) {
					arr.push(val)
				}
			})
			this.listNamaRepo = arr
		}
	}
	changeRepoService(event) {
		this.id_repo_service = event
	}
	prosesSelectRepoService(event, aksi) {
		if (aksi == 'search') {
			let arr = []
			this.listNamaRepoService.map((val) => {
				if (val.nama_service.search(event)) {
					arr.push(val)
				}
			})
			this.listNamaRepoService = arr
		}
	}

}
