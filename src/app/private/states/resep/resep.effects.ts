
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { switchMap, catchError, map, tap } from 'rxjs/operators';
import { of, pipe } from 'rxjs';
import { Injectable } from "@angular/core";
import Swal from 'sweetalert2/dist/sweetalert2.js'
import { Router } from '@angular/router';
import { ModulResepService } from 'src/app/private/modul-api/modul-gudang-transaksi/modul-resep.service';
import * as ResepActions from './resep.action'

@Injectable()
export class ResepEffects {

	constructor(
		private actions$: Actions,
		private ModulResepService: ModulResepService,
		private router: Router
	) { }
	urlBacktoView = ['resep', 'resep']
	addInitial$ = createEffect(() =>
		this.actions$.pipe(
			ofType(ResepActions.addInitial),
			switchMap(action => {
				return this.ModulResepService.add(action.id, action.payload)
					.pipe(
						map(res => {
							return ResepActions.addSuccess({ payload: res.response })
						}),
						catchError(err => {
							return of(ResepActions.addFailure({ message: err }))
						})
					)
			})
		)
	)
	addSuccess$ = createEffect(() =>
		this.actions$.pipe(
			ofType(ResepActions.addSuccess),
			tap(action => {
				Swal.fire({
					title: 'Data berhasil disimpan',
					icon: 'success',
					showCancelButton: false,
					allowOutsideClick: false,
					confirmButtonText: 'Ya, lanjutkan!',
				}).then((result) => {
					return ResepActions.tableData()
				})
			})
		), { dispatch: false }
	)
	addFailure$ = createEffect(() => this.actions$.pipe(ofType(ResepActions.addFailure)), { dispatch: false })

	updateInitial$ = createEffect(() =>
		this.actions$.pipe(
			ofType(ResepActions.updateInitial),
			switchMap(action => {
				return this.ModulResepService.update(action.id, action.payload)
					.pipe(
						map(res => {
							if (res.metaData.response_code != "0000") {
								this.Toast.fire({
									icon: 'error',
									title: res.metaData.message
								})
							} else
								return ResepActions.updateSuccess({ payload: res.response, id: action.id })
						}),
						catchError(err => {
							this.Toast.fire({
								icon: 'error',
								title: err.metaData.message
							})
							return of(ResepActions.updateFailure({ message: err }))
						})
					)
			})
		)
	)
	updateSuccess$ = createEffect(() =>
		this.actions$.pipe(
			ofType(ResepActions.updateSuccess),
			tap(action => {
				Swal.fire({
					title: 'Data berhasil disimpan',
					icon: 'success',
					showCancelButton: false,
					allowOutsideClick: false,
					confirmButtonText: 'Ya, lanjutkan!',
				})
			})
		), { dispatch: false }
	)
	updateFailure$ = createEffect(() => this.actions$.pipe(ofType(ResepActions.updateFailure)), { dispatch: false })

	delete$ = createEffect(() =>
		this.actions$.pipe(
			ofType(ResepActions.deleteInitial),
			switchMap(action => {
				return this.ModulResepService.delete(action.payload.id)
					.pipe(
						map(res => {
							return ResepActions.deleteSuccess({ payload: res.response })
						}),
						catchError(err => {
							return of(ResepActions.deleteFailure({ message: err }))
						})
					)
			})
		)
	)

	deleteSuccess$ = createEffect(() =>
		this.actions$.pipe(
			ofType(ResepActions.deleteSuccess),
			map(res => {
				this.Toast.fire({
					icon: 'success',
					title: 'Data berhasil dihapus'
				})
				return ResepActions.tableData()
			})
		)
	)
	deleteFailure$ = createEffect(() => this.actions$.pipe(ofType(ResepActions.deleteFailure)), { dispatch: false })

	createInitial$ = createEffect(() =>
		this.actions$.pipe(
			ofType(ResepActions.createInitial),
			switchMap(action => {
				return this.ModulResepService.create(action.payload)
					.pipe(
						map(res => {
							return ResepActions.createSuccess({ payload: res.response })
						}),
						catchError(err => {
							return of(ResepActions.createFailure({ message: err }))
						})
					)
			})
		)
	)
	createSuccess$ = createEffect(() =>
		this.actions$.pipe(
			ofType(ResepActions.createSuccess),
			tap(action => {
				Swal.fire({
					title: 'Data berhasil disimpan',
					icon: 'success',
					showCancelButton: false,
					allowOutsideClick: false,
					confirmButtonText: 'Ya, lanjutkan!',
				}).then((result) => {
					location.reload();
					return ResepActions.tableData()
				})
			})
		), { dispatch: false }
	)
	createFailure$ = createEffect(() => this.actions$.pipe(ofType(ResepActions.createFailure)), { dispatch: false })

	finishInitial$ = createEffect(() =>
		this.actions$.pipe(
			ofType(ResepActions.finishInitial),
			switchMap(action => {
				return this.ModulResepService.finish(action.id, action.payload)
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
									title: "Data berhasil disimpan"
								})
								this.router.navigate(['resep', 'antrian'])
							}
							return ResepActions.finishSuccess({ payload: res.response, id: action.id })
						}),
						catchError(err => {
							this.Toast.fire({
								icon: 'error',
								title: err.metaData.message
							})
							this.router.navigate(['resep', 'antrian'])
							return of(ResepActions.finishFailure({ message: err }))
						})
					)
			})
		)
	)
	finishSuccess$ = createEffect(() =>
		this.actions$.pipe(
			ofType(ResepActions.finishSuccess)
		), { dispatch: false }
	)
	finishFailure$ = createEffect(() => this.actions$.pipe(ofType(ResepActions.finishFailure)), { dispatch: false })

	cancel$ = createEffect(() =>
		this.actions$.pipe(
			ofType(ResepActions.cancelInitial),
			switchMap(action => {
				return this.ModulResepService.cancel(action.payload.id)
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
									title: "Data berhasil disimpan"
								})
							}
							return ResepActions.tableData()
						}),
						catchError(err => {
							if (err.metaData.response_code != "0000") {
								this.Toast.fire({
									icon: 'error',
									title: err.metaData.message
								})
							}
							return of(ResepActions.cancelFailure({ message: err }))
						})
					)
			})
		)
	)

	cancelSuccess$ = createEffect(() =>
		this.actions$.pipe(
			ofType(ResepActions.cancelSuccess),
			map(res => {
				this.Toast.fire({
					icon: 'success',
					title: 'Data berhasil dihapus'
				})
				return ResepActions.tableData()
			})
		)
	)
	cancelFailure$ = createEffect(() => this.actions$.pipe(ofType(ResepActions.cancelFailure)), { dispatch: false })




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
}
