import { returPayload,returResep } from 'src/app/private/models/class-payload-api/gudang-transaksi/retur-penjualan-payload'
import { ModulReturService } from 'src/app/private/modul-api/modul-gudang-transaksi/modul-retur-penjualan'

import { Actions, ofType, createEffect } from '@ngrx/effects';
import { switchMap, catchError, map, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Injectable } from "@angular/core";
import Swal from 'sweetalert2/dist/sweetalert2.js'
import * as returActions from './retur.action'
import { Router } from '@angular/router';
@Injectable()
export class ReturEffects {
    constructor(
        private actions$: Actions,
        private ModulReturService: ModulReturService,
        private router : Router
    ) { }
    urlBacktoView = ['retur', 'retur-penjualan', 'view']
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
            ofType(returActions.addInitial),
            switchMap(action => {
                return this.ModulReturService.add(action.payload)
                    .pipe(
                        map(res => {
                            return returActions.addSuccess({ payload: res.response })
                        }),
                        catchError(err => {
                            return of(returActions.addFailure({ message: err }))
                        })
                    )
            })
        )
    )
    addSuccess$ = createEffect(() =>
        this.actions$.pipe(
            ofType(returActions.addSuccess),
            map(action => {
                this.Toast.fire({
                    icon: 'success',
                    title: 'Data berhasil disimpan'
                })
                this.router.navigate(this.urlBacktoView)
                return returActions.tableData()
            })
        )
    )
    addFailure$ = createEffect(() => this.actions$.pipe(ofType(returActions.addFailure)), { dispatch: false })
    
    addResepInitial$ = createEffect(() =>
        this.actions$.pipe(
            ofType(returActions.addResepInitial),
            switchMap(action => {
                return this.ModulReturService.addResep(action.payload)
                    .pipe(
                        map(res => {
                            return returActions.addResepSuccess({ payload: res.response })
                        }),
                        catchError(err => {
                            return of(returActions.addResepFailure({ message: err }))
                        })
                    )
            })
        )
    )
    addResepSuccess$ = createEffect(() =>
        this.actions$.pipe(
            ofType(returActions.addResepSuccess),
            map(action => {
                this.Toast.fire({
                    icon: 'success',
                    title: 'Data berhasil disimpan'
                })
                return returActions.tableData()
            })
        )
    )
    addResepFailure$ = createEffect(() => this.actions$.pipe(ofType(returActions.addResepFailure)), { dispatch: false })

    // updateInitial$ = createEffect(() =>
    //     this.actions$.pipe(
    //         ofType(returActions.updateInitial),
    //         switchMap(action => {
    //             return this.ModulReturService.update(action.payload)
    //                 .pipe(
    //                     map(res => {
    //                         return returActions.updateSuccess({ payload: res.response })
    //                     }),
    //                     catchError(err => {
    //                         return of(returActions.updateFailure({ message: err }))
    //                     })
    //                 )
    //         })
    //     )
    // )
    // updateSuccess$ = createEffect(() =>
    //     this.actions$.pipe(
    //         ofType(returActions.updateSuccess),
    //         map(action => {
    //             this.Toast.fire({
    //                 icon: 'success',
    //                 title: 'Data berhasil disimpan'
    //             })
    //             return returActions.tableData()
    //         })
    //     )
    // )
    // updateFailure$ = createEffect(() => this.actions$.pipe(ofType(returActions.updateFailure)), { dispatch: false })

    getByIdInitial$ = createEffect(() =>
        this.actions$.pipe(
            ofType(returActions.getByIdInitial),
            switchMap(action => {
                return this.ModulReturService.show(action.payload.id)
                    .pipe(
                        map(res => {
                            return returActions.getByIdSuccess({ payload: res.response })
                        }),
                        catchError(err => {
                            return of(returActions.getByIdFailure({ message: err }))
                        })
                    )
            })
        )
    )
    // getByIddefektaSuccess$ = createEffect(() => this.actions$.pipe( ofType(returActions.getByIddefektaSuccess) ) )
    getByIdFailure$ = createEffect(() => this.actions$.pipe(ofType(returActions.getByIdFailure)), { dispatch: false })

    deleteInitial$ = createEffect(() =>
        this.actions$.pipe(
            ofType(returActions.deleteInitial),
            switchMap(action => {
                return this.ModulReturService.delete(action.payload.id)
                    .pipe(
                        map(res => {
                            return returActions.deleteSuccess({ payload: res.response })
                        }),
                        catchError(err => {
                            return of(returActions.deleteFailure({ message: err }))
                        })
                    )
            })
        )
    )

    deleteSuccess$ = createEffect(() =>
        this.actions$.pipe(
            ofType(returActions.deleteSuccess),
            map(res => {
                this.Toast.fire({
                    icon: 'success',
                    title: 'Data berhasil dihapus'
                })
                return returActions.tableData()
            })
        )
    )
    deleteFailure$ = createEffect(() => this.actions$.pipe(ofType(returActions.deleteFailure)), { dispatch: false })

}
