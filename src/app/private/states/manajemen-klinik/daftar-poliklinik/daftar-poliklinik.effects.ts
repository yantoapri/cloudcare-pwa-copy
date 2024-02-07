import { DaftarPoliklinikPayload } from 'src/app/private/models/class-payload-api/manajemen-klinik/daftar-poliklinik-payload'
import { DaftarPoliklinikService } from 'src/app/private/services/manajemen-klinik/daftar-poliklinik.service';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { switchMap, catchError, map, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Injectable } from "@angular/core";
import Swal from 'sweetalert2/dist/sweetalert2.js'
import * as DaftarPoliklinikActions from './daftar-poliklinik.actions'

@Injectable()
export class DaftarPoliklinikEffects {

  constructor (
    private actions$ : Actions,
    private daftarPoliklinikService: DaftarPoliklinikService
  ) {}

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

  addDaftarPoliklinik$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DaftarPoliklinikActions.addDaftarPoliklinik),
      switchMap(action => {
        return this.daftarPoliklinikService.insert(action.payload)
        .pipe(
          map(res => {
            return DaftarPoliklinikActions.addDaftarPoliklinikSuccess({ payload : res.response })
          }),
          catchError(err => {
            return of( DaftarPoliklinikActions.addDaftarPoliklinikFailure({ message : err }) )
          })
        )
      })
    )
  )

  addDaftarPoliklinikSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DaftarPoliklinikActions.addDaftarPoliklinikSuccess),
      map(action => {
        this.Toast.fire({
          icon: 'success',
          title: 'Data berhasil disimpan'
        })
        return DaftarPoliklinikActions.tableData()
      })
    )
  )
  addDaftarPoliklinikFailure$ = createEffect(() => this.actions$.pipe(ofType(DaftarPoliklinikActions.addDaftarPoliklinikFailure) ), { dispatch: false } )

  updateDaftarPoliklinik$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DaftarPoliklinikActions.updateDaftarPoliklinik),
      switchMap(action => {
        return this.daftarPoliklinikService.update(action.payload.id_poliklinik, action.payload)
        .pipe(
          map(res => {
            return DaftarPoliklinikActions.updateDaftarPoliklinikSuccess({ payload : res.response })
          }),
          catchError(err => {
            return of( DaftarPoliklinikActions.updateDaftarPoliklinikFailure({ message : err }) )
          })
        )
      })
    )
  )

  updateDaftarPoliklinikSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DaftarPoliklinikActions.updateDaftarPoliklinikSuccess),
      map(action => {
        this.Toast.fire({
          icon: 'success',
          title: 'Data berhasil disimpan'
        })
        return DaftarPoliklinikActions.tableData()
      })
    )
  )
  updateDaftarPoliklinikFailure$ = createEffect(() => this.actions$.pipe(ofType(DaftarPoliklinikActions.updateDaftarPoliklinikFailure) ), { dispatch: false } )

  getBbyIdDaftarPoliklinik$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DaftarPoliklinikActions.getBbyIdDaftarPoliklinik),
      switchMap(action => {
        return this.daftarPoliklinikService.show(action.payload.id)
        .pipe(
          map(res => {
            return DaftarPoliklinikActions.getBbyIdDaftarPoliklinikSuccess({ payload : res.response })
          }),
          catchError(err => {
            return of( DaftarPoliklinikActions.getBbyIdDaftarPoliklinikFailure({ message : err }) )
          })
        )
      })
    )
  )
  // getBbyIdDaftarPoliklinikSuccess$ = createEffect(() => this.actions$.pipe(ofType(DaftarPoliklinikActions.getBbyIdDaftarPoliklinikSuccess) ) )
  getBbyIdDaftarPoliklinikFailure$ = createEffect(() => this.actions$.pipe(ofType(DaftarPoliklinikActions.getBbyIdDaftarPoliklinikFailure) ), { dispatch: false } )

  deleteDaftarPoliklinik$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DaftarPoliklinikActions.deleteDaftarPoliklinik),
      switchMap(action => {
        return this.daftarPoliklinikService.delete(action.payload.id)
        .pipe(
          map(res => {
            return DaftarPoliklinikActions.deleteDaftarPoliklinikSuccess({ payload : res.response })
          }),
          catchError(err => {
            return of( DaftarPoliklinikActions.deleteDaftarPoliklinikFailure({ message: err }) )
          })
        )
      })
    )
  )
  deleteDaftarPoliklinikSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DaftarPoliklinikActions.deleteDaftarPoliklinikSuccess),
      map(action => {
        this.Toast.fire({
          icon: 'success',
          title: 'Data berhasil dihapus'
        })
        return DaftarPoliklinikActions.tableData()
      })
    )
  )
  deleteDaftarPoliklinikFailure$ = createEffect(() => this.actions$.pipe(ofType(DaftarPoliklinikActions.deleteDaftarPoliklinikFailure) ), { dispatch: false } )

}
