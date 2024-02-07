
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { switchMap, catchError, map, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Injectable } from "@angular/core";
import Swal from 'sweetalert2/dist/sweetalert2.js'

import { AssessmentService } from 'src/app/private/services/master-data/assessment.service';
import * as AssessmentActions from './assessment.actions'

@Injectable()
export class AssessmentEffects {

  constructor(
    private actions$ : Actions,
    private assessmentService : AssessmentService
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

  addInitial$ = createEffect(() => this.actions$.pipe(ofType(AssessmentActions.addInitial),
    switchMap(action => {
      return this.assessmentService.insert(action.payload)
      .pipe(
        map(res => {
          return AssessmentActions.addSuccess({ payload : res.response })
        }),
        catchError(err => {
          return of( AssessmentActions.addFailure({ message : err }) )
        })
      )
    })
  ))

  addSuccess$ = createEffect(() => this.actions$.pipe(ofType(AssessmentActions.addSuccess),
    map(action => {
      this.Toast.fire({
        icon: 'success',
        title: 'Data berhasil disimpan'
      })
      return AssessmentActions.tableData()
    })
  ))
  addFailure$ = createEffect(() => this.actions$.pipe(ofType(AssessmentActions.addFailure) ), { dispatch: false } )
  updateInitial$ = createEffect(() => this.actions$.pipe(ofType(AssessmentActions.updateInitial),
    switchMap(action => {
      return this.assessmentService.update(action.payload.id_assessment, action.payload)
      .pipe(
        map(res => {
          return AssessmentActions.updateSuccess({ payload : res.response })
        }),
        catchError(err => {
          return of( AssessmentActions.updateFailure({ message : err }) )
        })
      )
    })
  ))
  updateSuccess$ = createEffect(() => this.actions$.pipe(ofType(AssessmentActions.updateSuccess),
    map(action => {
      this.Toast.fire({
        icon: 'success',
        title: 'Data berhasil disimpan'
      })
      return AssessmentActions.tableData()
    })
  ))
  updateFailure$ = createEffect(() => this.actions$.pipe(ofType(AssessmentActions.updateFailure) ), { dispatch: false } )
  getByIdInitial$ = createEffect(() => this.actions$.pipe(ofType(AssessmentActions.getByIdInitial),
    switchMap(action => {
      return this.assessmentService.show(action.payload.id)
      .pipe(
        map(res => {
          return AssessmentActions.getByIdSuccess({ payload : res.response })
        }),
        catchError(err => {
          return of( AssessmentActions.getByIdFailure({ message : err }) )
        })
      )
    })
  ))

  getByIdFailure$ = createEffect(() => this.actions$.pipe(ofType(AssessmentActions.getByIdFailure) ), { dispatch: false } )
  deleteInitial$ = createEffect(() => this.actions$.pipe(ofType(AssessmentActions.deleteInitial),
    switchMap(action => {
      return this.assessmentService.delete(action.payload.id)
      .pipe(
        map(res => {
          return AssessmentActions.deleteSuccess({ payload : res.response })
        }),
        catchError(err => {
          return of( AssessmentActions.deleteFailure({ message : err }) )
        })
      )
    })
  ))
  deleteSuccess$ = createEffect(() => this.actions$.pipe(ofType(AssessmentActions.deleteSuccess),
    map(action => {
      this.Toast.fire({
        icon: 'success',
        title: 'Data berhasil dihapus'
      })
      return AssessmentActions.tableData()
    })
  ))
  deleteFailure$ = createEffect(() => this.actions$.pipe(ofType(AssessmentActions.deleteFailure) ), { dispatch: false } )

}
