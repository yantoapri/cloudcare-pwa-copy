
import { DataObatPayload } from "src/app/private/models/class-payload-api/master-data/data-obat-payload";
import { Action, createReducer, on } from '@ngrx/store';

import * as DataObatActions from './data-obat.actions'

export interface State {
  dataObat : DataObatPayload | null
  isLoadingButton : boolean
  errorMessage: any | null
  reloadTable : boolean
  submitButton : boolean
  isEdit : boolean
}

const initialState : State = {
  dataObat : null,
  isLoadingButton : false,
  errorMessage : null,
  reloadTable : false,
  submitButton : false,
  isEdit : false
}

const _dataObatReducers = createReducer(initialState,
  on ( DataObatActions.addInitial, (state, action) => ({...state, isLoadingButton : true, errorMessage : null, isEdit: false, reloadTable : false }) ),
  on ( DataObatActions.addSuccess, (state, action) => ({...state, isLoadingButton : false, dataObat : action.payload }) ),
  on ( DataObatActions.addFailure, (state, action) => ({...state, isLoadingButton : false, errorMessage: action.message, isEdit : false, reloadTable: false }) ),
  on ( DataObatActions.updateInitial, (state, action) => ({...state, isLoadingButton : true, errorMessage : null, isEdit: false, reloadTable : false }) ),
  on ( DataObatActions.updateSuccess, (state, action) => ({...state, isLoadingButton : false, dataObat : action.payload,  }) ),
  on ( DataObatActions.updateFailure, (state, action) => ({...state, isLoadingButton : false, errorMessage: action.message, isEdit : false, reloadTable: false }) ),

  on ( DataObatActions.getByIdInitial, (state, action) => ({...state,  isLoadingButton : false, errorMessage: null, isEdit : false, dataObat : new DataObatPayload}) ),
  on ( DataObatActions.getByIdSuccess, (state, action) => ({...state, isLoadingButton : false, errorMessage: null, isEdit : true, dataObat : action.payload, reloadTable : false }) ),
  on ( DataObatActions.getByIdFailure, (state, action) => ({...state, isLoadingButton : false, errorMessage: action.message, isEdit : false, reloadTable: false }) ),

  on ( DataObatActions.deleteInitial, (state, action) => ({...state, isLoadingButton : false, errorMessage: null, isEdit : false, reloadTable: false, dataObat : new DataObatPayload }) ),
  on ( DataObatActions.deleteSuccess, (state, action) => ({...state, isLoadingButton : false, errorMessage: null, isEdit: false, reloadTable : true }) ),
  on ( DataObatActions.deleteFailure, (state, action) => ({...state, isLoadingButton : false, errorMessage: action.message, isEdit : false, reloadTable: false }) ),

  on ( DataObatActions.tableData, (state, action) => ({...state, reloadTable :true })),
  on ( DataObatActions.clearData, (state, action) => ({...state, dataObat: new DataObatPayload, errorMessage: null, isEdit: false, reloadTable: false, isLoadingButton : false}) ),
)

export function dataObatReducers (state : State, action : Action) : any {
  return _dataObatReducers(state, action)
}
