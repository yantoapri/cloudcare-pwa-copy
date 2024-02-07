import { Actions, ofType, createEffect } from '@ngrx/effects';
import { switchMap, catchError, map, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Injectable } from "@angular/core";
import Swal from 'sweetalert2/dist/sweetalert2.js'
import { Router } from '@angular/router';
import { ModulBiayaService } from 'src/app/private/modul-api/modul-master-node/modul-biaya.service';
import * as BiayaActions from './biaya.actions'


@Injectable()
export class biayaEffects {

  constructor(
    private actions$ : Actions,
    private ModulBiayaService : ModulBiayaService
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

  addInitial$ = createEffect(() => this.actions$.pipe(ofType(BiayaActions.addInitial),
    switchMap(action => {
      return this.ModulBiayaService.add(action.payload)
      .pipe(
        map(res => {
          return BiayaActions.addSuccess({ payload : res.response })
        }),
        catchError(err => {
          return of( BiayaActions.addFailure({ message : err }) )
        })
      )
    })
  ))

  addSuccess$ = createEffect(() => this.actions$.pipe(ofType(BiayaActions.addSuccess),
    map(action => {
      this.Toast.fire({
        icon: 'success',
        title: 'Data berhasil disimpan'
      })
      return BiayaActions.tableData()
    })
  ))

  addFailure$ = createEffect(() => this.actions$.pipe(ofType(BiayaActions.addFailure) ), { dispatch: false } )

  updateInitial$ = createEffect(() => this.actions$.pipe(ofType(BiayaActions.updateInitial),
    switchMap(action => {
      return this.ModulBiayaService.update(action.payload.id_biaya, action.payload)
      .pipe(
        map(res => {
          return BiayaActions.updateSuccess({ payload : res.response })
        }),
        catchError(err => {
          return of( BiayaActions.updateFailure({ message : err }) )
        })
      )
    })
  ))

  updateSuccess$ = createEffect(() => this.actions$.pipe(ofType(BiayaActions.updateSuccess),
    map(action => {
      this.Toast.fire({
        icon: 'success',
        title: 'Data berhasil disimpan'
      })
      return BiayaActions.tableData()
    })
  ))

  updateFailure$ = createEffect(() => this.actions$.pipe(ofType(BiayaActions.updateFailure) ), { dispatch: false } )

  getByIdInitial$ = createEffect(() => this.actions$.pipe(ofType(BiayaActions.getByIdInitial),
    switchMap(action => {
      return this.ModulBiayaService.show(action.payload.id)
      .pipe(
        map(res => {
          return BiayaActions.getByIdSuccess({ payload : res.response })
        }),
        catchError(err => {
          return of( BiayaActions.getByIdFailure({ message : err }) )
        })
      )
    })
  ))

  getByIdFailure$ = createEffect(() => this.actions$.pipe(ofType(BiayaActions.getByIdFailure) ), { dispatch: false } )

  deleteInitial$ = createEffect(() => this.actions$.pipe(ofType(BiayaActions.deleteInitial),
    switchMap(action => {
      return this.ModulBiayaService.delete(action.payload.id)
      .pipe(
        map(res => {
          return BiayaActions.deleteSuccess({ payload : res.response })
        }),
        catchError(err => {
          return of( BiayaActions.deleteFailure({ message : err }) )
        })
      )
    })
  ))

  deleteSuccess$ = createEffect(() => this.actions$.pipe(ofType(BiayaActions.deleteSuccess),
    map(action => {
      this.Toast.fire({
        icon: 'success',
        title: 'Data berhasil dihapus'
      })
      return BiayaActions.tableData()
    })
  ))

  deleteFailure$ = createEffect(() => this.actions$.pipe(ofType(BiayaActions.deleteFailure) ), { dispatch: false } )

}
