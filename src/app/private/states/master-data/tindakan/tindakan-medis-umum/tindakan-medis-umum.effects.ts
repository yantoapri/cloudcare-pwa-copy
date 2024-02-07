
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { switchMap, catchError, map, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Injectable } from "@angular/core";
import Swal from 'sweetalert2/dist/sweetalert2.js'

import { TindakanMedisUmumService } from 'src/app/private/services/master-data/tindakan/tindakan-medis-umum.service';
import * as TindakanMedisUmumActions from './tindakan-medis-umum.actions'

@Injectable()
export class TindakanMedisUmumEffects {

  constructor(
    private actions$ : Actions,
    private tindakanMedisUmumService : TindakanMedisUmumService
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

  addInitial$ = createEffect(() => this.actions$.pipe(ofType(TindakanMedisUmumActions.addInitial),
    switchMap(action => {
      return this.tindakanMedisUmumService.insert(action.payload)
      .pipe(
        map(res => {
          return TindakanMedisUmumActions.addSuccess({ payload : res.response })
        }),
        catchError(err => {
          return of( TindakanMedisUmumActions.addFailure({ message : err }) )
        })
      )
    })
  ))

  addSuccess$ = createEffect(() => this.actions$.pipe(ofType(TindakanMedisUmumActions.addSuccess),
    map(action => {
      this.Toast.fire({
        icon: 'success',
        title: 'Data berhasil disimpan'
      })
      return TindakanMedisUmumActions.tableData()
    })
  ))
  addFailure$ = createEffect(() => this.actions$.pipe(ofType(TindakanMedisUmumActions.addFailure) ), { dispatch: false } )
  updateInitial$ = createEffect(() => this.actions$.pipe(ofType(TindakanMedisUmumActions.updateInitial),
    switchMap(action => {
      return this.tindakanMedisUmumService.update(action.payload.id_tindakan_medis, action.payload)
      .pipe(
        map(res => {
          return TindakanMedisUmumActions.updateSuccess({ payload : res.response })
        }),
        catchError(err => {
          return of( TindakanMedisUmumActions.updateFailure({ message : err }) )
        })
      )
    })
  ))
  updateSuccess$ = createEffect(() => this.actions$.pipe(ofType(TindakanMedisUmumActions.updateSuccess),
    map(action => {
      this.Toast.fire({
        icon: 'success',
        title: 'Data berhasil disimpan'
      })
      return TindakanMedisUmumActions.tableData()
    })
  ))
  updateFailure$ = createEffect(() => this.actions$.pipe(ofType(TindakanMedisUmumActions.updateFailure) ), { dispatch: false } )
  getByIdInitial$ = createEffect(() => this.actions$.pipe(ofType(TindakanMedisUmumActions.getByIdInitial),
    switchMap(action => {
      return this.tindakanMedisUmumService.show(action.payload.id)
      .pipe(
        map(res => {
          return TindakanMedisUmumActions.getByIdSuccess({ payload : res.response })
        }),
        catchError(err => {
          return of( TindakanMedisUmumActions.getByIdFailure({ message : err }) )
        })
      )
    })
  ))

  getByIdFailure$ = createEffect(() => this.actions$.pipe(ofType(TindakanMedisUmumActions.getByIdFailure) ), { dispatch: false } )
  deleteInitial$ = createEffect(() => this.actions$.pipe(ofType(TindakanMedisUmumActions.deleteInitial),
    switchMap(action => {
      return this.tindakanMedisUmumService.delete(action.payload.id)
      .pipe(
        map(res => {
          return TindakanMedisUmumActions.deleteSuccess({ payload : res.response })
        }),
        catchError(err => {
          return of( TindakanMedisUmumActions.deleteFailure({ message : err }) )
        })
      )
    })
  ))
  deleteSuccess$ = createEffect(() => this.actions$.pipe(ofType(TindakanMedisUmumActions.deleteSuccess),
    map(action => {
      this.Toast.fire({
        icon: 'success',
        title: 'Data berhasil dihapus'
      })
      return TindakanMedisUmumActions.tableData()
    })
  ))
  deleteFailure$ = createEffect(() => this.actions$.pipe(ofType(TindakanMedisUmumActions.deleteFailure) ), { dispatch: false } )

}
