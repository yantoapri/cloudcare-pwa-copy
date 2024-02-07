import { Actions, ofType, createEffect } from '@ngrx/effects';
import { switchMap, catchError, map, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Injectable } from "@angular/core";
import { Router } from '@angular/router';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import * as JadwalLiburActions from './jadwal-libur.actions'
import { JadwalLiburService } from 'src/app/private/services/master-data/ruang-dan-jadwal/jadwal-libur.service';

@Injectable()
export class JadwalLiburEffects {

  urlBacktoView = ['master-data', 'ruang-dan-jadwal', 'jadwal-libur', 'view']

  constructor(
    private actions$ : Actions,
    private jadwalLiburService : JadwalLiburService,
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
      ofType(JadwalLiburActions.addInitial),
      switchMap(action => {
        return this.jadwalLiburService.insert(action.payload)
        .pipe(
          map(res => {
            return JadwalLiburActions.addSuccess({ payload : res.response })
          }),
          catchError(err => {
            return of( JadwalLiburActions.addFailure({ message : err }) )
          })
        )
      })
    )
  )

  addSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(JadwalLiburActions.addSuccess),
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
    this.actions$.pipe(ofType(JadwalLiburActions.addFailure)
  ), { dispatch: false })

  updateInitial$ = createEffect(() => this.actions$.pipe(ofType(JadwalLiburActions.updateInitial),
    switchMap(action => {
      return this.jadwalLiburService.update(action.payload.id_jadwal_libur, action.payload)
      .pipe(
        map(res => {
          return JadwalLiburActions.updateSuccess({ payload : res.response })
        }),
        catchError(err => {
          return of( JadwalLiburActions.updateFailure({ message : err }) )
        })
      )
    })
  ))
  updateSuccess$ = createEffect(() => this.actions$.pipe(ofType(JadwalLiburActions.updateSuccess),
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

  updateFailure$ = createEffect(() => this.actions$.pipe(ofType(JadwalLiburActions.updateFailure) ), { dispatch: false } )
  getByIdInitial$ = createEffect(() => this.actions$.pipe(ofType(JadwalLiburActions.getByIdInitial),
    switchMap(action => {
      return this.jadwalLiburService.show(action.payload.id)
      .pipe(
        map(res => {
          return JadwalLiburActions.getByIdSuccess({ payload : res.response })
        }),
        catchError(err => {
          return of( JadwalLiburActions.getByIdFailure({ message : err }) )
        })
      )
    })
  ))
  // getByIdSuccess$ = createEffect(() => this.actions$.pipe(ofType(JadwalLiburActions.getByIdSuccess) ) )
  getByIdFailure$ = createEffect(() => this.actions$.pipe(ofType(JadwalLiburActions.getByIdFailure) ), { dispatch: false } )
  deleteInitial$ = createEffect(() => this.actions$.pipe(ofType(JadwalLiburActions.deleteInitial),
    switchMap(action => {
      return this.jadwalLiburService.delete(action.payload.id)
      .pipe(
        map(res => {
          return JadwalLiburActions.deleteSuccess({ payload : res.response })
        }),
        catchError(err => {
          return of( JadwalLiburActions.deleteFailure({ message : err }) )
        })
      )
    })
  ))
  deleteSuccess$ = createEffect(() => this.actions$.pipe(ofType(JadwalLiburActions.deleteSuccess),
    map(action => {
      this.Toast.fire({
        icon: 'success',
        title: 'Data berhasil dihapus'
      })
      return JadwalLiburActions.tableData()
    })
  ))
  deleteFailure$ = createEffect(() => this.actions$.pipe(ofType(JadwalLiburActions.deleteFailure) ), { dispatch: false } )

}
