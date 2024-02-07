import { StokOpnameObatPayload } from 'src/app/private/models/class-payload-api/gudang-transaksi/stok-opname-payload'
import { ModulStokOpnameObatService } from 'src/app/private/modul-api/modul-gudang-transaksi/modul-stok-opname-obat.service'
import { ModulStokOpnameAlatService } from 'src/app/private/modul-api/modul-gudang-transaksi/modul-stokopname-alat.service'

import { Actions, ofType, createEffect } from '@ngrx/effects';
import { switchMap, catchError, map, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { Injectable } from "@angular/core";
import Swal from 'sweetalert2/dist/sweetalert2.js'
import * as StokOpnameActions from './stok-opname.action'

@Injectable()
export class StokOpnameEffects {
	constructor(
		private actions$: Actions,
		private ModulStokOpnameObat: ModulStokOpnameObatService,
		private ModulStokOpnameAlat: ModulStokOpnameAlatService,
		private router: Router
	) { }
	urlBacktoView = ['stok-opname', 'view']
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
			ofType(StokOpnameActions.addInitial),
			switchMap(action => {
				return this.ModulStokOpnameObat.add(action.payload, action.id)
					.pipe(
						map(res => {
							return StokOpnameActions.addSuccess({ payload: res.response })
						}),
						catchError(err => {
							if(err.response){
								let msg=""
								err.response.map((val)=>{
									msg+=val.field+" "+val.message+"\n"
								})
								this.Toast.fire({
									icon: 'error',
									title: msg
								})
							}else{
								this.Toast.fire({
									icon: 'error',
									title: err.metaData.message
								})
							}
							return of(StokOpnameActions.addFailure({ message: err }))
						})
					)
			})
		)
	)
	addSuccess$ = createEffect(() =>
		this.actions$.pipe(
			ofType(StokOpnameActions.addSuccess),
			map(action => {
				Swal.fire({
					title: 'Data berhasil disimpan',
					icon: 'success',
					showCancelButton: false,
					allowOutsideClick: false,
					confirmButtonText: 'Ya, lanjutkan!',
				}).then((result) => {
				})
				return StokOpnameActions.tableData()
			})
		)
	)
	addFailure$ = createEffect(() => this.actions$.pipe(ofType(StokOpnameActions.addFailure)), { dispatch: false })

	addTinjauInitial$ = createEffect(() =>
		this.actions$.pipe(
			ofType(StokOpnameActions.addTinjauInitial),
			switchMap(action => {
				return this.ModulStokOpnameObat.addTinjau(action.payload, action.id)
					.pipe(
						map(res => {
							if(res.metaData.response_code=="0000")
							{
								return StokOpnameActions.addTinjauSuccess({ payload: res.response })
							}
							else
							return  StokOpnameActions.addTinjauFailure({ message: res.metaData.message })
						}),
						catchError(err => {
							return of(StokOpnameActions.addTinjauFailure({ message: err }))
						})
					)
			})
		)
	)
	addTinjauSuccess$ = createEffect(() =>
		this.actions$.pipe(
			ofType(StokOpnameActions.addTinjauSuccess),
			map(action => {
				Swal.fire({
					title: 'Data berhasil disimpan',
					icon: 'success',
					showCancelButton: false,
					allowOutsideClick: false,
					confirmButtonText: 'Ya, lanjutkan!',
				}).then((result) => {
				})
				return StokOpnameActions.tableData()
			})
		)
	)
	addTinjauFailure$ = createEffect(() => this.actions$.pipe(ofType(StokOpnameActions.addTinjauFailure),
	map(action => {
		Swal.fire({
			title: 'Ops, Data tidak ditemukan.',
			icon: 'error',
			showCancelButton: false,
			allowOutsideClick: false,
			confirmButtonText: 'OK',
		}).then((result) => {
		})
		return StokOpnameActions.tableData()
	})
	), { dispatch: false })
	startInitial$ = createEffect(() =>
		this.actions$.pipe(
			ofType(StokOpnameActions.startInitial),
			switchMap(action => {
				return this.ModulStokOpnameObat.start()
					.pipe(
						map(res => {
							this.router.navigate(['stok-opname', 'mulai', res.response.id_stok_opname,0])
							return StokOpnameActions.startSuccess({ payload: res.response })
						}),
						catchError(err => {
							if (err.response) {
								if(err.response.status_tinjau==1){
									Swal.fire("Info", err.metaData.message, "info")
								}else{
									this.router.navigate(['stok-opname', 'mulai', err.response.id_stok_opname,err.response.status_tinjau])
								}
							}
							return of(StokOpnameActions.startFailure({ message: err }))
						})
					)
			})
		)
	)
	startSuccess$ = createEffect(() =>
		this.actions$.pipe(
			ofType(StokOpnameActions.startSuccess),
			map(action => {
				return StokOpnameActions.tableData()
			})
		)
	)
	startFailure$ = createEffect(() => this.actions$.pipe(ofType(StokOpnameActions.startFailure)), { dispatch: false })

	updateInitial$ = createEffect(() =>
		this.actions$.pipe(
			ofType(StokOpnameActions.updateInitial),
			switchMap(action => {
				return this.ModulStokOpnameObat.update(action.id, action.payload)
					.pipe(
						map(res => {
							if (res.metaData.response_code != "0000") {
								Swal.fire("Error", res.metaData.message, "error")
							}
							else {
								Swal.fire({
									title: 'Data berhasil disimpan',
									icon: 'success',
									showCancelButton: false,
									allowOutsideClick: false,
									confirmButtonText: 'Ya, lanjutkan!',
								})
							}
							return StokOpnameActions.tableData()
						}),
						catchError(err => {
							if(err.metaData.response_code=='5505'&&err.response.length>0){
								let msg=""
								err.response.map(val=>{
									msg+=val.field+' '+val.message+'\n'
								})
								Swal.fire("Error", msg, "error")
							}else
							Swal.fire("Error", err.metaData.message, "error")
							return of(StokOpnameActions.updateFailure({ message: err }))
						})
					)
			})
		)
	)
	updateSuccess$ = createEffect(() =>
		this.actions$.pipe(
			ofType(StokOpnameActions.updateSuccess),
		), { dispatch: false }
	)
	updateFailure$ = createEffect(() => this.actions$.pipe(ofType(StokOpnameActions.updateFailure)), { dispatch: false })

	finishInitial$ = createEffect(() =>
		this.actions$.pipe(
			ofType(StokOpnameActions.finishInitial),
			switchMap(action => {
				return this.ModulStokOpnameObat.finish(action.id)
					.pipe(
						map(res => {
							return StokOpnameActions.finishSuccess({ payload: res.response })
						}),
						catchError(err => {
							return of(StokOpnameActions.finishFailure({ message: err }))
						})
					)
			})
		)
	)
	finishSuccess$ = createEffect(() =>
		this.actions$.pipe(
			ofType(StokOpnameActions.finishSuccess),
			map(action => {
				Swal.fire({
					title: 'Finish stok opname berhasil',
					icon: 'success',
					showCancelButton: false,
					allowOutsideClick: false,
					confirmButtonText: 'Ya, lanjutkan!',
				}).then((result) => {
					this.router.navigate(this.urlBacktoView)
				})
				return StokOpnameActions.tableData()
			})
		)
	)
	finishFailure$ = createEffect(() => this.actions$.pipe(ofType(StokOpnameActions.finishFailure)), { dispatch: false })

	// ----------------------alat-------------------
	addAlatInitial$ = createEffect(() =>
		this.actions$.pipe(
			ofType(StokOpnameActions.addInitialAlat),
			switchMap(action => {
				return this.ModulStokOpnameAlat.add(action.payload, action.id)
					.pipe(
						map(res => {
							return StokOpnameActions.addSuccessAlat({ payload: res.response })
						}),
						catchError(err => {
							if(err.response){
								let msg=""
								err.response.map((val)=>{
									msg+=val.field+" "+val.message+"\n"
								})
								this.Toast.fire({
									icon: 'error',
									title: msg
								})
							}
							return of(StokOpnameActions.addFailureAlat({ message: err }))
						})
					)
			})
		)
	)
	addAlatSuccess$ = createEffect(() =>
		this.actions$.pipe(
			ofType(StokOpnameActions.addSuccessAlat),
			map(action => {
				Swal.fire({
					title: 'Data berhasil disimpan',
					icon: 'success',
					showCancelButton: false,
					allowOutsideClick: false,
					confirmButtonText: 'Ya, lanjutkan!',
				}).then((result) => {
				})
				return StokOpnameActions.tableDataAlat()
			})
		)
	)
	addAlatFailure$ = createEffect(() => this.actions$.pipe(ofType(StokOpnameActions.addFailureAlat)), { dispatch: false })

	addAlatTinjauInitial$ = createEffect(() =>
		this.actions$.pipe(
			ofType(StokOpnameActions.addTinjauInitialAlat),
			switchMap(action => {
				return this.ModulStokOpnameAlat.addTinjau(action.payload, action.id)
					.pipe(
						map(res => {
							if(res.metaData.response_code=="0000")
							{
								
								return StokOpnameActions.addTinjauSuccessAlat({ payload: res.response })
								
							}
							else
							return  StokOpnameActions.addTinjauFailureAlat({ message: res.metaData.message })
						}),
						catchError(err => {
							let msg=""
							if(err.response.length>0){
								err.response.map(val=>{
									msg+=val.field+" "+val.message+"\n"
								})
								Swal.fire({msg,
									icon: 'error',
									title:'Error',
									text:msg,
									showCancelButton: false,
									allowOutsideClick: false,
									confirmButtonText: 'OK',
								}).then((result) => {
								})
							}else
							if(err.metaData){
								Swal.fire({
									title: err.metaData.message,
									icon: 'error',
									showCancelButton: false,
									allowOutsideClick: false,
									confirmButtonText: 'OK',
								}).then((result) => {
								})
							}
							return of(StokOpnameActions.addTinjauFailureAlat({ message: err }))
						})
					)
			})
		)
	)
	addTinjauSuccessAlat$ = createEffect(() =>
		this.actions$.pipe(
			ofType(StokOpnameActions.addTinjauSuccess),
			map(action => {
				Swal.fire({
					title: 'Data berhasil disimpan',
					icon: 'success',
					showCancelButton: false,
					allowOutsideClick: false,
					confirmButtonText: 'Ya, lanjutkan!',
				}).then((result) => {
					StokOpnameActions.tableData()
				})
				return StokOpnameActions.tableDataAlat()
			})
		)
	)
	addTinjauFailureAlat$ = createEffect(() => this.actions$.pipe(ofType(StokOpnameActions.addTinjauFailureAlat),
	map(action => {
		return StokOpnameActions.tableDataAlat()
	})
	), { dispatch: false })
	startTinjauInitial$ = createEffect(() =>
		this.actions$.pipe(
			ofType(StokOpnameActions.startTinjau),
			switchMap(action => {
				return this.ModulStokOpnameAlat.startTinjau()
					.pipe(
						map(res => {
							this.router.navigate(['stok-opname', 'mulai', res.response.id_stok_opname])
							return StokOpnameActions.startSuccessTinjau({ payload: res.response })
						}),
						catchError(err => {
							if (err.response) {
								this.router.navigate(['stok-opname', 'mulai', err.response.id_stok_opname])
							}
							return of(StokOpnameActions.startFailureTinjau({ message: err }))
						})
					)
			})
		)
	)
	startAlatSuccess$ = createEffect(() =>
		this.actions$.pipe(
			ofType(StokOpnameActions.startSuccessTinjau),
			map(action => {
				return StokOpnameActions.tableDataAlat()
			})
		)
	)
	startAlatFailure$ = createEffect(() => this.actions$.pipe(ofType(StokOpnameActions.startFailureTinjau)), { dispatch: false })

	updateAlatInitial$ = createEffect(() =>
		this.actions$.pipe(
			ofType(StokOpnameActions.updateInitialAlat),
			switchMap(action => {
				return this.ModulStokOpnameAlat.update(action.id, action.payload)
					.pipe(
						map(res => {
							// if (res.metaData.response_code != "0000") {
							// 	Swal.fire("Error", res.metaData.message, "error")
								
							// }
							// else
							return StokOpnameActions.updateSuccessAlat({ payload: res })
						}),
						catchError(err => {
							if(err.metaData.response_code=='5505'&&err.response.length>0){
								let msg=""
								err.response.map(val=>{
									msg+=val.field+' '+val.message+'\n'
								})
								Swal.fire("Error", msg, "error")
							}else
							Swal.fire("Error", err.metaData.message, "error")
							return of(StokOpnameActions.updateFailureAlat({ message: err }))
						})
					)
			})
		)
	)
	updateAlatSuccess$ = createEffect(() =>
		this.actions$.pipe(
			ofType(StokOpnameActions.updateSuccessAlat),map(action => {
				Swal.fire({
					title: 'Data berhasil disimpan',
					icon: 'success',
					showCancelButton: false,
					allowOutsideClick: false,
					confirmButtonText: 'Ya, lanjutkan!',
				}).then((result) => {
					
				})
				return StokOpnameActions.tableDataAlat()
			})
		), { dispatch: false }
	)
	updateAlatFailure$ = createEffect(() => this.actions$.pipe(ofType(StokOpnameActions.updateFailureAlat)), { dispatch: false })


}
