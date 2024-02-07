import { stokPayload } from 'src/app/private/models/class-payload-api/gudang-transaksi/stok-payload'
import { ModulStokService } from 'src/app/private/modul-api/modul-gudang-transaksi/modul-stok.service'

import { Actions, ofType, createEffect } from '@ngrx/effects';
import { switchMap, catchError, map, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { Injectable } from "@angular/core";
import Swal from 'sweetalert2/dist/sweetalert2.js'
import * as stokActions from './stok-alat.action'

@Injectable()
export class StokEffects {
	constructor(
		private actions$: Actions,
		private ModulStokService: ModulStokService,
		private router: Router
	) { }

	urlBacktoView = ['barang', 'stok', 'view']
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

	addInitial$ = createEffect(() =>
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
	addSuccess$ = createEffect(() =>
		this.actions$.pipe(
			ofType(stokActions.addSuccess),
			map(action => {
				Swal.fire({
					title: 'Data berhasil disimpan',
					icon: 'success',
					showCancelButton: false,
					allowOutsideClick: false,
					confirmButtonText: 'Ya, lanjutkan!',
				}).then((result) => {
					this.router.navigate(this.urlBacktoView)
				})
				return stokActions.tableData()
			})
		)
	)
	addFailure$ = createEffect(() => this.actions$.pipe(ofType(stokActions.addFailure)), { dispatch: false })

	// updateStok$ = createEffect(() =>
	//     this.actions$.pipe(
	//         ofType(stokActions.updateInitial),
	//         switchMap(action => {
	//             return this.ModulStokService.update(action.payload.id_obat, action.payload)
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
	// updateStokSuccess$ = createEffect(() =>
	//     this.actions$.pipe(
	//         ofType(stokActions.updateSuccess),
	//         map(action => {
	//            Swal.fire({
	//                 title: 'Data berhasil disimpan',
	//                 icon: 'success',
	//                 showCancelButton: false,
	//                 allowOutsideClick: false,
	//                 confirmButtonText: 'Ya, lanjutkan!',
	//             }).then((result) => {
	//                 this.router.navigate(this.urlBacktoView)
	//             })
	//             return stokActions.tableData()
	//         })
	//     )
	// )
	// updateStokFailure$ = createEffect(() => this.actions$.pipe(ofType(stokActions.updateFailure)), { dispatch: false })

	getByIdInitial$ = createEffect(() =>
		this.actions$.pipe(
			ofType(stokActions.getByIdInitial),
			switchMap(action => {
				return this.ModulStokService.show(action.id)
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
	// getByIdSuccess$ = createEffect(() => this.actions$.pipe( ofType(stokActions.getByIdSuccess) ) )
	getByIdFailure$ = createEffect(() => this.actions$.pipe(ofType(stokActions.getByIdFailure)), { dispatch: false })

	deleteInitial$ = createEffect(() =>
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

	deleteSuccess$ = createEffect(() =>
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
	deleteFailure$ = createEffect(() => this.actions$.pipe(ofType(stokActions.deleteFailure)), { dispatch: false })
}
