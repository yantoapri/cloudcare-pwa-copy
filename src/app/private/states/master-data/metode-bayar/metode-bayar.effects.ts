import { Actions, ofType, createEffect } from '@ngrx/effects';
import { switchMap, catchError, map, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Injectable } from "@angular/core";
import Swal from 'sweetalert2/dist/sweetalert2.js'
import { Router } from '@angular/router';
// import { ModulObatService } from 'src/app/private/modul-api/modul-master-node/modul-obat.service'
import { ModulMetodeBayarService } from 'src/app/private/modul-api/modul-master-node/modul-metode-bayar.service';
import * as MetodeBayarActions from './metode-bayar.actions'


@Injectable()
export class MetodeBayarEffects {

  constructor(
    private actions$ : Actions,
    private modulMetodeBayarService : ModulMetodeBayarService
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

  addInitial$ = createEffect(() => this.actions$.pipe(ofType(MetodeBayarActions.addInitial),
    switchMap(action => {
      return this.modulMetodeBayarService.add(action.payload)
      .pipe(
        map(res => {
          return MetodeBayarActions.addSuccess({ payload : res.response })
        }),
        catchError(err => {
          return of( MetodeBayarActions.addFailure({ message : err }) )
        })
      )
    })
  ))

  addSuccess$ = createEffect(() => this.actions$.pipe(ofType(MetodeBayarActions.addSuccess),
    map(action => {
      this.Toast.fire({
        icon: 'success',
        title: 'Data berhasil disimpan'
      })
      return MetodeBayarActions.tableData()
    })
  ))

  addFailure$ = createEffect(() => this.actions$.pipe(ofType(MetodeBayarActions.addFailure) ), { dispatch: false } )

  updateInitial$ = createEffect(() => this.actions$.pipe(ofType(MetodeBayarActions.updateInitial),
    switchMap(action => {
      return this.modulMetodeBayarService.update(action.payload.id_metode_bayar, action.payload)
      .pipe(
        map(res => {
          return MetodeBayarActions.updateSuccess({ payload : res.response })
        }),
        catchError(err => {
          return of( MetodeBayarActions.updateFailure({ message : err }) )
        })
      )
    })
  ))

  updateSuccess$ = createEffect(() => this.actions$.pipe(ofType(MetodeBayarActions.updateSuccess),
    map(action => {
      this.Toast.fire({
        icon: 'success',
        title: 'Data berhasil disimpan'
      })
      return MetodeBayarActions.tableData()
    })
  ))

  updateFailure$ = createEffect(() => this.actions$.pipe(ofType(MetodeBayarActions.updateFailure) ), { dispatch: false } )

  getByIdInitial$ = createEffect(() => this.actions$.pipe(ofType(MetodeBayarActions.getByIdInitial),
    switchMap(action => {
      return this.modulMetodeBayarService.show(action.payload.id)
      .pipe(
        map(res => {
          return MetodeBayarActions.getByIdSuccess({ payload : res.response })
        }),
        catchError(err => {
          return of( MetodeBayarActions.getByIdFailure({ message : err }) )
        })
      )
    })
  ))

  getByIdFailure$ = createEffect(() => this.actions$.pipe(ofType(MetodeBayarActions.getByIdFailure) ), { dispatch: false } )

  deleteInitial$ = createEffect(() => this.actions$.pipe(ofType(MetodeBayarActions.deleteInitial),
    switchMap(action => {
      return this.modulMetodeBayarService.delete(action.payload.id)
      .pipe(
        map(res => {
          return MetodeBayarActions.deleteSuccess({ payload : res.response })
        }),
        catchError(err => {
          return of( MetodeBayarActions.deleteFailure({ message : err }) )
        })
      )
    })
  ))

  deleteSuccess$ = createEffect(() => this.actions$.pipe(ofType(MetodeBayarActions.deleteSuccess),
    map(action => {
      this.Toast.fire({
        icon: 'success',
        title: 'Data berhasil dihapus'
      })
      return MetodeBayarActions.tableData()
    })
  ))

  deleteFailure$ = createEffect(() => this.actions$.pipe(ofType(MetodeBayarActions.deleteFailure) ), { dispatch: false } )

}
