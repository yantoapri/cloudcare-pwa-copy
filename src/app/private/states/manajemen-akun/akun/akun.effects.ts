import { Injectable } from "@angular/core";
import { Router } from '@angular/router';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { switchMap, catchError, map, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import * as AkunAction from './akun.actions'
import { AkunService } from 'src/app/private/services/manajemen-akun/akun.service'
@Injectable()
export class AkunEffects {
	constructor(
		private actions$: Actions,
		private router: Router,
		private akunService: AkunService
	) { }

	addAkun$ = createEffect(() =>
		this.actions$.pipe(
			ofType(AkunAction.addAkun),
			switchMap(action => {
				return this.akunService.insert(action.payload)
					.pipe(
						map(res => {
							if (res.metaData.response_code != '0000') {
								return AkunAction.tableData()
							} else
								return AkunAction.addAkunSuccess({ payload: res.response })
						}),
						catchError(err => {
							return of(AkunAction.addAkunFailure({ message: err }))
						})
					)
			})
		)
	);
	addAkunSuccess$ = createEffect(() =>
		this.actions$.pipe(
			ofType(AkunAction.addAkunSuccess),
			tap(action => {
				Swal.fire({
					title: 'Data berhasil disimpan',
					icon: 'success',
					showCancelButton: false,
					allowOutsideClick: false,
					confirmButtonText: 'Ya, lanjutkan!',
				}).then((result) => {
					if (result.value) {
						this.router.navigate(['manajemen-akun', 'akun', 'view'])
					}
				})
			})
		), { dispatch: false }
	);

	addAkunFailure$ = createEffect(() =>
		this.actions$.pipe(
			ofType(AkunAction.addAkunFailure),
		), { dispatch: false }
	);

	getAkunById$ = createEffect(() =>
		this.actions$.pipe(
			ofType(AkunAction.getAkunById),
			switchMap(action => {

				return this.akunService.show(action.payload.id)
					.pipe(
						map(res => {
							return AkunAction.getAkunByIdSuccess({ payload: res.response })
						}),
						catchError(err => {
							return of(AkunAction.getAkunByIdFailure({ message: err.metaData.message }))
						})
					)
			})
		)
	);
	/**
	getAkunByIdSuccess$ = createEffect(() =>
	  this.actions$.pipe(
		ofType(AkunAction.getAkunByIdSuccess),
	  ), {dispatch : false}
	);
	*/
	getAkunByIdFailure$ = createEffect(() =>
		this.actions$.pipe(
			ofType(AkunAction.getAkunByIdFailure),

		), { dispatch: false }
	);

	updateAkun$ = createEffect(() =>
		this.actions$.pipe(
			ofType(AkunAction.updateAkun),
			switchMap(action => {
				return this.akunService.update(action.payload.id_akun, action.payload)
					.pipe(
						map(res => {
							return AkunAction.updateAkunSuccess({ payload: res.response })
						}),
						catchError(err => {
							return of(AkunAction.updateAkunFailure({ message: err }))
						})
					)
			})
		)
	);
	updateAkunSuccess$ = createEffect(() =>
		this.actions$.pipe(
			ofType(AkunAction.updateAkunSuccess),
			tap(action => {
				Swal.fire({
					title: 'Data berhasil disimpan',
					icon: 'success',
					showCancelButton: false,
					allowOutsideClick: false,
					confirmButtonText: 'Ya, lanjutkan!',
				}).then((result) => {
					if (result.value) {
						this.router.navigate(['manajemen-akun', 'akun', 'view'])
					}
				})
			})
		), { dispatch: false }
	);
	updateAkunFailure$ = createEffect(() => this.actions$.pipe(ofType(AkunAction.updateAkunFailure)), { dispatch: false });

	deleteAkun$ = createEffect(() =>
		this.actions$.pipe(
			ofType(AkunAction.deleteAkun),
			switchMap(action => {
				return this.akunService.delete(action.payload.id, action.payload.status_akun)
					.pipe(
						map(action => {
							return AkunAction.deleteAkunSuccess({ payload: action.response })
						}),
						catchError(err => {
							return of(AkunAction.deleteAkunFailure({ message: err }))
						})
					)
			})
		)
	);

	deleteAkunSuccess$ = createEffect(() =>
		this.actions$.pipe(
			ofType(AkunAction.deleteAkunSuccess),
			map(action => {
				return AkunAction.tableData()
			})
		), { dispatch: false }
	);
	deleteAkunFailure$ = createEffect(() => this.actions$.pipe(ofType(AkunAction.deleteAkunFailure)), { dispatch: false });

}
