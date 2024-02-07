import { RepoPayload } from 'src/app/private/models/class-payload-api/manajemen-menu/repo-payload'
import { ToastrService } from 'ngx-toastr';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { switchMap, catchError, map, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Injectable } from "@angular/core";
import * as RepoActions from './repo.actions'
import Swal from 'sweetalert2/dist/sweetalert2.js'
import { RepoService } from 'src/app/private/services/manajemen-menu/repo.service'
@Injectable()
export class RepoEffects {

  constructor(
    private actions$: Actions,
    // private toastrService : ToastrService,
    private repoService : RepoService
  ) {}

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

  addRepo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RepoActions.addRepo),
      switchMap(action => {
        return this.repoService.insert(action.payload)
        .pipe(
          map(res => {
            return RepoActions.addRepoSuccess({ payload : res.response })
          }),
          catchError(err => {
            return of( RepoActions.addRepoFailure({ message : err }) )
          })
        )
      })
    )
  );
  addRepoSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RepoActions.addRepoSuccess),
      map(action => {
        // this.toastrService.success('Data berhasil disimpan', 'Success')
        this.Toast.fire({
          icon: 'success',
          title: 'Data berhasil disimpan'
        })

        return RepoActions.tableData()
      })
    )
  );
  addRepoFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RepoActions.addRepoFailure)
    ), { dispatch: false }
  );

  updateRepo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RepoActions.updateRepo),
      switchMap(action => {
        return this.repoService.update(action.payload.id_repo, action.payload)
        .pipe(
          map(res => {
            return RepoActions.updateRepoSuccess({ payload: res.response })
          }),
          catchError(err => {
            return of( RepoActions.updateRepoFailure({ message: err }) )
          })
        )
      })
    )
  );
  updateRepoSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RepoActions.updateRepoSuccess),
      map(action => {
        this.Toast.fire({
          icon: 'success',
          title: 'Data berhasil disimpan'
        })

        return RepoActions.tableData()
      })
    )
  );
  updateRepoFailure$ = createEffect(() => this.actions$.pipe( ofType(RepoActions.updateRepoFailure) ), { dispatch: false } );

  getRepoById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RepoActions.getRepoById),
      switchMap(action => {
        return this.repoService.show(action.payload.id)
        .pipe(
          map(res => {
            return RepoActions.getRepoByIdSuccess({ payload: res.response })
          }),
          catchError(err => {
            return of( RepoActions.getRepoByIdFailure({ message : err }) )
          })
        )
      })
    )
  );
  // getRepoByIdSuccess$ = createEffect(() => this.actions$.pipe( ofType(RepoActions.getRepoByIdSuccess) ) );
  getRepoByIdFailure$ = createEffect(() => this.actions$.pipe( ofType(RepoActions.getRepoByIdFailure) ), { dispatch: false } );

  deleteRepo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RepoActions.deleteRepo),
      switchMap(action => {
        return this.repoService.delete(action.payload.id)
        .pipe(
          map(res => {
            return RepoActions.deleteRepoSuccess({ payload: res.response })
          }),
          catchError(err => {
            return of( RepoActions.deleteRepoFailure({ message : err }) )
          })
        )
      })
    )
  );
  deleteRepoSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RepoActions.deleteRepoSuccess),
      map(action => {
        this.Toast.fire({
          icon: 'success',
          title: 'Data berhasil dihapus'
        })

        return RepoActions.tableData()
      })
    )
  );
  deleteRepoFailure$ = createEffect(() => this.actions$.pipe( ofType(RepoActions.deleteRepoFailure) ), { dispatch: false } );

}
