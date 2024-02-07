import { Actions, ofType, createEffect } from '@ngrx/effects';
import { switchMap, catchError, map, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Injectable } from "@angular/core";
import Swal from 'sweetalert2/dist/sweetalert2.js'
import { MenuRightService } from 'src/app/private/services/manajemen-menu/menu-right.service';
import * as MenuRightActions from './menu-right.actions'
import { Router } from '@angular/router';

@Injectable()
export class MenuRightEffects {

  constructor(
    private actions$ : Actions,
    private menuRightService : MenuRightService,
    private router : Router
  ) {}

  addMenuRight$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MenuRightActions.addMenuRight),
      switchMap(action => {
        return this.menuRightService.insert(action.payload)
        .pipe(
          map(res => {
            return MenuRightActions.addMenuSuccess({ payload : res.response })
          }),
          catchError(err => {
            return of(MenuRightActions.addMenuFailure({ message : err }))
          })
        )
      })
    )
  )
  addMenuSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MenuRightActions.addMenuSuccess),
      tap(action => {
        // this.Toast.fire({
        //   icon: 'success',
        //   title: 'Data berhasil disimpan'
        // })
        // return MenuRightActions.tableData()

        Swal.fire({
          title: 'Data berhasil disimpan',
          icon: 'success',
          showCancelButton: false,
          allowOutsideClick: false,
          confirmButtonText: 'Ya, lanjutkan!',
        }).then((result) => {
          this.router.navigate(['manajemen-menu', 'menu-right', 'view'])
        })
      })
    ), {dispatch : false}
  )
  addMenuFailure$ = createEffect(() => this.actions$.pipe(ofType(MenuRightActions.addMenuFailure) ), { dispatch: false } )

  updateMenuRight$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MenuRightActions.updateMenuRight),
      switchMap(action => {
        return this.menuRightService.update(action.payload.id_menu_right, action.payload)
        .pipe(
          map(res => {
            return MenuRightActions.updateMenuRightSuccess({ payload : res.response })
          }),
          catchError(err => {
            return of( MenuRightActions.updateMenuRightFailure({ message : err }) )
          })
        )
      })
    )
  )
  udpateMenuRightSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MenuRightActions.updateMenuRightSuccess),
      tap(action => {
        // this.Toast.fire({
        //   icon: 'success',
        //   title: 'Data berhasil disimpan'
        // })
        // return MenuRightActions.tableData()
        Swal.fire({
          title: 'Data berhasil disimpan',
          icon: 'success',
          showCancelButton: false,
          allowOutsideClick: false,
          confirmButtonText: 'Ya, lanjutkan!',
        }).then((result) => {
          this.router.navigate(['manajemen-menu', 'menu-right', 'view'])
        })
      })
    ), {dispatch : false}
  )

  udpateMenuRightFailure$ = createEffect(() => this.actions$.pipe(ofType(MenuRightActions.updateMenuRightFailure) ), { dispatch: false } )

  getMenuRightById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MenuRightActions.getMenuRightById),
      switchMap(action => {
        return this.menuRightService.show(action.payload.id)
        .pipe(
          map(res => {
            return MenuRightActions.getMenuRightByIdSuccess({ payload : res.response })
          }),
          catchError(err => {
            return of( MenuRightActions.getMenuRightByIdFailure({ message : err }) )
          })
        )
      })
    )
  )
  // getMenuRightByIdSuccess$ = createEffect(() => this.actions$.pipe(ofType(MenuRightActions.getMenuRightByIdSuccess) ) )
  getMenuRightByIdFailure$ = createEffect(() => this.actions$.pipe(ofType(MenuRightActions.getMenuRightByIdFailure) ), { dispatch: false } )

  deleteMenuRight$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MenuRightActions.deleteMenuRight),
      switchMap(action => {
        return this.menuRightService.delete(action.payload.id)
        .pipe(
          map(res => {
            return MenuRightActions.deleteMenuRightSuccess({ payload : res.response })
          }),
          catchError(err => {
            return of( MenuRightActions.deleteMenuRightFailure({ message : err }) )
          })
        )
      })
    )
  )
  deleteMenuRightSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MenuRightActions.deleteMenuRightSuccess),
      map(action => {
        this.Toast.fire({
          icon: 'success',
          title: 'Data berhasil dihapus'
        })
        return MenuRightActions.tableData()
      })
    )
  )
  deleteMenuRightFailure$ = createEffect(() => this.actions$.pipe(ofType(MenuRightActions.deleteMenuRightFailure) ), { dispatch: false } )

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
