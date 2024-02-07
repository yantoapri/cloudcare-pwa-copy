import { AlatKesehatanPayload } from 'src/app/private/models/class-payload-api/alat-kesehatan/alat-kesehatan-payload'
import { ModulAlatKesehatanService } from 'src/app/private/modul-api/modul-master-node/modul-alat-kesehatan.service'

import { Actions, ofType, createEffect } from '@ngrx/effects';
import { switchMap, catchError, map, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { Injectable } from "@angular/core";
import Swal from 'sweetalert2/dist/sweetalert2.js'
import * as AlatKesehatanActions from './alat-kesehatan.action'

@Injectable()
export class AlatKesehatanEffects {
    constructor(
        private actions$: Actions,
        private ModulAlatKesehatanService: ModulAlatKesehatanService,
        private router : Router
    ) { }

    urlBacktoView = ['barang', 'katalog', 'view']
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

    addAlatKesehatan$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AlatKesehatanActions.addInitial),
            switchMap(action => {
                return this.ModulAlatKesehatanService.add(action.payload)
                    .pipe(
                        map(res => {
                            return AlatKesehatanActions.addSuccess({ payload: res.response })
                        }),
                        catchError(err => {
                            return of(AlatKesehatanActions.addFailure({ message: err }))
                        })
                    )
            })
        )
    )
    addAlatKesehatanSuccess$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AlatKesehatanActions.addSuccess),
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
                return AlatKesehatanActions.tableData()
            })
        )
    )
    addAlatKesehatanFailure$ = createEffect(() => this.actions$.pipe(ofType(AlatKesehatanActions.addFailure)), { dispatch: false })

    updateAlatKesehatan$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AlatKesehatanActions.updateInitial),
            switchMap(action => {
                return this.ModulAlatKesehatanService.update(action.payload.id_alat_kesehatan, action.payload)
                    .pipe(
                        map(res => {
                            return AlatKesehatanActions.updateSuccess({ payload: res.response })
                        }),
                        catchError(err => {
                            return of(AlatKesehatanActions.updateFailure({ message: err }))
                        })
                    )
            })
        )
    )
    updateAlatKesehatanSuccess$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AlatKesehatanActions.updateSuccess),
            map(action => {
               Swal.fire({
                    title: 'Data berhasil disimpan',
                    icon: 'success',
                    showCancelButton: false,
                    allowOutsideClick: false,
                    confirmButtonText: 'Ya, lanjutkan!',
                }).then((result) => {
                })
                return AlatKesehatanActions.tableData()
            })
        )
    )
    updateAlatKesehatanFailure$ = createEffect(() => this.actions$.pipe(ofType(AlatKesehatanActions.updateFailure)), { dispatch: false })

    getByIdAlatKesehatan$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AlatKesehatanActions.getByIdInitial),
            switchMap(action => {
                return this.ModulAlatKesehatanService.show(action.payload.id)
                    .pipe(
                        map(res => {
                            return AlatKesehatanActions.getByIdSuccess({ payload: res.response })
                        }),
                        catchError(err => {
                            return of(AlatKesehatanActions.getByIdFailure({ message: err }))
                        })
                    )
            })
        )
    )
    // getByIdAlatKesehatanSuccess$ = createEffect(() => this.actions$.pipe( ofType(AlatKesehatanActions.getByIdAlatKesehatanSuccess) ) )
    getByIdAlatKesehatanFailure$ = createEffect(() => this.actions$.pipe(ofType(AlatKesehatanActions.getByIdFailure)), { dispatch: false })

    deleteAlatKesehatan$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AlatKesehatanActions.deleteInitial),
            switchMap(action => {
                return this.ModulAlatKesehatanService.delete(action.payload.id)
                    .pipe(
                        map(res => {
                            return AlatKesehatanActions.deleteSuccess({ payload: res.response })
                        }),
                        catchError(err => {
                            return of(AlatKesehatanActions.deleteFailure({ message: err }))
                        })
                    )
            })
        )
    )

    deleteAlatKesehatanSuccess$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AlatKesehatanActions.deleteSuccess),
            map(res => {
                this.Toast.fire({
                    icon: 'success',
                    title: 'Data berhasil dihapus'
                })
                return AlatKesehatanActions.tableData()
            })
        )
    )
    deleteAlatKesehatanFailure$ = createEffect(() => this.actions$.pipe(ofType(AlatKesehatanActions.deleteFailure)), { dispatch: false })
}
