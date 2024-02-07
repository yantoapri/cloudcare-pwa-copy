import { AlatKesehatanPayload } from 'src/app/private/models/class-payload-api/alat-kesehatan/alat-kesehatan-payload'
import { ModulStokOpnameAlatService } from 'src/app/private/modul-api/modul-gudang-transaksi/modul-stokopname-alat.service'

import { Actions, ofType, createEffect } from '@ngrx/effects';
import { switchMap, catchError, map, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Injectable } from "@angular/core";
import Swal from 'sweetalert2/dist/sweetalert2.js'
import * as StokOpnameActions from './stok-opname.action'

@Injectable()
export class AlatKesehatanEffects {
    constructor(
        private actions$: Actions,
        private ModulStokOpnameAlatService: ModulStokOpnameAlatService
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

    addAlatKesehatan$ = createEffect(() =>
        this.actions$.pipe(
            ofType(StokOpnameActions.addInitial),
            switchMap(action => {
                return this.ModulStokOpnameAlatService.add(action.payload, action.id)
                    .pipe(
                        map(res => {
                            return StokOpnameActions.addSuccess({ payload: res.response })
                        }),
                        catchError(err => {
                            return of(StokOpnameActions.addFailure({ message: err }))
                        })
                    )
            })
        )
    )
    addAlatKesehatanSuccess$ = createEffect(() =>
        this.actions$.pipe(
            ofType(StokOpnameActions.addSuccess),
            map(action => {
                this.Toast.fire({
                    icon: 'success',
                    title: 'Data berhasil disimpan'
                })
                return StokOpnameActions.tableData()
            })
        )
    )
    addAlatKesehatanFailure$ = createEffect(() => this.actions$.pipe(ofType(StokOpnameActions.addFailure)), { dispatch: false })

    // updateAlatKesehatan$ = createEffect(() =>
    //     this.actions$.pipe(
    //         ofType(StokOpnameActions.updateInitial),
    //         switchMap(action => {
    //             return this.ModulStokOpnameAlatService.update(action.payload.id_alat_kesehatan, action.payload)
    //                 .pipe(
    //                     map(res => {
    //                         return StokOpnameActions.updateSuccess({ payload: res.response })
    //                     }),
    //                     catchError(err => {
    //                         return of(StokOpnameActions.updateFailure({ message: err }))
    //                     })
    //                 )
    //         })
    //     )
    // )
    updateAlatKesehatanSuccess$ = createEffect(() =>
        this.actions$.pipe(
            ofType(StokOpnameActions.updateSuccess),
            map(action => {
                this.Toast.fire({
                    icon: 'success',
                    title: 'Data berhasil disimpan'
                })
                return StokOpnameActions.tableData()
            })
        )
    )
    updateAlatKesehatanFailure$ = createEffect(() => this.actions$.pipe(ofType(StokOpnameActions.updateFailure)), { dispatch: false })

    getByIdAlatKesehatan$ = createEffect(() =>
        this.actions$.pipe(
            ofType(StokOpnameActions.getByIdInitial),
            switchMap(action => {
                return this.ModulStokOpnameAlatService.show(action.payload.id)
                    .pipe(
                        map(res => {
                            return StokOpnameActions.getByIdSuccess({ payload: res.response })
                        }),
                        catchError(err => {
                            return of(StokOpnameActions.getByIdFailure({ message: err }))
                        })
                    )
            })
        )
    )
    // getByIdAlatKesehatanSuccess$ = createEffect(() => this.actions$.pipe( ofType(StokOpnameActions.getByIdAlatKesehatanSuccess) ) )
    getByIdAlatKesehatanFailure$ = createEffect(() => this.actions$.pipe(ofType(StokOpnameActions.getByIdFailure)), { dispatch: false })

    // deleteAlatKesehatan$ = createEffect(() =>
    //     this.actions$.pipe(
    //         ofType(StokOpnameActions.deleteInitial),
    //         switchMap(action => {
    //             return this.ModulStokOpnameAlatService.delete(action.payload.id)
    //                 .pipe(
    //                     map(res => {
    //                         return StokOpnameActions.deleteSuccess({ payload: res.response })
    //                     }),
    //                     catchError(err => {
    //                         return of(StokOpnameActions.deleteFailure({ message: err }))
    //                     })
    //                 )
    //         })
    //     )
    // )

    // deleteAlatKesehatanSuccess$ = createEffect(() =>
    //     this.actions$.pipe(
    //         ofType(StokOpnameActions.deleteSuccess),
    //         map(res => {
    //             this.Toast.fire({
    //                 icon: 'success',
    //                 title: 'Data berhasil dihapus'
    //             })
    //             return StokOpnameActions.tableData()
    //         })
    //     )
    // )
    // deleteAlatKesehatanFailure$ = createEffect(() => this.actions$.pipe(ofType(StokOpnameActions.deleteFailure)), { dispatch: false })
}
