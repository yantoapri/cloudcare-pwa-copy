
// import { DataObatPayload } from "src/app/private/models/class-payload-api/master-data/data-obat-payload";
import { MetodeBayarPayload } from "src/app/private/models/class-payload-api/master-data/metode-bayar-payload";
import { Action, createReducer, on } from '@ngrx/store';

import * as MetodeBayarActions from './metode-bayar.actions'

export interface State {
  metodeBayar : MetodeBayarPayload | null
  isLoadingButton : boolean
  errorMessage: any | null
  reloadTable : boolean
  submitButton : boolean
  isEdit : boolean
}

const initialState : State = {
  metodeBayar : null,
  isLoadingButton : false,
  errorMessage : null,
  reloadTable : false,
  submitButton : false,
  isEdit : false
}

const _metodeBayarReducers = createReducer(initialState,
  on ( MetodeBayarActions.addInitial, (state, action) => ({...state, isLoadingButton : true, errorMessage : null, isEdit: false, reloadTable : false }) ),
  on ( MetodeBayarActions.addSuccess, (state, action) => ({...state, isLoadingButton : false, metodeBayar : action.payload }) ),
  on ( MetodeBayarActions.addFailure, (state, action) => ({...state, isLoadingButton : false, errorMessage: action.message, isEdit : false, reloadTable: false }) ),
  on ( MetodeBayarActions.updateInitial, (state, action) => ({...state, isLoadingButton : true, errorMessage : null, isEdit: false, reloadTable : false }) ),
  on ( MetodeBayarActions.updateSuccess, (state, action) => ({...state, isLoadingButton : false, metodeBayar : action.payload,  }) ),
  on ( MetodeBayarActions.updateFailure, (state, action) => ({...state, isLoadingButton : false, errorMessage: action.message, isEdit : false, reloadTable: false }) ),

  on ( MetodeBayarActions.getByIdInitial, (state, action) => ({...state,  isLoadingButton : false, errorMessage: null, isEdit : false, metodeBayar : new MetodeBayarPayload}) ),
  on ( MetodeBayarActions.getByIdSuccess, (state, action) => ({...state, isLoadingButton : false, errorMessage: null, isEdit : true, metodeBayar : action.payload, reloadTable : false }) ),
  on ( MetodeBayarActions.getByIdFailure, (state, action) => ({...state, isLoadingButton : false, errorMessage: action.message, isEdit : false, reloadTable: false }) ),

  on ( MetodeBayarActions.deleteInitial, (state, action) => ({...state, isLoadingButton : false, errorMessage: null, isEdit : false, reloadTable: false, metodeBayar : new MetodeBayarPayload }) ),
  on ( MetodeBayarActions.deleteSuccess, (state, action) => ({...state, isLoadingButton : false, errorMessage: null, isEdit: false, reloadTable : true }) ),
  on ( MetodeBayarActions.deleteFailure, (state, action) => ({...state, isLoadingButton : false, errorMessage: action.message, isEdit : false, reloadTable: false }) ),

  on ( MetodeBayarActions.tableData, (state, action) => ({...state, reloadTable :true })),
  on ( MetodeBayarActions.clearData, (state, action) => ({...state, metodeBayar: new MetodeBayarPayload, errorMessage: null, isEdit: false, reloadTable: false, isLoadingButton : false}) ),
)

export function metodeBayarReducers (state : State, action : Action) : any {
  return _metodeBayarReducers(state, action)
}
