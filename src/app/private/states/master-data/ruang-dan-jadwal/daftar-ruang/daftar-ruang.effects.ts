import { Actions, ofType, createEffect } from '@ngrx/effects';
import { switchMap, catchError, map, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Injectable } from "@angular/core";
import Swal from 'sweetalert2/dist/sweetalert2.js'
import { Router } from '@angular/router';
import { DaftarRuangService } from 'src/app/private/services/master-data/ruang-dan-jadwal/daftar-ruang.service';
import * as  DaftarRuangActions from './daftar-ruang.actions'
@Injectable()
export class DaftarRuangEffects {

  urlBacktoView = ['master-data', 'ruang-dan-jadwal', 'daftar-ruang', 'view']

  constructor(
    private actions$ : Actions,
    private daftarRuangService : DaftarRuangService,
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

  addInitial$ = createEffect(() => this.actions$.pipe(ofType(DaftarRuangActions.addInitial),
      switchMap(action => {
        return this.daftarRuangService.insert(action.payload)
        .pipe(
          map(res => {
            return DaftarRuangActions.addSuccess({ payload : res.response })
          }),
          catchError(err => {
            return of( DaftarRuangActions.addFailure({ message : err }) )
          })
        )
      })
  ) )
  addSuccess$ = createEffect(() => this.actions$.pipe(ofType(DaftarRuangActions.addSuccess),
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
  addFailure$ = createEffect(() => this.actions$.pipe(ofType(DaftarRuangActions.addFailure) ), { dispatch: false })
  updateInitial$ = createEffect(() => this.actions$.pipe(ofType(DaftarRuangActions.updateInitial),
    switchMap(action => {
      return this.daftarRuangService.update(action.payload.id_ruang, action.payload)
      .pipe(
        map(res => {
          return DaftarRuangActions.updateSuccess({ payload : res.response })
        }),
        catchError(err => {
          return of( DaftarRuangActions.updateFailure({ message : err }) )
        })
      )
    })
  ))
  updateSuccess$ = createEffect(() => this.actions$.pipe(ofType(DaftarRuangActions.updateSuccess),
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

  updateFailure$ = createEffect(() => this.actions$.pipe(ofType(DaftarRuangActions.updateFailure) ), { dispatch: false } )
  getByIdInitial$ = createEffect(() => this.actions$.pipe(ofType(DaftarRuangActions.getByIdInitial),
    switchMap(action => {
      return this.daftarRuangService.show(action.payload.id)
      .pipe(
        map(res => {
          return DaftarRuangActions.getByIdSuccess({ payload : res.response })
        }),
        catchError(err => {
          return of( DaftarRuangActions.getByIdFailure({ message : err }) )
        })
      )
    })
  ))
  getByIdFailure$ = createEffect(() => this.actions$.pipe(ofType(DaftarRuangActions.getByIdFailure) ), { dispatch: false } )

  deleteInitial$ = createEffect(() => this.actions$.pipe(ofType(DaftarRuangActions.deleteInitial),
    switchMap(action => {
      return this.daftarRuangService.delete(action.payload.id)
      .pipe(
        map(res => {
          return DaftarRuangActions.deleteSuccess({ payload : res.response })
        }),
        catchError(err => {
          return of( DaftarRuangActions.deleteFailure({ message : err }) )
        })
      )
    })
  ))
  deleteSuccess$ = createEffect(() => this.actions$.pipe(ofType(DaftarRuangActions.deleteSuccess),
    map(action => {
      this.Toast.fire({
        icon: 'success',
        title: 'Data berhasil dihapus'
      })
      return DaftarRuangActions.tableData()
    })
  ))
  deleteFailure$ = createEffect(() => this.actions$.pipe(ofType(DaftarRuangActions.deleteFailure) ), { dispatch: false } )

}
