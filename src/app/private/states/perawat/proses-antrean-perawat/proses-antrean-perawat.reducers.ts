import { Action, createReducer, on } from '@ngrx/store';
import * as ProsesAntreanPerawatActions  from './proses-antrean-perawat.actions'
import { ProsesAntreanPerawatPayload } from "src/app/private/models/class-payload-api/perawat/proses-antrean-perawat-payload";


export interface State {
  prosesAntrean : ProsesAntreanPerawatPayload | null
  isLoadingButton : boolean
  errorMessage: any | null
  reloadTable : boolean
  submitButton : boolean
  isEdit : boolean
}

const initialState : State = {
  prosesAntrean : null,
  isLoadingButton : false,
  errorMessage : null,
  reloadTable : false,
  submitButton : false,
  isEdit : false
}


const _prosesAntreanPerawat = createReducer(initialState,
  on ( ProsesAntreanPerawatActions.addInitial, (state, action) => ({...state, isLoadingButton : true, errorMessage : null, isEdit: false, reloadTable : false }) ),
  on ( ProsesAntreanPerawatActions.addSuccess, (state, action) => ({...state, isLoadingButton : true, prosesAntrean : action.payload, reloadTable: false }) ),
  on ( ProsesAntreanPerawatActions.addFailure, (state, action) => ({...state, isLoadingButton : false, errorMessage: action.message, isEdit : false, reloadTable: false }) ),

  on ( ProsesAntreanPerawatActions.updateInitial, (state, action) => ({...state, isLoadingButton : true, errorMessage : null, isEdit: false, reloadTable : false }) ),
  on ( ProsesAntreanPerawatActions.updateSuccess, (state, action) => ({...state, isLoadingButton : true, prosesAntrean : action.payload, reloadTable: false }) ),
  on ( ProsesAntreanPerawatActions.updateFailure, (state, action) => ({...state, isLoadingButton : false, errorMessage: action.message, isEdit : false, reloadTable: false }) ),

  on ( ProsesAntreanPerawatActions.getByIdInitial, (state, action) => ({...state,  isLoadingButton : false, errorMessage: null, isEdit : false, prosesAntrean : new ProsesAntreanPerawatPayload, reloadTable : false}) ),
  on ( ProsesAntreanPerawatActions.getByIdSuccess, (state, action) => ({...state, isLoadingButton : false, errorMessage: null, isEdit : true, prosesAntrean : action.payload, reloadTable : false }) ),
  on ( ProsesAntreanPerawatActions.getByIdFailure, (state, action) => ({...state, isLoadingButton : false, errorMessage: action.message, isEdit : false, reloadTable: false }) ),

  on ( ProsesAntreanPerawatActions.deleteInitial, (state, action) => ({...state, isLoadingButton : false, errorMessage: null, isEdit : false, reloadTable: false, prosesAntrean : new ProsesAntreanPerawatPayload }) ),
  on ( ProsesAntreanPerawatActions.deleteSuccess, (state, action) => ({...state, isLoadingButton : false, errorMessage: null, isEdit: false, reloadTable : false }) ),
  on ( ProsesAntreanPerawatActions.deleteFailure, (state, action) => ({...state, isLoadingButton : false, errorMessage: action.message, isEdit : false, reloadTable: false }) ),

  on ( ProsesAntreanPerawatActions.tableData, (state, action) => ({...state, reloadTable :true })),
  on ( ProsesAntreanPerawatActions.clearData, (state, action) => ({...state, prosesAntrean: new ProsesAntreanPerawatPayload, errorMessage: null, isEdit: false, reloadTable: false, isLoadingButton : false}) ),
);

export function prosesAntreanPerawatReducers(state: State, action : Action) : any {
  return _prosesAntreanPerawat(state, action)
}
