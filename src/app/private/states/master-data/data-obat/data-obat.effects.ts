import { Actions, ofType, createEffect } from '@ngrx/effects';
import { switchMap, catchError, map, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Injectable } from "@angular/core";
import Swal from 'sweetalert2/dist/sweetalert2.js'
import { Router } from '@angular/router';
import { ModulObatService } from 'src/app/private/modul-api/modul-master-node/modul-obat.service'
// import {  }
// import * as  DaftarRuangActions from './daftar-ruang.actions'
import * as DataObatActions from './data-obat.actions'

@Injectable()
export class DataObatEffects {

  urlBacktoView = ['katalog-obat', 'katalog', 'view']

  constructor(
    private actions$ : Actions,
    private modulObatService : ModulObatService,
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

  addInitial$ = createEffect(() => this.actions$.pipe(ofType(DataObatActions.addInitial),
      switchMap(action => {
        return this.modulObatService.add(action.payload)
        .pipe(
          map(res => {
            return DataObatActions.addSuccess({ payload : res.response })
          }),
          catchError(err => {
            return of( DataObatActions.addFailure({ message : err }) )
          })
        )
      })
  ) )
  addSuccess$ = createEffect(() => this.actions$.pipe(ofType(DataObatActions.addSuccess),
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

  addFailure$ = createEffect(() => this.actions$.pipe(ofType(DataObatActions.addFailure) ), { dispatch: false })

  updateInitial$ = createEffect(() => this.actions$.pipe(ofType(DataObatActions.updateInitial),
    switchMap(action => {
      return this.modulObatService.update(action.payload.id_obat, action.payload )
      .pipe(
        map(res => {
          return DataObatActions.updateSuccess({ payload : res.response })
        }),
        catchError(err => {
          return of( DataObatActions.updateFailure({ message : err }) )
        })
      )
    })
  ))
  updateSuccess$ = createEffect(() => this.actions$.pipe(ofType(DataObatActions.updateSuccess),
    tap(action => {
      Swal.fire({
        title: 'Data berhasil disimpan',
        icon: 'success',
        showCancelButton: false,
        allowOutsideClick: false,
        confirmButtonText: 'Ya, lanjutkan!',
      }).then((result) => {
      })
    })
  ), {dispatch: false})

  updateFailure$ = createEffect(() => this.actions$.pipe(ofType(DataObatActions.updateFailure) ), { dispatch: false } )
  getByIdInitial$ = createEffect(() => this.actions$.pipe(ofType(DataObatActions.getByIdInitial),
    switchMap(action => {
      return this.modulObatService.show(action.payload.id)
      .pipe(
        map(res => {
          return DataObatActions.getByIdSuccess({ payload : res.response })
        }),
        catchError(err => {
          return of( DataObatActions.getByIdFailure({ message : err }) )
        })
      )
    })
  ))
  getByIdFailure$ = createEffect(() => this.actions$.pipe(ofType(DataObatActions.getByIdFailure) ), { dispatch: false } )

  deleteInitial$ = createEffect(() => this.actions$.pipe(ofType(DataObatActions.deleteInitial),
    switchMap(action => {
      return this.modulObatService.delete(action.payload.id)
      .pipe(
        map(res => {
          return DataObatActions.deleteSuccess({ payload : res.response })
        }),
        catchError(err => {
          return of( DataObatActions.deleteFailure({ message : err }) )
        })
      )
    })
  ))
  deleteSuccess$ = createEffect(() => this.actions$.pipe(ofType(DataObatActions.deleteSuccess),
    map(action => {
      this.Toast.fire({
        icon: 'success',
        title: 'Data berhasil dihapus'
      })
      return DataObatActions.tableData()
    })
  ))
  deleteFailure$ = createEffect(() => this.actions$.pipe(ofType(DataObatActions.deleteFailure) ), { dispatch: false } )

}
