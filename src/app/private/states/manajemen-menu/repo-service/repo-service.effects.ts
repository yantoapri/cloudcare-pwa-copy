import { RepoServicePayload } from 'src/app/private/models/class-payload-api/manajemen-menu/repo-service-payload';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { switchMap, catchError, map, tap } from 'rxjs/operators';
import { of, mergeMap } from 'rxjs';
import { Injectable } from "@angular/core";
import Swal from 'sweetalert2/dist/sweetalert2.js'
import * as RepoServiceActions from './repo-service.actions'
import { RepoServiceService } from 'src/app/private/services/manajemen-menu/repo-service.service';


@Injectable()
export class RepoServiceEffects {

  constructor(
    private actions$: Actions,
    private repoServiceService : RepoServiceService
  ) {}

  addRepoService$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RepoServiceActions.addRepoService),
      switchMap(action => {
        return this.repoServiceService.insert(action.payload)
        .pipe(
          map(res => {
            return RepoServiceActions.addRepoServiceSuccess({ payload : res.response })
          }),
          catchError(err => {
            return of( RepoServiceActions.addRepoServiceFailure({ message : err }) )
          })
        )
      })
    )
  )

  addRepoServiceSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RepoServiceActions.addRepoServiceSuccess),
      map(action => {
        this.Toast.fire({
          icon: 'success',
          title: 'Data berhasil disimpan'
        })
        return RepoServiceActions.tableData()
      })
    )
  )
  addRepoServiceFailure$ = createEffect(() => this.actions$.pipe( ofType(RepoServiceActions.addRepoServiceFailure) ), { dispatch: false } )

  updateRepoService$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RepoServiceActions.updateRepoService),
      switchMap(action => {
        return this.repoServiceService.update(String(action.payload.id_repo_service), action.payload)
        .pipe(
          map(res => {
            return RepoServiceActions.updateRepoServiceSuccess({ payload : res.response })
          }),
          catchError(err => {
            return of( RepoServiceActions.updateRepoServiceFailure({ message : err }) )
          })
        )
      })
    )
  )
  updateRepoServiceSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RepoServiceActions.updateRepoServiceSuccess),
      map(action => {
        this.Toast.fire({
          icon: 'success',
          title: 'Data berhasil diubah'
        })
        return RepoServiceActions.tableData()
      })
    )
  )
  updateRepoServiceFailure$ = createEffect(() => this.actions$.pipe( ofType(RepoServiceActions.updateRepoServiceFailure) ), { dispatch: false } )

  getRepoServiceById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RepoServiceActions.getRepoServiceById),
      switchMap(action => {
        return this.repoServiceService.show(action.payload.id)
        .pipe(
          map(res => {
            return RepoServiceActions.getRepoServiceByIdSuccess({ payload : res.response })
          }),
          catchError(err => {
            return of( RepoServiceActions.getRepoServiceByIdFailure({ message : err }) )
          })
        )
      })
    )
  )
  // getRepoServiceByIdSuccess$ = createEffect(() => this.actions$.pipe( ofType(RepoServiceActions.getRepoServiceByIdSuccess) ) )
  getRepoServiceByIdFailure$ = createEffect(() => this.actions$.pipe( ofType(RepoServiceActions.getRepoServiceByIdFailure) ), { dispatch: false } )

  deleteRepoService$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RepoServiceActions.deleteRepoService),
      switchMap(action => {
        return this.repoServiceService.delete(action.payload.id)
        .pipe(
          map(res => {
            return RepoServiceActions.deleteRepoServiceSuccess({ payload : res.response })
          }),
          catchError(err => {
            return of( RepoServiceActions.deleteRepoServiceFailure({ message : err }) )
          })
        )
      })
    )
  )
  deleteRepoServiceSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RepoServiceActions.deleteRepoServiceSuccess),
      map(action => {
        this.Toast.fire({
          icon: 'success',
          title: 'Data berhasil dihapus'
        })
        return RepoServiceActions.tableData()
      })
    )
  )
  deleteRepoServiceFailure$ = createEffect(() => this.actions$.pipe( ofType(RepoServiceActions.deleteRepoServiceFailure) ), { dispatch: false } )

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
