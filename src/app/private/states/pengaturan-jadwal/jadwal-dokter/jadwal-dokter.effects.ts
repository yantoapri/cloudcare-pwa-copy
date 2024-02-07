import { Actions, ofType, createEffect } from '@ngrx/effects';
import { switchMap, catchError, map, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Injectable } from "@angular/core";
import { Router } from '@angular/router';
import Swal from 'sweetalert2/dist/sweetalert2.js'

import * as JadwalDokterActions from './jadwal-dokter.actions'
// import { jadwalDokterService } from 'src/app/private/services/master-data/ruang-dan-jadwal/jadwal-libur.service';
import { JadwalDokterService } from 'src/app/private/services/pengaturan-jadwal/jadwal-dokter.service';

@Injectable()
export class JadwalDokterEffects {

  urlBacktoView = ['pengaturan-jadwal', 'pengaturan-jadwal-dokter', 'view']

  constructor(
    private actions$ : Actions,
    private jadwalDokterService : JadwalDokterService,
    private router : Router
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

  addInitial$ = createEffect(() =>
    this.actions$.pipe(
      ofType(JadwalDokterActions.addInitial),
      switchMap(action => {
        return this.jadwalDokterService.insert(action.payload)
        .pipe(
          map(res => {
            return JadwalDokterActions.addSuccess({ payload : res.response })
          }),
          catchError(err => {
            return of( JadwalDokterActions.addFailure({ message : err }) )
          })
        )
      })
    )
  )

  addSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(JadwalDokterActions.addSuccess),
      tap(action => {
        Swal.fire({
          title: 'Data berhasil disimpan',
          icon: 'success',
          showCancelButton: false,
          allowOutsideClick: false,
          confirmButtonText: 'Ya, lanjutkan!',
        }).then((result) => {
          this.router.navigate(this.urlBacktoView)
        })
      })
    ), {dispatch: false}
  )

  addFailure$ = createEffect(() =>
    this.actions$.pipe(ofType(JadwalDokterActions.addFailure)
  ), { dispatch: false })

  updateInitial$ = createEffect(() => this.actions$.pipe(ofType(JadwalDokterActions.updateInitial),
    switchMap(action => {
      return this.jadwalDokterService.update(action.payload.id_jadwal_dokter, action.payload)
      .pipe(
        map(res => {
          return JadwalDokterActions.updateSuccess({ payload : res.response })
        }),
        catchError(err => {
          return of( JadwalDokterActions.updateFailure({ message : err }) )
        })
      )
    })
  ))
  updateSuccess$ = createEffect(() => this.actions$.pipe(ofType(JadwalDokterActions.updateSuccess),
    tap(action => {
      Swal.fire({
        title: 'Data berhasil disimpan',
        icon: 'success',
        showCancelButton: false,
        allowOutsideClick: false,
        confirmButtonText: 'Ya, lanjutkan!',
      }).then((result) => {
        this.router.navigate(this.urlBacktoView)
      })
    })
  ), {dispatch: false})

  updateFailure$ = createEffect(() => this.actions$.pipe(ofType(JadwalDokterActions.updateFailure) ), { dispatch: false } )
  getByIdInitial$ = createEffect(() => this.actions$.pipe(ofType(JadwalDokterActions.getByIdInitial),
    switchMap(action => {
      return this.jadwalDokterService.show(action.payload.id)
      .pipe(
        map(res => {
          return JadwalDokterActions.getByIdSuccess({ payload : res.response })
        }),
        catchError(err => {
          return of( JadwalDokterActions.getByIdFailure({ message : err }) )
        })
      )
    })
  ))
  // getByIdSuccess$ = createEffect(() => this.actions$.pipe(ofType(JadwalDokterActions.getByIdSuccess) ) )
  getByIdFailure$ = createEffect(() => this.actions$.pipe(ofType(JadwalDokterActions.getByIdFailure) ), { dispatch: false } )
  deleteInitial$ = createEffect(() => this.actions$.pipe(ofType(JadwalDokterActions.deleteInitial),
    switchMap(action => {
      return this.jadwalDokterService.delete(action.id,action.payload)
      .pipe(
        map(res => {
          return JadwalDokterActions.deleteSuccess({ payload : res.response })
        }),
        catchError(err => {
          return of( JadwalDokterActions.deleteFailure({ message : err }) )
        })
      )
    })
  ))
  deleteSuccess$ = createEffect(() => this.actions$.pipe(ofType(JadwalDokterActions.deleteSuccess),
    map(action => {
      this.Toast.fire({
        icon: 'success',
        title: 'Data berhasil dihapus'
      })
      return JadwalDokterActions.tableData()
    })
  ))
  deleteFailure$ = createEffect(() => this.actions$.pipe(ofType(JadwalDokterActions.deleteFailure) ), { dispatch: false } )

}
