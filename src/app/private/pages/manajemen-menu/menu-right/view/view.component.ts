import { Component, OnInit, ViewChild} from '@angular/core';
import { NgbModal} from "@ng-bootstrap/ng-bootstrap";
import { DataTableDirective } from 'angular-datatables'
import { Observable } from 'rxjs'
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Store } from '@ngrx/store';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import * as fromApp from 'src/app/private/states/private-app.states'
import * as MenuRightActions from 'src/app/private/states/manajemen-menu/menu-right/menu-right.actions'
import { MenuRightPayload } from 'src/app/private/models/class-payload-api/manajemen-menu/menu-right-payload';
import { MenuRightService } from 'src/app/private/services/manajemen-menu/menu-right.service';
import { MenuService } from 'src/app/private/services/manajemen-menu/menu.service';
import { Router } from '@angular/router'
import { NgxSpinnerService } from "ngx-spinner";

@Component({
	selector: 'app-view',
	templateUrl: './view.component.html',
	styleUrls: ['./view.component.sass']
})
export class ViewComponent implements OnInit {

	getState: Observable<any>;

	@ViewChild('formContent') formContent: any;
	@ViewChild(DataTableDirective, { static: false }) datatableElement: any = DataTableDirective
	dtOptions: DataTables.Settings = {};
	menuRight: MenuRightPayload = new MenuRightPayload
	titleModal: string
	aksiModal: string
	isEdit: boolean
	id_select_menu = null
	isLoadingButton: boolean
	reloadTable: boolean
	errorMessage: any | null
	submitButton: boolean
	public formTambah?: FormGroup;
	listNamaMenu: any
	listMenuExistRight: any
	constructor(
		private menuRightService: MenuRightService,
		private menuService: MenuService,
		private modalService: NgbModal,
		private fb: FormBuilder,
		private store: Store<fromApp.PrivateAppState>,
		private router: Router,
		private spinner : NgxSpinnerService,
	) {
		this.getState = this.store.select('manajemenMenu_menuRight')
	}
	btnDetail=false
	btnDelete=false
	btnEdit=false
	btnSetting=false
	btnAdd=false
	view=false
	ngOnInit(): void {
		let item=JSON.parse(localStorage.getItem('currentUser'))
		item=item.menu_right
		this.btnAdd=this.btnDelete=this.btnEdit=item.findIndex((val)=>val.kode=='RRMNMR2')!=-1?true:false
		this.btnDetail=this.view=item.findIndex((val)=>val.kode=='RRMNMR1')!=-1?true:false

		if(!this.view){
			Swal.fire("Warning","Anda tidak mempunyai akses halaman ini",'warning').then(()=>{
			window.location.href='/'
			})
		}

		this.loadListMenuExistsRight()
		this.dtOptions = this.showDataTables(this.btnEdit)
		// this.loadListNamaMenu()
		this.formTambah = this.fb.group({
			id_menu: ["", [Validators.required]],
			nama_menu_right: ["", [Validators.required]],
			status_rw: ["", [Validators.required]],
			status_aktif: ["1", []],
		})

		this.getState.subscribe((state) => {
			this.menuRight = state.menuRight
			this.isLoadingButton = state.isLoadingButton
			this.reloadTable = state.reloadTable
			this.errorMessage = state.errorMessage
			this.submitButton = state.submitButton
			this.isEdit = state.isEdit
			
			if (this.reloadTable) {
				this.reLoadData()
			}
		})
	}

	loadListMenuExistsRight() {
		this.menuService.getAllByExistsRight()
			.subscribe(succ => {
				if (succ) {
					this.listMenuExistRight = succ.response.sort((a, b) => a.level_menu - b.level_menu)

				}
			})
	}
	prosesSelectMenu(event, aksi) {
		if (aksi == 'search') {
			let arr = []
			this.listMenuExistRight.map((val) => {
				if (val.nama_menu.search(event)) {
					arr.push(val)
				}
			})
			this.listMenuExistRight = arr
		}
	}
	
	loadListNamaMenu() {
		this.menuService.getMenuAll()
			.subscribe(succ => {
				this.listNamaMenu = succ.response
			})
	}

	FormModalOpen(content) {
		this.modalService.open(content, { ariaLabelledBy: "modal-basic-title" });
		this.titleModal = "Form Tambah Menu Right"
		this.aksiModal = 'add'
		this.store.dispatch(
			MenuRightActions.clearData()
		)
		this.formTambah.patchValue({
			id_menu: "",
			nama_menu_right: "",
			status_rw: "",
			status_aktif: "1"
		})
	}
	editData(data: any) {
		this.router.navigate(['manajemen-menu', 'menu-right', 'edit', data.id_menu_right])
		
	}
	nonAktif(data: any) {
		Swal.fire({
			title: 'Apakah anda yakin akan menghapus data ini ?',
			icon: 'warning',
			showCancelButton: true,
			allowOutsideClick: false,
			confirmButtonText: 'Ya, hapus saja!',
			cancelButtonText: 'Tidak, Batalkan'
		}).then((result) => {
			if (result.value) {
				this.spinner.show('spinner1')
				this.store.dispatch(
					MenuRightActions.deleteMenuRight({ payload: { id: data.id_menu_right } })
				)
				setTimeout(() => {
					this.spinner.hide('spinner1')
				}, 400);
			}
		})

	}
	reLoadData() {
		this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
			dtInstance.ajax.reload();
		});
	}
	showDataTables(edit) {
		this.spinner.show('spinner1')
		return {
			pageLength: 10,
			serverSide: true,
			processing: true,
			order: [],
			ajax: (dataTablesParameters: any, callback: any) => {
				let id = this.id_select_menu == null ? "" : this.id_select_menu
				Object.assign(dataTablesParameters, { id_menu: id })
				this.menuRightService.getDataTables(dataTablesParameters)
					.subscribe((resp: any) => {
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
				}, {
					data: 'nama_menu_right'
				},
				
				 {
					data: 'status_rw'
				}, {
					orderable: false,
					searchable: false,
					data: 'nama_menu'
				},
				{
					data:'kode'
				},
				 {
					data: 'status_aktif',
					render(data: any, type: any, row: any, full: any) {
						if (data == '1') {
							return '<span class="badge col-green">Aktif</span>'
						} else {
							return '<span class="badge col-red">Tidak Aktif</span>'
						}
					}
				}, {
					orderable: false,
					searchable: false,
					render(data: any, type: any, row: any, full: any) {
						return edit?'<button class="btn btn-sm btn-ubah update-data ">Edit</button>'+ 
						'<button class="btn nonaktif-data btn-hapus btn-sm">Hapus</button>':'';
					}
				}
			],
			rowCallback: (row: Node, data: any | Object, index: number) => {
				const self = this;
				$('td .update-data', row).on('click', () => {
					self.editData(data);
				}).on('contextmenu',()=>{
					window.open('/#/manajemen-menu/menu-right/edit/'+data.id_menu_right,'_blank')
				});
				$('td .nonaktif-data', row).on('click', () => {
					self.nonAktif(data);
				});
				return row;
			}

		}
	}
}
