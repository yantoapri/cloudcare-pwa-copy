import { Actions, ofType, createEffect } from '@ngrx/effects';
import { switchMap, catchError, map, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Injectable } from "@angular/core";
import { Router } from '@angular/router';
import Swal from 'sweetalert2/dist/sweetalert2.js'

import * as JadwalStafActions from './jadwal-staf.actions'
// import { jadwalStafService } from 'src/app/private/services/master-data/ruang-dan-jadwal/jadwal-libur.service';
import { JadwalStafService } from 'src/app/private/modul-api/modul-master/modul-jadwal-staf.service';

@Injectable()
export class JadwalStafEffects {

	urlBacktoView = ['pengaturan-jadwal', 'pengaturan-jadwal-staf', 'view']

	constructor(
		private actions$: Actions,
		private jadwalStafService: JadwalStafService,
		private router: Router
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

	addInitial$ = createEffect(() =>
		this.actions$.pipe(
			ofType(JadwalStafActions.addInitial),
			switchMap(action => {
				return this.jadwalStafService.insert(action.payload)
					.pipe(
						map(res => {
							return JadwalStafActions.addSuccess({ payload: res.response })
						}),
						catchError(err => {
							return of(JadwalStafActions.addFailure({ message: err }))
						})
					)
			})
		)
	)

	addSuccess$ = createEffect(() =>
		this.actions$.pipe(
			ofType(JadwalStafActions.addSuccess),
			tap(action => {
				Swal.fire({
					title: 'Data berhasil disimpan',
					icon: 'success',
					showCancelButton: false,
					allowOutsideClick: false,
					confirmButtonText: 'Ya, lanjutkan!',
				}).then((result) => {
					this.router.navigate(this.urlBacktoView)
				})
			})
		), { dispatch: false }
	)

	addFailure$ = createEffect(() =>
		this.actions$.pipe(ofType(JadwalStafActions.addFailure)
		), { dispatch: false })

	updateInitial$ = createEffect(() => this.actions$.pipe(ofType(JadwalStafActions.updateInitial),
		switchMap(action => {
			return this.jadwalStafService.update(action.payload.id_jadwal_staff, action.payload)
				.pipe(
					map(res => {
						return JadwalStafActions.updateSuccess({ payload: res.response })
					}),
					catchError(err => {
						return of(JadwalStafActions.updateFailure({ message: err }))
					})
				)
		})
	))
	updateSuccess$ = createEffect(() => this.actions$.pipe(ofType(JadwalStafActions.updateSuccess),
		tap(action => {
			Swal.fire({
				title: 'Data berhasil disimpan',
				icon: 'success',
				showCancelButton: false,
				allowOutsideClick: false,
				confirmButtonText: 'Ya, lanjutkan!',
			}).then((result) => {
				this.router.navigate(this.urlBacktoView)
			})
		})
	), { dispatch: false })

	updateFailure$ = createEffect(() => this.actions$.pipe(ofType(JadwalStafActions.updateFailure)), { dispatch: false })
	getByIdInitial$ = createEffect(() => this.actions$.pipe(ofType(JadwalStafActions.getByIdInitial),
		switchMap(action => {
			return this.jadwalStafService.show(action.payload.id)
				.pipe(
					map(res => {
						return JadwalStafActions.getByIdSuccess({ payload: res.response })
					}),
					catchError(err => {
						return of(JadwalStafActions.getByIdFailure({ message: err }))
					})
				)
		})
	))
	// getByIdSuccess$ = createEffect(() => this.actions$.pipe(ofType(JadwalStafActions.getByIdSuccess) ) )
	getByIdFailure$ = createEffect(() => this.actions$.pipe(ofType(JadwalStafActions.getByIdFailure)), { dispatch: false })
	deleteInitial$ = createEffect(() => this.actions$.pipe(ofType(JadwalStafActions.deleteInitial),
		switchMap(action => {
			return this.jadwalStafService.delete(action.id, action.payload)
				.pipe(
					map(res => {
						return JadwalStafActions.deleteSuccess({ payload: res.response })
					}),
					catchError(err => {
						return of(JadwalStafActions.deleteFailure({ message: err }))
					})
				)
		})
	))
	deleteSuccess$ = createEffect(() => this.actions$.pipe(ofType(JadwalStafActions.deleteSuccess),
		map(action => {
			this.Toast.fire({
				icon: 'success',
				title: 'Data berhasil dihapus'
			})
			return JadwalStafActions.tableData()
		})
	))
	deleteFailure$ = createEffect(() => this.actions$.pipe(ofType(JadwalStafActions.deleteFailure)), { dispatch: false })

}
