import { DaftarKlinikPayload } from 'src/app/private/models/class-payload-api/manajemen-klinik/daftar-klinik-payload'
import { DaftarKlinikService } from 'src/app/private/services/manajemen-klinik/daftar-klinik.service'

import { Actions, ofType, createEffect } from '@ngrx/effects';
import { switchMap, catchError, map, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Injectable } from "@angular/core";
import Swal from 'sweetalert2/dist/sweetalert2.js'
import * as DaftarKlinikActions from './daftar-klinik.actions'

@Injectable()
export class DaftarKlinikEffects {
	constructor(
		private actions$: Actions,
		private daftarKlinikService: DaftarKlinikService
	) { }

	public Toast = Swal.mixin({
		toast: true,
		position: 'top-end',
		showConfirmButton: false,
		timer: 3000,
		timerProgressBar: true,
		didOpen: (toast) => {
			toast.addEventListener('mouseenter', Swal.stopTimer)
			toast.addEventListener('mouseleave', Swal.resumeTimer)
		}
	})

	addDaftarKlinik$ = createEffect(() =>
		this.actions$.pipe(
			ofType(DaftarKlinikActions.addDaftarKlinik),
			switchMap(action => {
				return this.daftarKlinikService.insert(action.payload)
					.pipe(
						map(res => {
							if (res.metaData.response_code != '0000') {
								this.Toast.fire({
									icon: 'error',
									title: res.metaData.message
								})
								return DaftarKlinikActions.tableData()
							}
							return DaftarKlinikActions.addDaftarKlinikSuccess({ payload: res.response })
						}),
						catchError(err => {
							this.Toast.fire({
								icon: 'error',
								title: err.metaData.message
							})
							return of(DaftarKlinikActions.addDaftarKlinikFailure({ message: err }))
						})
					)
			})
		)
	)
	addDaftarKlinikSuccess$ = createEffect(() =>
		this.actions$.pipe(
			ofType(DaftarKlinikActions.addDaftarKlinikSuccess),
			map(action => {
				this.Toast.fire({
					icon: 'success',
					title: 'Data berhasil disimpan'
				})
				return DaftarKlinikActions.tableData()
			})
		)
	)
	addDaftarKlinikFailure$ = createEffect(() => this.actions$.pipe(ofType(DaftarKlinikActions.addDaftarKlinikFailure)), { dispatch: false })

	updateDaftarKlinik$ = createEffect(() =>
		this.actions$.pipe(
			ofType(DaftarKlinikActions.updateDaftarKlinik),
			switchMap(action => {
				return this.daftarKlinikService.update(action.payload.id_klinik, action.payload)
					.pipe(
						map(res => {
							if (res.metaData.response_code != '0000') {
								this.Toast.fire({
									icon: 'error',
									title: res.metaData.message
								})
								return DaftarKlinikActions.tableData()
							}
							return DaftarKlinikActions.updateDaftarKlinikSuccess({ payload: res.response })
						}),
						catchError(err => {
							this.Toast.fire({
								icon: 'error',
								title: err.metaData.message
							})
							return of(DaftarKlinikActions.updateDaftarKlinikFailure({ message: err }))
						})
					)
			})
		)
	)
	updateDaftarKlinikSuccess$ = createEffect(() =>
		this.actions$.pipe(
			ofType(DaftarKlinikActions.updateDaftarKlinikSuccess),
			map(action => {
				this.Toast.fire({
					icon: 'success',
					title: 'Data berhasil disimpan'
				})
				return DaftarKlinikActions.tableData()
			})
		)
	)
	updateDaftarKlinikFailure$ = createEffect(() => this.actions$.pipe(ofType(DaftarKlinikActions.updateDaftarKlinikFailure)), { dispatch: false })

	getByIdDaftarKlinik$ = createEffect(() =>
		this.actions$.pipe(
			ofType(DaftarKlinikActions.getByIdDaftarKlinik),
			switchMap(action => {
				return this.daftarKlinikService.show(action.payload.id)
					.pipe(
						map(res => {
							return DaftarKlinikActions.getByIdDaftarKlinikSuccess({ payload: res.response })
						}),
						catchError(err => {
							return of(DaftarKlinikActions.getByIdDaftarKlinikFailure({ message: err }))
						})
					)
			})
		)
	)
	// getByIdDaftarKlinikSuccess$ = createEffect(() => this.actions$.pipe( ofType(DaftarKlinikActions.getByIdDaftarKlinikSuccess) ) )
	getByIdDaftarKlinikFailure$ = createEffect(() => this.actions$.pipe(ofType(DaftarKlinikActions.getByIdDaftarKlinikFailure)), { dispatch: false })

	deleteDaftarKlinik$ = createEffect(() =>
		this.actions$.pipe(
			ofType(DaftarKlinikActions.deleteDaftarKlinik),
			switchMap(action => {
				return this.daftarKlinikService.delete(action.payload.id)
					.pipe(
						map(res => {
							return DaftarKlinikActions.deleteDaftarKlinikSuccess({ payload: res.response })
						}),
						catchError(err => {
							return of(DaftarKlinikActions.deleteDaftarKlinikFailure({ message: err }))
						})
					)
			})
		)
	)

	deleteDaftarKlinikSuccess$ = createEffect(() =>
		this.actions$.pipe(
			ofType(DaftarKlinikActions.deleteDaftarKlinikSuccess),
			map(res => {
				this.Toast.fire({
					icon: 'success',
					title: 'Data berhasil dihapus'
				})
				return DaftarKlinikActions.tableData()
			})
		)
	)
	deleteDaftarKlinikFailure$ = createEffect(() => this.actions$.pipe(ofType(DaftarKlinikActions.deleteDaftarKlinikFailure)), { dispatch: false })
}
