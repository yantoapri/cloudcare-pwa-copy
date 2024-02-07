import { fakturPayload } from 'src/app/private/models/class-payload-api/gudang-transaksi/pembelian-payload'
import { ModulFakturPembelianService } from 'src/app/private/modul-api/modul-gudang-transaksi/modul-faktur-pembelian.service'
import { Router } from '@angular/router';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { switchMap, catchError, map, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Injectable } from "@angular/core";
import Swal from 'sweetalert2/dist/sweetalert2.js'
import * as fakturPembelianActions from './faktur-pembelian.action'

@Injectable()
export class FakturPembelianEffects {
    constructor(
        private actions$: Actions,
        private ModulFakturPembelianService: ModulFakturPembelianService,
        private router: Router,
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

    addFakturPembelian$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fakturPembelianActions.addInitial),
            switchMap(action => {
                return this.ModulFakturPembelianService.add(action.payload)
                    .pipe(
                        map(res => {
                            return fakturPembelianActions.addSuccess({ payload: res.response })
                        }),
                        catchError(err => {
                            if(err.metaData.response_code!='0000'){
                                let msg=""
                                err.metaData.response.map((val)=>{
                                    msg+=val.field+" "+val.message
                                })
                                this.Toast.fire({
                                    icon: 'error',
                                    title: msg
                                })
                            }
                            return of(fakturPembelianActions.addFailure({ message: err }))
                        })
                    )
            })
        )
    )
    addFakturPembelianSuccess$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fakturPembelianActions.addSuccess),
            map(action => {
                this.Toast.fire({
                    icon: 'success',
                    title: 'Data berhasil disimpan'
                })
                this.router.navigate(['faktur/faktur-pembelian/view'])
                return fakturPembelianActions.tableData()
            })
        )
    )
    addFakturPembelianFailure$ = createEffect(() => this.actions$.pipe(ofType(fakturPembelianActions.addFailure)), { dispatch: false })

    updateFakturPembelian$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fakturPembelianActions.updateInitial),
            switchMap(action => {
                return this.ModulFakturPembelianService.update(action.payload.id_pembelian, action.payload)
                    .pipe(
                        map(res => {
                            return fakturPembelianActions.updateSuccess({ payload: res.response })
                        }),
                        catchError(err => {
                            return of(fakturPembelianActions.updateFailure({ message: err }))
                        })
                    )
            })
        )
    )
    updateFakturPembelianSuccess$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fakturPembelianActions.updateSuccess),
            map(action => {
                this.Toast.fire({
                    icon: 'success',
                    title: 'Data berhasil disimpan'
                })
                return fakturPembelianActions.tableData()
            })
        )
    )
    updateFakturPembelianFailure$ = createEffect(() => this.actions$.pipe(ofType(fakturPembelianActions.updateFailure)), { dispatch: false })

    getByIdFakturPembelian$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fakturPembelianActions.getByIdInitial),
            switchMap(action => {
                return this.ModulFakturPembelianService.show(action.payload.id)
                    .pipe(
                        map(res => {
                            return fakturPembelianActions.getByIdSuccess({ payload: res.response })
                        }),
                        catchError(err => {
                            return of(fakturPembelianActions.getByIdFailure({ message: err }))
                        })
                    )
            })
        )
    )
    // getByIdFakturPembelianSuccess$ = createEffect(() => this.actions$.pipe( ofType(fakturPembelianActions.getByIdFakturPembelianSuccess) ) )
    getByIdFakturPembelianFailure$ = createEffect(() => this.actions$.pipe(ofType(fakturPembelianActions.getByIdFailure)), { dispatch: false })

    deleteFakturPembelian$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fakturPembelianActions.deleteInitial),
            switchMap(action => {
                return this.ModulFakturPembelianService.delete(action.payload.id)
                    .pipe(
                        map(res => {
                            return fakturPembelianActions.deleteSuccess({ payload: res.response })
                        }),
                        catchError(err => {
                            return of(fakturPembelianActions.deleteFailure({ message: err }))
                        })
                    )
            })
        )
    )

    deleteFakturPembelianSuccess$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fakturPembelianActions.deleteSuccess),
            map(res => {
                this.Toast.fire({
                    icon: 'success',
                    title: 'Data berhasil dihapus'
                })
                return fakturPembelianActions.tableData()
            })
        )
    )
    deleteFakturPembelianFailure$ = createEffect(() => this.actions$.pipe(ofType(fakturPembelianActions.deleteFailure)), { dispatch: false })
}
