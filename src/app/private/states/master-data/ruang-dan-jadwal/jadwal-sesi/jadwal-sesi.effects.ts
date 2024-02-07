import { Actions, ofType, createEffect } from '@ngrx/effects';
import { switchMap, catchError, map, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Injectable } from "@angular/core";
import Swal from 'sweetalert2/dist/sweetalert2.js'
import { JadwalSesiService } from 'src/app/private/services/master-data/ruang-dan-jadwal/jadwal-sesi.service';
import * as JadwalSesiActions from './jadwal-sesi.actions'


@Injectable()
export class JadwalSesiEffects {

  constructor(
    private actions$ : Actions,
    private jadwalSesiService : JadwalSesiService
  ) {}

  public Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })

  addInitial$ = createEffect(() => this.actions$.pipe(ofType(JadwalSesiActions.addInitial),
    switchMap(action => {
      return this.jadwalSesiService.insert(action.payload)
      .pipe(
        map(res => {
          return JadwalSesiActions.addSuccess({ payload : res.response })
        }),
        catchError(err => {
          return of( JadwalSesiActions.addFailure({ message : err }) )
        })
      )
    })
  ))

  addSuccess$ = createEffect(() => this.actions$.pipe(ofType(JadwalSesiActions.addSuccess),
    map(action => {
      this.Toast.fire({
        icon: 'success',
        title: 'Data berhasil disimpan'
      })
      return JadwalSesiActions.tableData()
    })
  ))
  addFailure$ = createEffect(() => this.actions$.pipe(ofType(JadwalSesiActions.addFailure) ), { dispatch: false } )
  updateInitial$ = createEffect(() => this.actions$.pipe(ofType(JadwalSesiActions.updateInitial),
    switchMap(action => {
      return this.jadwalSesiService.update(action.payload.id_jadwal_sesi, action.payload)
      .pipe(
        map(res => {
          return JadwalSesiActions.updateSuccess({ payload : res.response })
        }),
        catchError(err => {
          return of( JadwalSesiActions.updateFailure({ message : err }) )
        })
      )
    })
  ))
  updateSuccess$ = createEffect(() => this.actions$.pipe(ofType(JadwalSesiActions.updateSuccess),
    map(action => {
      this.Toast.fire({
        icon: 'success',
        title: 'Data berhasil disimpan'
      })
      return JadwalSesiActions.tableData()
    })
  ))
  updateFailure$ = createEffect(() => this.actions$.pipe(ofType(JadwalSesiActions.updateFailure) ), { dispatch: false } )
  getByIdInitial$ = createEffect(() => this.actions$.pipe(ofType(JadwalSesiActions.getByIdInitial),
    switchMap(action => {
      return this.jadwalSesiService.show(action.payload.id)
      .pipe(
        map(res => {
          return JadwalSesiActions.getByIdSuccess({ payload : res.response })
        }),
        catchError(err => {
          return of( JadwalSesiActions.getByIdFailure({ message : err }) )
        })
      )
    })
  ))
  // getByIdSuccess$ = createEffect(() => this.actions$.pipe(ofType(JadwalSesiActions.getByIdSuccess) ) )
  getByIdFailure$ = createEffect(() => this.actions$.pipe(ofType(JadwalSesiActions.getByIdFailure) ), { dispatch: false } )
  deleteInitial$ = createEffect(() => this.actions$.pipe(ofType(JadwalSesiActions.deleteInitial),
    switchMap(action => {
      return this.jadwalSesiService.delete(action.payload.id)
      .pipe(
        map(res => {
          return JadwalSesiActions.deleteSuccess({ payload : res.response })
        }),
        catchError(err => {
          return of( JadwalSesiActions.deleteFailure({ message : err }) )
        })
      )
    })
  ))
  deleteSuccess$ = createEffect(() => this.actions$.pipe(ofType(JadwalSesiActions.deleteSuccess),
    map(action => {
      this.Toast.fire({
        icon: 'success',
        title: 'Data berhasil dihapus'
      })
      return JadwalSesiActions.tableData()
    })
  ))
  deleteFailure$ = createEffect(() => this.actions$.pipe(ofType(JadwalSesiActions.deleteFailure) ), { dispatch: false } )

}
