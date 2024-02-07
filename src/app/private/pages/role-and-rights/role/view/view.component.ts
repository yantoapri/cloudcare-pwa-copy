import { Component, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables'
import { Observable } from 'rxjs'
import { RoleService } from 'src/app/private/services/role-and-rights/role.service'
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import * as fromApp from 'src/app/private/states/private-app.states'
import * as RoleActions from 'src/app/private/states/role-and-rights/role/role.actions'
import { RolePayload } from 'src/app/private/models/class-payload-api/role-and-rights/role-payload'
import Swal from 'sweetalert2/dist/sweetalert2.js'
import { NgxSpinnerService } from "ngx-spinner";

@Component({
	selector: 'app-view',
	templateUrl: './view.component.html',
	styleUrls: ['./view.component.sass']
})
export class ViewComponent implements OnInit {

	constructor(
		private roleService: RoleService,
		private spinner : NgxSpinnerService,
		private store: Store<fromApp.PrivateAppState>,
		private router: Router,
	) {
		this.getState = this.store.select('roleAkun')
	}

	getState: Observable<any>;
	@ViewChild(DataTableDirective, { static: false }) datatableElement: any = DataTableDirective
	dtOptions: DataTables.Settings = {};
	role: RolePayload = new RolePayload
	isLoadingButton: boolean
	errorMessage: string
	reloadTable: boolean

	ngOnInit(): void {
		this.dtOptions = this.showDataTables()

		this.getState.subscribe((state) => {
			this.reloadTable = state.reloadTable
			this.isLoadingButton = state.isLoadingButton
			this.errorMessage = state.errorMessage
			if (this.reloadTable === true) {
				this.reLoadData()
			}
		})

	}

	showDataTables() {
		this.spinner.show('spinner1')
		return {
			pageLength: 10,
			serverSide: true,
			processing: true,
			order: [],
			ajax: (dataTablesParameters: any, callback: any) => {
				this.roleService.getDataTables(dataTablesParameters)
					.subscribe((resp: any) => {
						this.spinner.hide('spinner1')
						callback({
							draw: resp.response.draw,
							recordsTotal: resp.response.recordsTotal,
							recordsFiltered: resp.response.recordsFiltered,
							data: resp.response.data
						});
					})
			},
			columns: [
				{
					data: 'no',
					orderable: false,
					searchable: false,
					render(data: any, type: any, row: any, full: any) {
						return full.row + 1 + full.settings._iDisplayStart;
					}
				},
				{
					data: 'nama_role'
				}, {
					data: 'nama_role_type'
				},
				{
					data: 'nama_level',
					render(data: any, type: any, row: any, full: any) {
						return 'Level ' + row.level_akun + "-" + data
					}
				}, {

					orderable: false,
					searchable: false,
					render(data: any, type: any, row: any, full: any) {
						return '<button class="btn btn-link circle-primary text-ui-primary update-data "><i class="far fa-edit"></i></button> <button class="btn btn-link circle-danger text-ui-danger nonaktif-data"><i class="far fa-trash-alt"></i></button>';
					}
				},
			],
			rowCallback: (row: Node, data: any[] | Object, index: number) => {
				const self = this;
				$('td .update-data', row).on('click', () => {
					self.editData(data);
				});
				$('td .nonaktif-data', row).on('click', () => {
					self.nonAktif(data);
				});
				return row;
			}
		}
	}
	editData(data: any) {
		this.router.navigate(['role-and-rights', 'role', 'ubah', data.id_akun_role])
	}
	nonAktif(data: any) {
		// console.log(data)
		Swal.fire({
			title: 'Apakah anda yakin akan menghapus data ini ?',
			icon: 'warning',
			showCancelButton: true,
			allowOutsideClick: false,
			confirmButtonText: 'Ya, Non aktifkan saja!',
			cancelButtonText: 'Tidak, Batalkan'
		}).then((result) => {
			if (result.value) {
				this.spinner.show('spinner1')
				this.store.dispatch(
					RoleActions.deleteRole({ payload: { id: data.id_akun_role } })
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

}
