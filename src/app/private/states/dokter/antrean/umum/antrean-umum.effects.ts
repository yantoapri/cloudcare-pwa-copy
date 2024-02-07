import { Actions, ofType, createEffect } from '@ngrx/effects';
import { switchMap, catchError, map, tap, combineLatest } from 'rxjs';
import { AntreanUmumPayload, KunjunganTerakhir, Perawat, DokterUmum } from "src/app/private/models/class-payload-api/dokter/antrean-dokter/antrean-umum-payload";
import { of } from 'rxjs';
import { Injectable } from "@angular/core";
import { Router } from '@angular/router';
import Swal from 'sweetalert2/dist/sweetalert2.js'

import * as AntreanUmumActions from './anteran-umum.actions'
import { AntreanDokterUmumService } from 'src/app/private/services/dokter/antrean/antrean-dokter-umum.service';

@Injectable()
export class AntreanUmumEffects {

	constructor(
		private actions$: Actions,
		private antreanDokterUmumService: AntreanDokterUmumService,
		private router: Router
	) { }

	addInitial$ = createEffect(() =>
		this.actions$.pipe(
			ofType(AntreanUmumActions.addInitial),
			switchMap(action => {
				return this.antreanDokterUmumService.insert(action.payload)
					.pipe(
						map(res => {
							return AntreanUmumActions.addSuccess({ payload: res.response })
						}),
						catchError(err => {
							return of(AntreanUmumActions.addFailure({ message: err }))
						})
					)
			})
		)
	)
	addSuccess$ = createEffect(() =>
		this.actions$.pipe(
			ofType(AntreanUmumActions.addSuccess),
			tap(action => {
				Swal.fire({
					title: 'Data berhasil disimpan',
					icon: 'success',
					showCancelButton: false,
					allowOutsideClick: false,
					confirmButtonText: 'Ya, lanjutkan!',
				}).then((result) => {
					// this.router.navigate(['dokter', 'antrean-dokter', 'umum', 'view'])
				})
			})
		), { dispatch: false }
	)

	addFailure$ = createEffect(() =>
		this.actions$.pipe(
			ofType(AntreanUmumActions.addFailure)
		), { dispatch: false }
	)

	updateInitial$ = createEffect(() =>
		this.actions$.pipe(
			ofType(AntreanUmumActions.updateInitial),
			switchMap(action => {
				return this.antreanDokterUmumService.update(action.payload, action.payload.id_diagnosa_dokter_umum)
					.pipe(
						map(res => {
							return AntreanUmumActions.updateSuccess({ payload: res.response })
						}),
						catchError(err => {
							return of(AntreanUmumActions.updateFailure({ message: err }))
						})
					)
			})
		)
	)

	updateSuccess$ = createEffect(() =>
		this.actions$.pipe(
			ofType(AntreanUmumActions.updateSuccess),
			tap(action => {
				Swal.fire({
					title: 'Data berhasil disimpan',
					icon: 'success',
					showCancelButton: false,
					allowOutsideClick: false,
					confirmButtonText: 'Ya, lanjutkan!',
				}).then((result) => {
					// this.router.navigate(['dokter', 'antrean-dokter', 'umum', 'view'])
				})

			})
		), { dispatch: false }
	)

	updateFailure$ = createEffect(() => this.actions$.pipe(ofType(AntreanUmumActions.updateFailure)), { dispatch: false })

	getByIdInitial$ = createEffect(() =>
		this.actions$.pipe(
			ofType(AntreanUmumActions.getByIdInitial),
			switchMap(action => {
				return this.antreanDokterUmumService.show(action.payload.id, action.payload.id_pasien)
					.pipe(
						map(res => {
							let diagnosa = res[0]
							let perawat = res[1]
							let kunjunganTerakhir = res[2]
							let combine = new AntreanUmumPayload
							let action = 'insert'
							if (diagnosa.metaData.response_code === '0000') {
								action = 'update'
								combine.bhp = diagnosa.response.bhp
								combine.biaya_dokter = diagnosa.response.biaya_dokter
								combine.id_antrian = diagnosa.response.id_antrian
								combine.id_diagnosa_dokter_umum = diagnosa.response.id_diagnosa_dokter_umum
								combine.id_dokter_create = diagnosa.response.id_dokter_create
								combine.id_dokter_update = diagnosa.response.id_dokter_update
								combine.jm = diagnosa.response.jm
								combine.jt = diagnosa.response.jt
								combine.lain_lain = diagnosa.response.lain_lain
								combine.obyektif_dokter = diagnosa.response.obyektif_dokter
								combine.planning = diagnosa.response.planning
								combine.resep_obat = diagnosa.response.resep_obat
								combine.tindakan = diagnosa.response.tindakan
								combine.surat=diagnosa.response.surat
								combine.tindakan_medis_dokter=diagnosa.response.tindakan_medis
								combine.assessment=diagnosa.response.assessment
							}

							if (perawat.metaData.response_code === '0000') {
								combine.alergi = perawat.response.alergi
								combine.bb = perawat.response.bb
								combine.catatan_khusus = perawat.response.catatan_khusus
								combine.diastole = perawat.response.diastole
								combine.hambatan = perawat.response.hambatan
								combine.hr = perawat.response.hr
								combine.id_antrian = perawat.response.id_antrian
								combine.id_perawat_create = perawat.response.id_perawat_create
								combine.id_perawat_update = perawat.response.id_perawat_update
								combine.id_tindakan_perawat = perawat.response.id_tindakan_perawat
								combine.keluhan = perawat.response.keluhan
								combine.keterangan_rr = perawat.response.keterangan_rr
								combine.pxfisik = perawat.response.pxfisik
								combine.rr = perawat.response.rr
								combine.sistole = perawat.response.sistole
								combine.status_hr = perawat.response.status_hr
								combine.suhu = perawat.response.suhu
								combine.tb = perawat.response.tb
								combine.tindakan_medis=perawat.response.tindakan_medis
							}

							// if (kunjunganTerakhir.metaData.response_code === '0000') {
							// 	combine.kunjungan_terakhir = new KunjunganTerakhir
							// 	combine.kunjungan_terakhir = kunjunganTerakhir.response
							// }
							return AntreanUmumActions.getByIdSuccess({ payload: combine, aksiAntrean: action })
						}),
						catchError(err => {
							return of(AntreanUmumActions.getByIdFailure({ message: err }))
						})
					)

			})
		)
	)

	getByIdFailure$ = createEffect(() =>
		this.actions$.pipe(
			ofType(AntreanUmumActions.getByIdFailure)
		), { dispatch: false }
	)

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
