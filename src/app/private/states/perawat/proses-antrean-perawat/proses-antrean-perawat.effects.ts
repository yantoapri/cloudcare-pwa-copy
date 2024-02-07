
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { switchMap, catchError, map, tap } from 'rxjs/operators';
import { of, pipe } from 'rxjs';
import { Injectable } from "@angular/core";
import Swal from 'sweetalert2/dist/sweetalert2.js'
import { Router } from '@angular/router';
import { ProsesAntreanPerawatService } from 'src/app/private/services/perawat/proses-antrean-perawat.service';
import * as ProsesAntreanPerawatActions from './proses-antrean-perawat.actions'

@Injectable()
export class ProsesAntreanPerawatEffects {

  constructor(
    private actions$ : Actions,
    private prosesAntreanPerawatService : ProsesAntreanPerawatService,
    private router : Router
  ) {}

  addInitial$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProsesAntreanPerawatActions.addInitial),
      switchMap(action => {
        return this.prosesAntreanPerawatService.insert(action.payload)
        .pipe(
          map(res => {
            return ProsesAntreanPerawatActions.addSuccess({ payload: res.response, kode_poli : action.kode_poli })
          }),
          catchError(err => {
            return of( ProsesAntreanPerawatActions.addFailure({ message : err }) )
          })
        )
      })
    )
  )
  addSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProsesAntreanPerawatActions.addSuccess),
      tap(action => {
        Swal.fire({
          title: 'Data berhasil disimpan',
          icon: 'success',
          showCancelButton: false,
          allowOutsideClick: false,
          confirmButtonText: 'Ya, lanjutkan!',
        }).then((result) => {
          this.router.navigate(['perawat', 'antrean-perawat', action.kode_poli, 'view' ])
        })
      })
    ), {dispatch: false}
  )
  addFailure$ = createEffect(() => this.actions$.pipe(ofType(ProsesAntreanPerawatActions.addFailure) ), { dispatch: false })

  updateInitial$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProsesAntreanPerawatActions.updateInitial),
      switchMap(action => {
        return this.prosesAntreanPerawatService.update(action.payload, action.payload.id_tindakan_perawat)
        .pipe(
          map(res => {
            return ProsesAntreanPerawatActions.updateSuccess({ payload: res.response, kode_poli : action.kode_poli })
          }),
          catchError(err => {
            return of( ProsesAntreanPerawatActions.updateFailure({ message : err }) )
          })
        )
      })
    )
  )
  updateSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProsesAntreanPerawatActions.updateSuccess),
      tap(action => {
        Swal.fire({
          title: 'Data berhasil disimpan',
          icon: 'success',
          showCancelButton: false,
          allowOutsideClick: false,
          confirmButtonText: 'Ya, lanjutkan!',
        }).then((result) => {
          this.router.navigate(['perawat', 'antrean-perawat', action.kode_poli, 'view' ])
        })
      })
    ), {dispatch: false}
  )
  updateFailure$ = createEffect(() => this.actions$.pipe(ofType(ProsesAntreanPerawatActions.updateFailure) ), { dispatch: false } )

  getByIdInitial$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProsesAntreanPerawatActions.getByIdInitial),
      switchMap(action => {
        return this.prosesAntreanPerawatService.show(action.payload.id)
        .pipe(
          map(res=> {
            return ProsesAntreanPerawatActions.getByIdSuccess({ payload: res.response })
          }),
          catchError(err => {
            return of( ProsesAntreanPerawatActions.getByIdFailure({ message : err }) )
          })
        )
      })
    )
  )
  // getByIdSuccess$ = createEffect(() => this.actions$.pipe(ofType(ProsesAntreanPerawatActions.getByIdSuccess) ) )
  getByIdFailure$ = createEffect(() => this.actions$.pipe(ofType(ProsesAntreanPerawatActions.getByIdFailure) ), { dispatch: false })

  deleteInitial$ = createEffect(() => this.actions$.pipe(ofType(ProsesAntreanPerawatActions.deleteInitial) ) )
  deleteSuccess$ = createEffect(() => this.actions$.pipe(ofType(ProsesAntreanPerawatActions.deleteSuccess) ) )
  deleteFailure$ = createEffect(() => this.actions$.pipe(ofType(ProsesAntreanPerawatActions.deleteFailure) ), { dispatch: false } )

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
}
