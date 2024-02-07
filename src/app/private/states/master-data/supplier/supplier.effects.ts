import { ModulSupplierService } from "src/app/private/modul-api/modul-master-node/modul-supplier.service";
import { SupplierPayload } from "src/app/private/models/class-payload-api/master-data/supplier-payload";
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { switchMap, catchError, map, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Injectable } from "@angular/core";
import Swal from 'sweetalert2/dist/sweetalert2.js'
import * as SupplierActions from './supplier.actions'

@Injectable()

export class SupplierEffects {

  constructor(
    private actions$ : Actions,
    private modulSupplierService : ModulSupplierService
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

  addInitial$ = createEffect(() => this.actions$.pipe(ofType(SupplierActions.addInitial),
    switchMap(action => {
      return this.modulSupplierService.add(action.payload)
      .pipe(
        map(res => {
          return SupplierActions.addSuccess({ payload : res.response })
        }),
        catchError(err => {
          return of( SupplierActions.addFailure({ message : err }) )
        })
      )
    })
  ))

  addSuccess$ = createEffect(() => this.actions$.pipe(ofType(SupplierActions.addSuccess),
    map(action => {
      this.Toast.fire({
        icon: 'success',
        title: 'Data berhasil disimpan'
      })
      return SupplierActions.tableData()
    })
  ))

  addFailure$ = createEffect(() => this.actions$.pipe(ofType(SupplierActions.addFailure) ), { dispatch: false } )

  updateInitial$ = createEffect(() => this.actions$.pipe(ofType(SupplierActions.updateInitial),
    switchMap(action => {
      return this.modulSupplierService.update(action.payload.id_supplier, action.payload)
      .pipe(
        map(res => {
          return SupplierActions.updateSuccess({ payload : res.response })
        }),
        catchError(err => {
          return of( SupplierActions.updateFailure({ message : err }) )
        })
      )
    })
  ))

  updateSuccess$ = createEffect(() => this.actions$.pipe(ofType(SupplierActions.updateSuccess),
    map(action => {
      this.Toast.fire({
        icon: 'success',
        title: 'Data berhasil disimpan'
      })
      return SupplierActions.tableData()
    })
  ))

  updateFailure$ = createEffect(() => this.actions$.pipe(ofType(SupplierActions.updateFailure) ), { dispatch: false } )

  getByIdInitial$ = createEffect(() => this.actions$.pipe(ofType(SupplierActions.getByIdInitial),
    switchMap(action => {
      return this.modulSupplierService.show(action.payload.id)
      .pipe(
        map(res => {
          return SupplierActions.getByIdSuccess({ payload : res.response })
        }),
        catchError(err => {
          return of( SupplierActions.getByIdFailure({ message : err }) )
        })
      )
    })
  ))

  getByIdFailure$ = createEffect(() => this.actions$.pipe(ofType(SupplierActions.getByIdFailure) ), { dispatch: false } )

  deleteInitial$ = createEffect(() => this.actions$.pipe(ofType(SupplierActions.deleteInitial),
    switchMap(action => {
      return this.modulSupplierService.delete(action.payload.id)
      .pipe(
        map(res => {
          return SupplierActions.deleteSuccess({ payload : res.response })
        }),
        catchError(err => {
          return of( SupplierActions.deleteFailure({ message : err }) )
        })
      )
    })
  ))

  deleteSuccess$ = createEffect(() => this.actions$.pipe(ofType(SupplierActions.deleteSuccess),
    map(action => {
      this.Toast.fire({
        icon: 'success',
        title: 'Data berhasil dihapus'
      })
      return SupplierActions.tableData()
    })
  ))

  deleteFailure$ = createEffect(() => this.actions$.pipe(ofType(SupplierActions.deleteFailure) ), { dispatch: false } )

}
