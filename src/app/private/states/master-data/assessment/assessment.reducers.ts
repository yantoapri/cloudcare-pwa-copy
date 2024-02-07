import { Action, createReducer, on } from '@ngrx/store';
import { AssessmentPayload } from 'src/app/private/models/class-payload-api/master-data/assessment-payload';
import * as AssessmentActions from './assessment.actions'

export interface State {
  assessment : AssessmentPayload
  isLoadingButton : boolean
  errorMessage: any | null
  reloadTable : boolean
  submitButton : boolean
  isEdit : boolean
}

const initialState : State = {
  assessment : new AssessmentPayload,
  isLoadingButton : false,
  errorMessage : null,
  reloadTable : false,
  submitButton : false,
  isEdit : false
}

const _assessmentReducers = createReducer(initialState,
  on ( AssessmentActions.addInitial, (state, action) => ({...state, isLoadingButton : true, errorMessage : null, isEdit: false, reloadTable : false }) ),
  on ( AssessmentActions.addSuccess, (state, action) => ({...state, isLoadingButton : false, assessment : action.payload, reloadTable: false }) ),
  on ( AssessmentActions.addFailure, (state, action) => ({...state, isLoadingButton : false, errorMessage: action.message, isEdit : false, reloadTable: false }) ),

  on ( AssessmentActions.updateInitial, (state, action) => ({...state, isLoadingButton : true, errorMessage : null, isEdit: false, reloadTable : false }) ),
  on ( AssessmentActions.updateSuccess, (state, action) => ({...state, isLoadingButton : false, assessment : action.payload, reloadTable: false }) ),
  on ( AssessmentActions.updateFailure, (state, action) => ({...state, isLoadingButton : false, errorMessage: action.message, isEdit : false, reloadTable: false }) ),

  on ( AssessmentActions.getByIdInitial, (state, action) => ({...state,  isLoadingButton : false, errorMessage: null, isEdit : false, assessment : new AssessmentPayload, reloadTable : false}) ),
  on ( AssessmentActions.getByIdSuccess, (state, action) => ({...state, isLoadingButton : false, errorMessage: null, isEdit : true, assessment : action.payload, reloadTable : false }) ),
  on ( AssessmentActions.getByIdFailure, (state, action) => ({...state, isLoadingButton : false, errorMessage: action.message, isEdit : false, reloadTable: false }) ),

  on ( AssessmentActions.deleteInitial, (state, action) => ({...state, isLoadingButton : false, errorMessage: null, isEdit : false, reloadTable: false, assessment : new AssessmentPayload }) ),
  on ( AssessmentActions.deleteSuccess, (state, action) => ({...state, isLoadingButton : false, errorMessage: null, isEdit: false, reloadTable : false }) ),
  on ( AssessmentActions.deleteFailure, (state, action) => ({...state, isLoadingButton : false, errorMessage: action.message, isEdit : false, reloadTable: false }) ),

  on ( AssessmentActions.tableData, (state, action) => ({...state, reloadTable :true })),
  on ( AssessmentActions.clearData, (state, action) => ({...state, assessment: new AssessmentPayload, errorMessage: null, isEdit: false, reloadTable: false, isLoadingButton : false}) ),
)

export function assessmentReducers (state : State, action : Action) : any {
  return _assessmentReducers(state, action)
}
