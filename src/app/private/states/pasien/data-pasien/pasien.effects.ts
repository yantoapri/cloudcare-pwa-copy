import { Actions, ofType, createEffect } from '@ngrx/effects';
import { switchMap, catchError, map, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Injectable } from "@angular/core";
import { Router } from '@angular/router';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import * as PasienActions from './pasien.actions'
import { DataPasienService } from 'src/app/private/services/pasien/data-pasien.service';

@Injectable()
export class PasienEffects {

  urlBacktoView = ['pasien', 'data-pasien', 'view']

  constructor(
    private actions$ : Actions,
    private dataPasienService : DataPasienService,
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
      ofType(PasienActions.addInitial),
      switchMap(action => {
        return this.dataPasienService.insert(action.payload)
        .pipe(
          map(res => {
            return PasienActions.addSuccess({ payload : res.response })
          }),
          catchError(err => {
            return of( PasienActions.addFailure({ message : err }) )
          })
        )
      })
    )
  )

  addSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PasienActions.addSuccess),
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
    this.actions$.pipe(ofType(PasienActions.addFailure)
  ), { dispatch: false })

  updateInitial$ = createEffect(() => this.actions$.pipe(ofType(PasienActions.updateInitial),
    switchMap(action => {
      return this.dataPasienService.update(action.payload.id_pasien, action.payload)
      .pipe(
        map(res => {
          return PasienActions.updateSuccess({ payload : res.response })
        }),
        catchError(err => {
          return of( PasienActions.updateFailure({ message : err }) )
        })
      )
    })
  ))
  updateSuccess$ = createEffect(() => this.actions$.pipe(ofType(PasienActions.updateSuccess),
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

  updateFailure$ = createEffect(() => this.actions$.pipe(ofType(PasienActions.updateFailure) ), { dispatch: false } )
  getByIdInitial$ = createEffect(() => this.actions$.pipe(ofType(PasienActions.getByIdInitial),
    switchMap(action => {
      return this.dataPasienService.show(action.payload.id)
      .pipe(
        map(res => {
          return PasienActions.getByIdSuccess({ payload : res.response })
        }),
        catchError(err => {
          return of( PasienActions.getByIdFailure({ message : err }) )
        })
      )
    })
  ))
  // getByIdSuccess$ = createEffect(() => this.actions$.pipe(ofType(PasienActions.getByIdSuccess) ) )
  getByIdFailure$ = createEffect(() => this.actions$.pipe(ofType(PasienActions.getByIdFailure) ), { dispatch: false } )
  deleteInitial$ = createEffect(() => this.actions$.pipe(ofType(PasienActions.deleteInitial),
    switchMap(action => {
      return this.dataPasienService.delete(action.payload.id)
      .pipe(
        map(res => {
          return PasienActions.deleteSuccess({ payload : res.response })
        }),
        catchError(err => {
          return of( PasienActions.deleteFailure({ message : err }) )
        })
      )
    })
  ))
  deleteSuccess$ = createEffect(() => this.actions$.pipe(ofType(PasienActions.deleteSuccess),
    map(action => {
      this.Toast.fire({
        icon: 'success',
        title: 'Data berhasil dihapus'
      })
      return PasienActions.tableData()
    })
  ))
  deleteFailure$ = createEffect(() => this.actions$.pipe(ofType(PasienActions.deleteFailure) ), { dispatch: false } )

}
