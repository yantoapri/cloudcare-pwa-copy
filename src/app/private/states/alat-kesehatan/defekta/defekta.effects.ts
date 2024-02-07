import { defektaAlatPayload } from 'src/app/private/models/class-payload-api/alat-kesehatan/defekta-payload'
import { ModulDefektaAlatService } from 'src/app/private/modul-api/modul-master-node/modul-defekta-alat.service'

import { Actions, ofType, createEffect } from '@ngrx/effects';
import { switchMap, catchError, map, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Injectable } from "@angular/core";
import Swal from 'sweetalert2/dist/sweetalert2.js'
import * as defektaActions from './defekta.action'

@Injectable()
export class defektaAlatEffects {
    constructor(
        private actions$: Actions,
        private ModulDefektaAlatService: ModulDefektaAlatService
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
            ofType(defektaActions.addInitial),
            switchMap(action => {
                return this.ModulDefektaAlatService.add(action.payload)
                    .pipe(
                        map(res => {
                            return defektaActions.addSuccess({ payload: res.response })
                        }),
                        catchError(err => {
                            return of(defektaActions.addFailure({ message: err }))
                        })
                    )
            })
        )
    )
    addSuccess$ = createEffect(() =>
        this.actions$.pipe(
            ofType(defektaActions.addSuccess),
            map(action => {
                this.Toast.fire({
                    icon: 'success',
                    title: 'Data berhasil disimpan'
                })
                return defektaActions.tableData()
            })
        )
    )
    addFailure$ = createEffect(() => this.actions$.pipe(ofType(defektaActions.addFailure)), { dispatch: false })

    updateInitial$ = createEffect(() =>
        this.actions$.pipe(
            ofType(defektaActions.updateInitial),
            switchMap(action => {
                return this.ModulDefektaAlatService.update(action.payload)
                    .pipe(
                        map(res => {
                            return defektaActions.updateSuccess({ payload: res.response })
                        }),
                        catchError(err => {
                            return of(defektaActions.updateFailure({ message: err }))
                        })
                    )
            })
        )
    )
    updateSuccess$ = createEffect(() =>
        this.actions$.pipe(
            ofType(defektaActions.updateSuccess),
            map(action => {
                this.Toast.fire({
                    icon: 'success',
                    title: 'Data berhasil disimpan'
                })
                return defektaActions.tableData()
            })
        )
    )
    updateFailure$ = createEffect(() => this.actions$.pipe(ofType(defektaActions.updateFailure)), { dispatch: false })

    getByIdInitial$ = createEffect(() =>
        this.actions$.pipe(
            ofType(defektaActions.getByIdInitial),
            switchMap(action => {
                return this.ModulDefektaAlatService.show(action.payload.id)
                    .pipe(
                        map(res => {
                            return defektaActions.getByIdSuccess({ payload: res.response })
                        }),
                        catchError(err => {
                            return of(defektaActions.getByIdFailure({ message: err }))
                        })
                    )
            })
        )
    )
    // getByIddefektaSuccess$ = createEffect(() => this.actions$.pipe( ofType(defektaActions.getByIddefektaSuccess) ) )
    getByIdFailure$ = createEffect(() => this.actions$.pipe(ofType(defektaActions.getByIdFailure)), { dispatch: false })

    deleteInitial$ = createEffect(() =>
        this.actions$.pipe(
            ofType(defektaActions.deleteInitial),
            switchMap(action => {
                return this.ModulDefektaAlatService.delete(action.payload.id)
                    .pipe(
                        map(res => {
                            return defektaActions.deleteSuccess({ payload: res.response })
                        }),
                        catchError(err => {
                            return of(defektaActions.deleteFailure({ message: err }))
                        })
                    )
            })
        )
    )

    deleteSuccess$ = createEffect(() =>
        this.actions$.pipe(
            ofType(defektaActions.deleteSuccess),
            map(res => {
                this.Toast.fire({
                    icon: 'success',
                    title: 'Data berhasil dihapus'
                })
                return defektaActions.tableData()
            })
        )
    )
    deleteFailure$ = createEffect(() => this.actions$.pipe(ofType(defektaActions.deleteFailure)), { dispatch: false })
}
