import { MasterPoliPayload } from "src/app/private/models/class-payload-api/manajemen-klinik/master-poli-payload";
import { MasterPoliService } from "src/app/private/services/manajemen-klinik/master-poli.service";
import * as MasterPoliActions from './master-poli.actions'
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { switchMap, catchError, map, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Injectable } from "@angular/core";
import Swal from 'sweetalert2/dist/sweetalert2.js'

@Injectable()
export class MasterPoliEffects  {

  constructor (
    private actions$ : Actions,
    private masterPoliService : MasterPoliService
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

  addMasterPoli$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MasterPoliActions.addMasterPoli),
      switchMap(action => {
        return this.masterPoliService.insert(action.payload)
        .pipe(
          map(res => {
            return MasterPoliActions.addMasterPoliSuccess({ payload: res.response })
          }),
          catchError(err => {
            return of( MasterPoliActions.addMasterPoliFailure({ message : err }) )
          })
        )
      })
    )
  )
  addMasterPoliSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MasterPoliActions.addMasterPoliSuccess),
      map(action => {
        this.Toast.fire({
          icon: 'success',
          title: 'Data berhasil disimpan'
        })
        return MasterPoliActions.tableData()
      })
    )
  )

  addMasterPoliFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MasterPoliActions.addMasterPoliFailure)
    ), { dispatch: false }
  )

  updateMasterPoli$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MasterPoliActions.updateMasterPoli),
      switchMap(action => {
        return this.masterPoliService.update(action.payload.id_master_poli, action.payload)
        .pipe(
          map(res => {
            return MasterPoliActions.updateMasterPoliSuccess({ payload : res.response })
          }),
          catchError(err => {
            return of(MasterPoliActions.updateMasterPoliFailure({ message : err }))
          })
        )
      })
    )
  )
  updateMasterPoliSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MasterPoliActions.updateMasterPoliSuccess),
      map(action => {
        this.Toast.fire({
          icon: 'success',
          title: 'Data berhasil disimpan'
        })
        return MasterPoliActions.tableData()
      })
    )
  )
  updateMasterPoliFailure$ = createEffect(() => this.actions$.pipe(ofType(MasterPoliActions.updateMasterPoliFailure)), { dispatch: false })

  getMasterPoliById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MasterPoliActions.getMasterPoliById),
      switchMap(action => {
        return this.masterPoliService.show(action.payload.id)
        .pipe(
          map(res => {
            return MasterPoliActions.getMasterPoliByIdSuccess({ payload: res.response })
          }),
          catchError(err => {
            return of( MasterPoliActions.getMasterPoliByIdFailure({ message : err }) )
          })
        )
      })
    )
  )
  // getMasterPoliByIdSuccess$ = createEffect(() => this.actions$.pipe(ofType(MasterPoliActions.getMasterPoliByIdSuccess)) )
  getMasterPoliByIdFailure$ = createEffect(() => this.actions$.pipe(ofType(MasterPoliActions.getMasterPoliByIdFailure)), { dispatch: false } )

  deleteMasterPoli$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MasterPoliActions.deleteMasterPoli),
      switchMap(action => {
        return this.masterPoliService.delete(action.payload.id)
        .pipe(
          map(res => {
            return MasterPoliActions.deleteMasterPoliSuccess({ payload : res.response })
          }),
          catchError(err => {
            return of(MasterPoliActions.deleteMasterPoliFailure({ message : err }))
          })
        )
      })
    )
  )
  deleteMasterPoliSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MasterPoliActions.deleteMasterPoliSuccess),
      map(action => {
        this.Toast.fire({
          icon: 'success',
          title: 'Data berhasil dihapus'
        })

        return MasterPoliActions.tableData()
      })
    )
  )
  deleteMasterPoliFailure$ = createEffect(() => this.actions$.pipe(ofType(MasterPoliActions.deleteMasterPoliFailure)), { dispatch: false } )
  // tableData$ = createEffect(() => this.actions$.pipe(ofType(MasterPoliActions.tableData)) )
  // clearData$ = createEffect(() => this.actions$.pipe(ofType(MasterPoliActions.clearData)) )


}
