import { Actions, ofType, createEffect } from '@ngrx/effects';
import { switchMap, catchError, map, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Injectable } from "@angular/core";
import Swal from 'sweetalert2/dist/sweetalert2.js'
import { Router } from '@angular/router';
import { InformasiKlinikService } from 'src/app/private/services/manajemen-klinik/informasi-klinik.service';
import * as InformasiKlinikActions from './informasi-klinik.actions'
@Injectable()
export class InformasiKlinikEffects {

  urlBacktoView = ['manajemen-klinik', 'informasi-klinik', 'view']

  constructor(
    private actions$ : Actions,
    private informasiKlinikService : InformasiKlinikService,
    private router : Router
  ){}

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


  updateInitial$ = createEffect(() => this.actions$.pipe(ofType(InformasiKlinikActions.updateInitial),
    switchMap(action => {
      return this.informasiKlinikService.update(action.payload)
      .pipe(
        map(res => {
          return InformasiKlinikActions.updateSuccess({ payload : res.response })
        }),
        catchError(err => {
          return of( InformasiKlinikActions.updateFailure({ message : err }) )
        })
      )
    })
  ))

  updateSuccess$ = createEffect(() => this.actions$.pipe(ofType(InformasiKlinikActions.updateSuccess),
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

  updateFailure$ = createEffect(() => this.actions$.pipe(ofType(InformasiKlinikActions.updateFailure) ), { dispatch: false } )

  getByIdInitial$ = createEffect(() => this.actions$.pipe(ofType(InformasiKlinikActions.getByIdInitial),
    switchMap(action => {
      return this.informasiKlinikService.show()
      .pipe(
        map(res => {
          return InformasiKlinikActions.getByIdSuccess({ payload : res.response })
        }),
        catchError(err => {
          return of( InformasiKlinikActions.getByIdFailure({ message : err }) )
        })
      )
    })
  ))

  getByIdFailure$ = createEffect(() => this.actions$.pipe(ofType(InformasiKlinikActions.getByIdFailure) ), { dispatch: false } )



}
