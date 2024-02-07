import { ModulKonsolidasiDataService } from 'src/app/private/modul-api/modul-rekam-medis/modul-konsolidasi-data.service'

import { Actions, ofType, createEffect } from '@ngrx/effects';
import { switchMap, catchError, map, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { Injectable } from "@angular/core";
import Swal from 'sweetalert2/dist/sweetalert2.js'
import * as konsolidasiAction from './konsolidasi-data.action'

@Injectable()
export class KonsolidasiDataEffects {
	constructor(
		private actions$: Actions,
		private ModulKonsolidasiService: ModulKonsolidasiDataService,
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
			ofType(konsolidasiAction.addInitial),
			switchMap(action => {
				return this.ModulKonsolidasiService.add(action.payload, action.id)
					.pipe(
						map(res => {
							if (res.metaData.response_code != "0000") {
								this.Toast.fire({
									icon: 'error',
									title: res.metaData.message
								})
							} else {
								this.Toast.fire({
									icon: 'success',
									title: 'Data berhasil disimpan'
								})

							}
							return konsolidasiAction.tableData()
						}),
						catchError(err => {
							return of(konsolidasiAction.addFailure({ message: err }))
						})
					)
			})
		)
	)
	addSuccess$ = createEffect(() =>
		this.actions$.pipe(
			ofType(konsolidasiAction.addSuccess)
		), { dispatch: false }
	)
	addFailure$ = createEffect(() => this.actions$.pipe(ofType(konsolidasiAction.addFailure)), { dispatch: false })

	// updateStok$ = createEffect(() =>
	//     this.actions$.pipe(
	//         ofType(konsolidasiAction.updateInitial),
	//         switchMap(action => {
	//             return this.ModulKonsolidasiService.update(action.payload.id_obat, action.payload)
	//                 .pipe(
	//                     map(res => {
	//                         return konsolidasiAction.updateSuccess({ payload: res.response })
	//                     }),
	//                     catchError(err => {
	//                         return of(konsolidasiAction.updateFailure({ message: err }))
	//                     })
	//                 )
	//         })
	//     )
	// )
	// updateStokSuccess$ = createEffect(() =>
	//     this.actions$.pipe(
	//         ofType(konsolidasiAction.updateSuccess),
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
	//             return konsolidasiAction.tableData()
	//         })
	//     )
	// )
	// updateStokFailure$ = createEffect(() => this.actions$.pipe(ofType(konsolidasiAction.updateFailure)), { dispatch: false })

	// getByIdInitial$ = createEffect(() =>
	// 	this.actions$.pipe(
	// 		ofType(konsolidasiAction.getByIdInitial),
	// 		switchMap(action => {
	// 			return this.ModulKonsolidasiService.show(action.id)
	// 				.pipe(
	// 					map(res => {
	// 						return konsolidasiAction.getByIdSuccess({ payload: res.response })
	// 					}),
	// 					catchError(err => {
	// 						return of(konsolidasiAction.getByIdFailure({ message: err }))
	// 					})
	// 				)
	// 		})
	// 	)
	// )
	// // getByIdSuccess$ = createEffect(() => this.actions$.pipe( ofType(konsolidasiAction.getByIdSuccess) ) )
	// getByIdFailure$ = createEffect(() => this.actions$.pipe(ofType(konsolidasiAction.getByIdFailure)), { dispatch: false })

	// deleteInitial$ = createEffect(() =>
	// 	this.actions$.pipe(
	// 		ofType(konsolidasiAction.deleteInitial),
	// 		switchMap(action => {
	// 			return this.ModulKonsolidasiService.delete(action.payload.id)
	// 				.pipe(
	// 					map(res => {
	// 						return konsolidasiAction.deleteSuccess({ payload: res.response })
	// 					}),
	// 					catchError(err => {
	// 						return of(konsolidasiAction.deleteFailure({ message: err }))
	// 					})
	// 				)
	// 		})
	// 	)
	// )

	// deleteSuccess$ = createEffect(() =>
	// 	this.actions$.pipe(
	// 		ofType(konsolidasiAction.deleteSuccess),
	// 		map(res => {
	// 			this.Toast.fire({
	// 				icon: 'success',
	// 				title: 'Data berhasil dihapus'
	// 			})
	// 			return konsolidasiAction.tableData()
	// 		})
	// 	)
	// )
	// deleteFailure$ = createEffect(() => this.actions$.pipe(ofType(konsolidasiAction.deleteFailure)), { dispatch: false })
}
