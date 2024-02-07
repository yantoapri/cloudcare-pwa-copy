
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { switchMap, catchError, map, tap } from 'rxjs/operators';
import { of, pipe } from 'rxjs';
import { Injectable } from "@angular/core";
import Swal from 'sweetalert2/dist/sweetalert2.js'
import { Router } from '@angular/router';
import { ModulPenjualanService } from 'src/app/private/modul-api/modul-gudang-transaksi/modul-penjualan.service';
import * as PenjualanActions from './penjualan.action'

@Injectable()
export class PenjualanEffects {

    constructor(
        private actions$: Actions,
        private ModulPenjualanService: ModulPenjualanService,
        private router: Router
    ) { }
    urlBacktoView = ['penjualan', 'penjualan-kasir']
    addInitial$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PenjualanActions.addInitial),
            switchMap(action => {
                return this.ModulPenjualanService.add()
                    .pipe(
                        map(res => {
                            return PenjualanActions.addSuccess({ payload: res.response })
                        }),
                        catchError(err => {
                            return of(PenjualanActions.addFailure({ message: err }))
                        })
                    )
            })
        )
    )
    addSuccess$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PenjualanActions.addSuccess),
            tap(action => {
                Swal.fire({
                    title: 'Data berhasil disimpan',
                    icon: 'success',
                    showCancelButton: false,
                    allowOutsideClick: false,
                    confirmButtonText: 'Ya, lanjutkan!',
                }).then((result) => {
                    return PenjualanActions.tableData()
                })
            })
        ), { dispatch: false }
    )
    addFailure$ = createEffect(() => this.actions$.pipe(ofType(PenjualanActions.addFailure)), { dispatch: false })

    updateInitial$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PenjualanActions.updateInitial),
            switchMap(action => {
                return this.ModulPenjualanService.update(action.id, action.payload)
                    .pipe(
                        map(res => {
                            if (res.metaData.response_code != "0000") {
                                this.Toast.fire({
                                    icon: 'error',
                                    title: res.metaData.message
                                })
                            } else
                                return PenjualanActions.updateSuccess({ payload: res.response, id: action.id })
                        }),
                        catchError(err => {
                            this.Toast.fire({
                                icon: 'error',
                                title: err.metaData.message
                            })
                            return of(PenjualanActions.updateFailure({ message: err }))
                        })
                    )
            })
        )
    )
    updateSuccess$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PenjualanActions.updateSuccess),
            tap(action => {
                Swal.fire({
                    title: 'Data berhasil disimpan',
                    icon: 'success',
                    showCancelButton: false,
                    allowOutsideClick: false,
                    confirmButtonText: 'Ya, lanjutkan!',
                }).then((result) => {
                    this.router.navigate(['penjualan', 'penjualan-kasir', 'view'])
                })
            })
        ), { dispatch: false }
    )
    updateFailure$ = createEffect(() => this.actions$.pipe(ofType(PenjualanActions.updateFailure)), { dispatch: false })

    getByIdInitial$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PenjualanActions.getByIdInitial),
            switchMap(action => {
                return this.ModulPenjualanService.show(action.payload.id)
                    .pipe(
                        map(res => {
                            return PenjualanActions.getByIdSuccess({ payload: res.response })
                        }),
                        catchError(err => {
                            return of(PenjualanActions.getByIdFailure({ message: err }))
                        })
                    )
            })
        )
    )
    // getByIdSuccess$ = createEffect(() => this.actions$.pipe(ofType(PenjualanActions.getByIdSuccess) ) )
    getByIdFailure$ = createEffect(() => this.actions$.pipe(ofType(PenjualanActions.getByIdFailure)), { dispatch: false })


    delete$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PenjualanActions.deleteInitial),
            switchMap(action => {
                return this.ModulPenjualanService.delete(action.payload.id)
                    .pipe(
                        map(res => {
                            return PenjualanActions.deleteSuccess({ payload: res.response })
                        }),
                        catchError(err => {
                            return of(PenjualanActions.deleteFailure({ message: err }))
                        })
                    )
            })
        )
    )

    deleteSuccess$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PenjualanActions.deleteSuccess),
            map(res => {
                this.Toast.fire({
                    icon: 'success',
                    title: 'Data berhasil dihapus'
                })
                return PenjualanActions.tableData()
            })
        )
    )
    deleteFailure$ = createEffect(() => this.actions$.pipe(ofType(PenjualanActions.deleteFailure)), { dispatch: false })

    // obat-------------------------------------------------------------------------------------------------------
    addObatInitial$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PenjualanActions.addObatInitial),
            switchMap(action => {
                return this.ModulPenjualanService.addObat(action.payload, action.id)
                    .pipe(
                        map(res => {
                            return PenjualanActions.addObatSuccess({ payload: res.response })
                        }),
                        catchError(err => {
                            if(err.response.length>0){
                                let msg=""
                                err.response.map(val=>{
                                    msg+=val.message
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
                            return of(PenjualanActions.addObatFailure({ message: err }))
                        })
                    )
            })
        )
    )
    addObatSuccess$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PenjualanActions.addObatSuccess),
            tap(action => {
                this.Toast.fire({
                    icon: 'success',
                    title: "Data berhasil disimpan"
                })
            })
        ), { dispatch: false }
    )
    addObatFailure$ = createEffect(() => this.actions$.pipe(ofType(PenjualanActions.addObatFailure)), { dispatch: false })

    updateObatInitial$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PenjualanActions.updateObatInitial),
            switchMap(action => {
                return this.ModulPenjualanService.updateObat(action.payload, action.id)
                    .pipe(
                        map(res => {
                            if (res.metaData.response_code != "0000") {
                                return (PenjualanActions.updateObatFailure({ message: res.metaData.message }))
                            } else
                                return PenjualanActions.updateObatSuccess({ payload: res.response, id: action.id })
                        }),
                        catchError(err => {
                            this.Toast.fire({
                                icon: 'error',
                                title: err.metaData.message
                            })
                            return of(PenjualanActions.updateObatFailure({ message: err }))
                        })
                    )
            })
        )
    )
    updateObatSuccess$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PenjualanActions.updateObatSuccess),
            tap(action => {
                ofType(PenjualanActions.addAlatSuccess),
                    tap(action => {
                        this.Toast.fire({
                            icon: 'success',
                            title: "Data berhasil disimpan"
                        })
                    })
            })
        ), { dispatch: false }
    )
    updateObatFailure$ = createEffect(() => this.actions$.pipe(ofType(PenjualanActions.updateObatFailure)), { dispatch: false })

    deleteObat$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PenjualanActions.deleteObatInitial),
            switchMap(action => {
                return this.ModulPenjualanService.deleteObat(action.id)
                    .pipe(
                        map(res => {
                            return PenjualanActions.deleteObatSuccess({ payload: res.response })
                        }),
                        catchError(err => {
                            return of(PenjualanActions.deleteObatFailure({ message: err }))
                        })
                    )
            })
        )
    )

    deleteObatSuccess$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PenjualanActions.deleteObatSuccess),
            map(res => {
                this.Toast.fire({
                    icon: 'success',
                    title: 'Data berhasil dihapus'
                })
                // return PenjualanActions.tableData()
            })
        ), { dispatch: false }
    )
    deleteObatFailure$ = createEffect(() => this.actions$.pipe(ofType(PenjualanActions.deleteObatFailure)), { dispatch: false })

    // alat-------------------------------------------------------------------------------------------------
    addAlatInitial$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PenjualanActions.addAlatInitial),
            switchMap(action => {
                return this.ModulPenjualanService.addAlat(action.payload, action.id)
                    .pipe(
                        map(res => {
                            return PenjualanActions.addAlatSuccess({ payload: res.response })
                        }),
                        catchError(err => {
                            if(err.response.length>0){
                                let msg=""
                                err.response.map(val=>{
                                    msg+=val.field+" "+val.message
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
                           
                            return of(PenjualanActions.addAlatFailure({ message: err }))
                        })
                    )
            })
        )
    )
    addAlatSuccess$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PenjualanActions.addAlatSuccess),
            tap(action => {
                this.Toast.fire({
                    icon: 'success',
                    title: "Data berhasil disimpan"
                })
            })
        ), { dispatch: false }
    )
    addAlatFailure$ = createEffect(() => this.actions$.pipe(ofType(PenjualanActions.addAlatFailure)), { dispatch: false })

    updateAlatInitial$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PenjualanActions.updateAlatInitial),
            switchMap(action => {
                return this.ModulPenjualanService.updateAlat(action.payload, action.id)
                    .pipe(
                        map(res => {
                            return PenjualanActions.updateAlatSuccess({ payload: res.response, id: action.id })
                        }),
                        catchError(err => {
                            return of(PenjualanActions.updateAlatFailure({ message: err }))
                        })
                    )
            })
        )
    )
    updateAlatSuccess$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PenjualanActions.updateAlatSuccess),
            tap(action => {
                ofType(PenjualanActions.addAlatSuccess),
                    tap(action => {
                        this.Toast.fire({
                            icon: 'success',
                            title: "Data berhasil disimpan"
                        })
                    })
            })
        ), { dispatch: false }
    )
    updateAlatFailure$ = createEffect(() => this.actions$.pipe(ofType(PenjualanActions.updateAlatFailure)), { dispatch: false })

    deleteAlat$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PenjualanActions.deleteAlatInitial),
            switchMap(action => {
                return this.ModulPenjualanService.deleteAlat(action.id)
                    .pipe(
                        map(res => {
                            return PenjualanActions.deleteAlatSuccess({ payload: res.response })
                        }),
                        catchError(err => {
                            return of(PenjualanActions.deleteAlatFailure({ message: err }))
                        })
                    )
            })
        )
    )

    deleteAlatSuccess$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PenjualanActions.deleteAlatSuccess),
            map(res => {
                this.Toast.fire({
                    icon: 'success',
                    title: 'Data berhasil dihapus'
                })
                // return PenjualanActions.tableData()
            })
        ), { dispatch: false }
    )
    deleteAlatFailure$ = createEffect(() => this.actions$.pipe(ofType(PenjualanActions.deleteAlatFailure)), { dispatch: false })
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
