
import { Action, createReducer, on } from '@ngrx/store';

import * as BiayaActions from './biaya.actions'

export interface State {
  biaya : any | null
  isLoadingButton : boolean
  errorMessage: any | null
  reloadTable : boolean
  submitButton : boolean
  isEdit : boolean
}

const initialState : State = {
  biaya : null,
  isLoadingButton : false,
  errorMessage : null,
  reloadTable : false,
  submitButton : false,
  isEdit : false
}

const _biayaReducers = createReducer(initialState,
  on ( BiayaActions.addInitial, (state, action) => ({...state, isLoadingButton : true, errorMessage : null, isEdit: false, reloadTable : false }) ),
  on ( BiayaActions.addSuccess, (state, action) => ({...state, isLoadingButton : false, biaya : action.payload }) ),
  on ( BiayaActions.addFailure, (state, action) => ({...state, isLoadingButton : false, errorMessage: action.message, isEdit : false, reloadTable: false }) ),
  on ( BiayaActions.updateInitial, (state, action) => ({...state, isLoadingButton : true, errorMessage : null, isEdit: false, reloadTable : false }) ),
  on ( BiayaActions.updateSuccess, (state, action) => ({...state, isLoadingButton : false, biaya : action.payload,  }) ),
  on ( BiayaActions.updateFailure, (state, action) => ({...state, isLoadingButton : false, errorMessage: action.message, isEdit : false, reloadTable: false }) ),

  on ( BiayaActions.getByIdInitial, (state, action) => ({...state,  isLoadingButton : false, errorMessage: null, isEdit : false, biaya : []}) ),
  on ( BiayaActions.getByIdSuccess, (state, action) => ({...state, isLoadingButton : false, errorMessage: null, isEdit : true, biaya : action.payload, reloadTable : false }) ),
  on ( BiayaActions.getByIdFailure, (state, action) => ({...state, isLoadingButton : false, errorMessage: action.message, isEdit : false, reloadTable: false }) ),

  on ( BiayaActions.deleteInitial, (state, action) => ({...state, isLoadingButton : false, errorMessage: null, isEdit : false, reloadTable: false, biaya : [] }) ),
  on ( BiayaActions.deleteSuccess, (state, action) => ({...state, isLoadingButton : false, errorMessage: null, isEdit: false, reloadTable : true }) ),
  on ( BiayaActions.deleteFailure, (state, action) => ({...state, isLoadingButton : false, errorMessage: action.message, isEdit : false, reloadTable: false }) ),

  on ( BiayaActions.tableData, (state, action) => ({...state, reloadTable :true })),
  on ( BiayaActions.clearData, (state, action) => ({...state, biaya: [], errorMessage: null, isEdit: false, reloadTable: false, isLoadingButton : false}) ),
)

export function biayaReducers (state : State, action : Action) : any {
  return _biayaReducers(state, action)
}
