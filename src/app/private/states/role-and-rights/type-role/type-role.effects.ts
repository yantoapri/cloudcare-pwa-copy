import { Injectable } from "@angular/core";
import { Router } from '@angular/router';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { switchMap, catchError, map, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import * as TypeRoleAction from './type-role.actions'
import { TypeRoleService } from '../../../services/role-and-rights/type-role.service'
import Swal from 'sweetalert2/dist/sweetalert2.js'
import { Type } from "angular-feather/icons";
import { TipeRolePayload } from 'src/app/private/models/class-payload-api/role-and-rights/tipe-role-payload'

@Injectable()
export class TypeRoleEffects {
  constructor (
    private actions$: Actions,
    private router: Router,
    private typeRoleService : TypeRoleService
  ) {}

  addTypeRole$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TypeRoleAction.addTypeRole),
      switchMap(action => {
        return this.typeRoleService.add(action.payload)
        .pipe(
          map(res => {
            // console.log('iki')
            return TypeRoleAction.addTypeRoleSuccess({ payload: res.response })
          }),
          catchError(err => {
            return of(
              TypeRoleAction.addTypeRoleFailure({ message: err.metaData.message })
            )
          })
        )
      })
    )
  );

  addTypeRoleSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TypeRoleAction.addTypeRoleSuccess),
      tap(action => {
        // console.log(action)
        Swal.fire({
          title: 'Data berhasil disimpan',
          icon: 'success',
          showCancelButton: false,
          allowOutsideClick: false,
          confirmButtonText: 'Ya, lanjutkan!',
        }).then((result) => {
          if (result.value) {
            this.router.navigate(['role-and-rights', 'tipe-role', 'view'])
          }
        })
      })
    ), { dispatch: false }
  );

  addTypeRoleFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TypeRoleAction.addTypeRoleFailure)
    ), {dispatch : false}
  );

  getTypeRoleById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TypeRoleAction.getTypeRoleById),
      switchMap(action => {
        return this.typeRoleService.show(action.payload.id)
          .pipe(
            map(res => {
              return TypeRoleAction.getTypeRoleByIdSuccess({ payload: res.response })
              /**
                {
                  id_role_type: res.response.id_role_type,
                  nama_role_type : res.response.nama_role_type,
                  detail : this.typeRoleService.functionFilterJson(res.response.detail)
                }
                 */
            }),
            catchError(err => {
              return of(TypeRoleAction.getTypeRoleByIdFailure({ message: err.metaData.message }))
            })
          )
      })
    )
  );

  editTypeRole$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TypeRoleAction.editTypeRole),
      switchMap(action => {
        return this.typeRoleService.update(action.payload.id_role_type, action.payload)
        .pipe(
          map(res => {
            return TypeRoleAction.editTypeRoleSuccess({ payload : res.response })
          }),
          catchError(err => {

            return of(
              TypeRoleAction.editTypeRoleFailure({ message: err.metaData.message })
            )
          })
        )
      })
    )
  );
  editTypeRoleSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TypeRoleAction.editTypeRoleSuccess),
      tap(action => {
        Swal.fire({
          title: 'Data berhasil disimpan',
          icon: 'success',
          showCancelButton: false,
          allowOutsideClick: false,
          confirmButtonText: 'Ya, lanjutkan!',
        }).then((result) => {
          if (result.value) {
            this.router.navigate(['role-and-rights', 'tipe-role', 'view'])
          }
        })
      })
    ), { dispatch: false }
  );

  editTypeRoleFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TypeRoleAction.editTypeRoleFailure)
    ), { dispatch: false }
  );

  deleteTypeRole$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TypeRoleAction.deleteTypeRole),
      switchMap(action => {
        return this.typeRoleService.nonAktifData(Number(action.payload.id))
        .pipe(
          map(res => {
            return TypeRoleAction.deleteTypeRoleSuccess({ payload: res.response })
          }),
          catchError( err => {
            return of(TypeRoleAction.deleteTypeRoleFailure({message : err.metaData.message}))
          })
        )
      })
    )
  );

  deleteTypeRoleSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TypeRoleAction.deleteTypeRoleSuccess),
      map(action => {
        return TypeRoleAction.tableData()
      })
    ), {dispatch: false}
  );

  deleteTypeRoleFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TypeRoleAction.deleteTypeRoleFailure),
    ), {dispatch: false}
  );




  // editTypeRole$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(TypeRoleAction.editTypeRole),
  //     switchMap(action => {
  //       return this.typeRoleService.show(action.payload.id)
  //     })
  //   )
  // )

  // typeRoleShowMenu$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(TypeRoleAction.typeRoleShowMenu),
  //     switchMap(action => {
  //       return this.typeRoleService.processShowRight()
  //     })
  //   )
  // )

}
