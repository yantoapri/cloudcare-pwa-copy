import { Action, createReducer, on } from '@ngrx/store';
import { TindakanMedisUmumPayload } from 'src/app/private/models/class-payload-api/master-data/tindakan/tindakan-medis-umum-payload';
import * as TindakanMedisUmumActions from './tindakan-medis-umum.actions'

export interface State {
  tindakanMedisUmum : TindakanMedisUmumPayload | null
  isLoadingButton : boolean
  errorMessage: any | null
  reloadTable : boolean
  submitButton : boolean
  isEdit : boolean
}

const initialState : State = {
  tindakanMedisUmum : null,
  isLoadingButton : false,
  errorMessage : null,
  reloadTable : false,
  submitButton : false,
  isEdit : false
}

const _tindakanMedisUmumReducers = createReducer(initialState,
  on ( TindakanMedisUmumActions.addInitial, (state, action) => ({...state, isLoadingButton : true, errorMessage : null, isEdit: false, reloadTable : false }) ),
  on ( TindakanMedisUmumActions.addSuccess, (state, action) => ({...state, isLoadingButton : true, tindakanMedisUmum : action.payload, reloadTable: false }) ),
  on ( TindakanMedisUmumActions.addFailure, (state, action) => ({...state, isLoadingButton : false, errorMessage: action.message, isEdit : false, reloadTable: false }) ),

  on ( TindakanMedisUmumActions.updateInitial, (state, action) => ({...state, isLoadingButton : true, errorMessage : null, isEdit: false, reloadTable : false }) ),
  on ( TindakanMedisUmumActions.updateSuccess, (state, action) => ({...state, isLoadingButton : true, tindakanMedisUmum : action.payload, reloadTable: false }) ),
  on ( TindakanMedisUmumActions.updateFailure, (state, action) => ({...state, isLoadingButton : false, errorMessage: action.message, isEdit : false, reloadTable: false }) ),

  on ( TindakanMedisUmumActions.getByIdInitial, (state, action) => ({...state,  isLoadingButton : false, errorMessage: null, isEdit : false, tindakanMedisUmum : new TindakanMedisUmumPayload, reloadTable : false}) ),
  on ( TindakanMedisUmumActions.getByIdSuccess, (state, action) => ({...state, isLoadingButton : false, errorMessage: null, isEdit : true, tindakanMedisUmum : action.payload, reloadTable : false }) ),
  on ( TindakanMedisUmumActions.getByIdFailure, (state, action) => ({...state, isLoadingButton : false, errorMessage: action.message, isEdit : false, reloadTable: false }) ),

  on ( TindakanMedisUmumActions.deleteInitial, (state, action) => ({...state, isLoadingButton : false, errorMessage: null, isEdit : false, reloadTable: false, tindakanMedisUmum : new TindakanMedisUmumPayload }) ),
  on ( TindakanMedisUmumActions.deleteSuccess, (state, action) => ({...state, isLoadingButton : false, errorMessage: null, isEdit: false, reloadTable : false }) ),
  on ( TindakanMedisUmumActions.deleteFailure, (state, action) => ({...state, isLoadingButton : false, errorMessage: action.message, isEdit : false, reloadTable: false }) ),

  on ( TindakanMedisUmumActions.tableData, (state, action) => ({...state, reloadTable :true })),
  on ( TindakanMedisUmumActions.clearData, (state, action) => ({...state, tindakanMedisUmum: new TindakanMedisUmumPayload, errorMessage: null, isEdit: false, reloadTable: false, isLoadingButton : false}) ),
);

export function tindakanMedisUmumReducers(state: State, action : Action) : any {
  return _tindakanMedisUmumReducers(state, action)
}
