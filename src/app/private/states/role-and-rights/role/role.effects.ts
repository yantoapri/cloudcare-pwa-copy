import { Injectable } from "@angular/core";
import { Router } from '@angular/router';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { switchMap, catchError, map, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import { RoleService } from 'src/app/private/services/role-and-rights/role.service'
import * as RoleAction from './role.actions'
@Injectable()
export class RoleEffects {
	constructor(
		private actions$: Actions,
		private router: Router,
		private roleService: RoleService
	) { }

	addRole$ = createEffect(() =>
		this.actions$.pipe(
			ofType(RoleAction.addRole),
			switchMap(action => {
				return this.roleService.insert(action.payload)
					.pipe(
						map(res => {
							return RoleAction.addRoleSuccess({ payload: res.response })
						}), catchError(err => {
							return of(
								RoleAction.addRoleFailure({ message: err.metaData.message })
							)
						})
					)
			})
		)
	);
	addRoleSuccess$ = createEffect(() =>
		this.actions$.pipe(
			ofType(RoleAction.addRoleSuccess),
			tap(action => {
				Swal.fire({
					title: 'Data berhasil disimpan',
					icon: 'success',
					showCancelButton: false,
					allowOutsideClick: false,
					confirmButtonText: 'Ya, lanjutkan!',
				}).then((result) => {
					if (result.value) {
						this.router.navigate(['role-and-rights', 'role', 'view'])
					}
				})
			})
		), { dispatch: false }
	);

	addRoleFailure$ = createEffect(() =>
		this.actions$.pipe(
			ofType(RoleAction.addRoleFailure)
		), { dispatch: false }
	);

	editRole$ = createEffect(() =>
		this.actions$.pipe(
			ofType(RoleAction.editRole),
			switchMap(action => {
				return this.roleService.update(action.payload.id_akun_role, action.payload)
					.pipe(
						map(res => {

							return RoleAction.editRoleSuccess({ payload: res.response })
						}),
						catchError(err => {
							return of(
								RoleAction.editRoleFailure({ message: err.metaData.message })
							)
						})
					)
			})
		)
	);

	editRoleSuccess$ = createEffect(() =>
		this.actions$.pipe(
			ofType(RoleAction.editRoleSuccess),
			tap(action => {
				Swal.fire({
					title: 'Data berhasil diubah',
					icon: 'success',
					showCancelButton: false,
					allowOutsideClick: false,
					confirmButtonText: 'Ya, lanjutkan!',
				}).then((result) => {
					if (result.value) {
						this.router.navigate(['role-and-rights', 'role', 'view'])
					}
				})
			})
		), { dispatch: false }
	);

	editRoleFailure$ = createEffect(() =>
		this.actions$.pipe(
			ofType(RoleAction.editRoleFailure)
		), { dispatch: false }
	);

	getRoleById$ = createEffect(() =>
		this.actions$.pipe(
			ofType(RoleAction.getRoleById),
			switchMap(action => {
				return this.roleService.show(action.payload.id)
					.pipe(
						map(res => {
							// let payload = {

							//   id_akun_role : Number(res.response.id_akun_role),
							//   id_role_type : Number(res.response.id_role_type),
							//   id_akun_level : Number(res.response.id_akun_Level),
							//   nama_role : res.response.nama_role,
							//   detail : this.roleService.functionFilterJson(res.response.detail)
							// }
							// console.log('state', res.response.detail)
							return RoleAction.getRoleByIdSuccess({ payload: res.response })
						}),
						catchError(err => {
							return of(
								RoleAction.getRoleByIdFailure({ message: err.metaData.message })
							)
						})
					)
			})
		)
	);
	// getRoleByIdSuccess$ = createEffect(() => this.actions$.pipe( ofType(RoleAction.getRoleByIdSuccess) ) );
	getRoleByIdFailure$ = createEffect(() =>
		this.actions$.pipe(
			ofType(RoleAction.getRoleByIdFailure)
		), { dispatch: false }
	);

	deleteRole$ = createEffect(() =>
		this.actions$.pipe(
			ofType(RoleAction.deleteRole),
			switchMap(action => {
				return this.roleService.delete(action.payload.id)
					.pipe(
						map(res => {
							return RoleAction.deleteRoleSuccess({ payload: res.response })
						}),
						catchError(err => {
							return of(
								RoleAction.deleteRoleFailure({ message: err.metaData.message })
							)
						})
					)
			})
		)
	);
	deleteRoleSuccess$ = createEffect(() =>
		this.actions$.pipe(
			ofType(RoleAction.deleteRoleSuccess),
			map(action => {
				return RoleAction.tableData()
			})
		), { dispatch: false }
	);

	deleteRoleFailure$ = createEffect(() =>
		this.actions$.pipe(
			ofType(RoleAction.deleteRoleFailure)
		), { dispatch: false }
	);
}
