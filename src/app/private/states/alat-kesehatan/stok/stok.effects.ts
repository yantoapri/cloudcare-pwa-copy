import { stokPayload } from 'src/app/private/models/class-payload-api/gudang-transaksi/stok-payload'
import { ModulStokService } from 'src/app/private/modul-api/modul-gudang-transaksi/modul-stok.service'

import { Actions, ofType, createEffect } from '@ngrx/effects';
import { switchMap, catchError, map, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Injectable } from "@angular/core";
import Swal from 'sweetalert2/dist/sweetalert2.js'
import * as stokActions from './stok.action'

@Injectable()
export class stokEffects {
	constructor(
		private actions$: Actions,
		private ModulStokService: ModulStokService
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

	addstok$ = createEffect(() =>
		this.actions$.pipe(
			ofType(stokActions.addInitial),
			switchMap(action => {
				return this.ModulStokService.add(action.payload)
					.pipe(
						map(res => {
							return stokActions.addSuccess({ payload: res.response })
						}),
						catchError(err => {
							return of(stokActions.addFailure({ message: err }))
						})
					)
			})
		)
	)
	addstokSuccess$ = createEffect(() =>
		this.actions$.pipe(
			ofType(stokActions.addSuccess),
			map(action => {
				this.Toast.fire({
					icon: 'success',
					title: 'Data berhasil disimpan'
				})
				return stokActions.tableData()
			})
		)
	)
	addstokFailure$ = createEffect(() => this.actions$.pipe(ofType(stokActions.addFailure)), { dispatch: false })

	// updatestok$ = createEffect(() =>
	//     this.actions$.pipe(
	//         ofType(stokActions.updateInitial),
	//         switchMap(action => {
	//             return this.ModulStokService.update(action.payload.id_alat_kesehatan, action.payload)
	//                 .pipe(
	//                     map(res => {
	//                         return stokActions.updateSuccess({ payload: res.response })
	//                     }),
	//                     catchError(err => {
	//                         return of(stokActions.updateFailure({ message: err }))
	//                     })
	//                 )
	//         })
	//     )
	// )
	updatestokSuccess$ = createEffect(() =>
		this.actions$.pipe(
			ofType(stokActions.updateSuccess),
			map(action => {
				this.Toast.fire({
					icon: 'success',
					title: 'Data berhasil disimpan'
				})
				return stokActions.tableData()
			})
		)
	)
	updatestokFailure$ = createEffect(() => this.actions$.pipe(ofType(stokActions.updateFailure)), { dispatch: false })

	getByIdstok$ = createEffect(() =>
		this.actions$.pipe(
			ofType(stokActions.getByIdInitial),
			switchMap(action => {
				return this.ModulStokService.show(action.payload.id)
					.pipe(
						map(res => {
							return stokActions.getByIdSuccess({ payload: res.response })
						}),
						catchError(err => {
							return of(stokActions.getByIdFailure({ message: err }))
						})
					)
			})
		)
	)
	// getByIdstokSuccess$ = createEffect(() => this.actions$.pipe( ofType(stokActions.getByIdstokSuccess) ) )
	getByIdstokFailure$ = createEffect(() => this.actions$.pipe(ofType(stokActions.getByIdFailure)), { dispatch: false })

	deletestok$ = createEffect(() =>
		this.actions$.pipe(
			ofType(stokActions.deleteInitial),
			switchMap(action => {
				return this.ModulStokService.delete(action.payload.id)
					.pipe(
						map(res => {
							return stokActions.deleteSuccess({ payload: res.response })
						}),
						catchError(err => {
							return of(stokActions.deleteFailure({ message: err }))
						})
					)
			})
		)
	)

	deletestokSuccess$ = createEffect(() =>
		this.actions$.pipe(
			ofType(stokActions.deleteSuccess),
			map(res => {
				this.Toast.fire({
					icon: 'success',
					title: 'Data berhasil dihapus'
				})
				return stokActions.tableData()
			})
		)
	)
	deletestokFailure$ = createEffect(() => this.actions$.pipe(ofType(stokActions.deleteFailure)), { dispatch: false })
}
