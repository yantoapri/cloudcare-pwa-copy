import { PasienPayload } from "src/app/private/models/class-payload-api/pasien/pasien-payload";
import { Action, createReducer, on } from '@ngrx/store';
import * as PasienActions from './pasien.actions'

export interface State {
  pasien : PasienPayload | null
  isLoadingButton : boolean
  errorMessage: any | null
  reloadTable : boolean
  submitButton : boolean
  isEdit : boolean
}

const initialState : State = {
  pasien : null,
  isLoadingButton : false,
  errorMessage : null,
  reloadTable : false,
  submitButton : false,
  isEdit : false
}

const _pasienReducers = createReducer(initialState,
  on ( PasienActions.addInitial, (state, action) => ({...state, isLoadingButton : true,  isEdit: false, reloadTable : false }) ),
  on ( PasienActions.addSuccess, (state, action) => ({...state, isLoadingButton : false, pasien : action.payload, errorMessage: null }) ),
  on ( PasienActions.addFailure, (state, action) => ({...state, isLoadingButton : false, errorMessage: action.message, isEdit : false, reloadTable: false }) ),


  on ( PasienActions.updateInitial, (state, action) => ({...state, isLoadingButton : true, errorMessage : null, isEdit: false, reloadTable : false }) ),
  on ( PasienActions.updateSuccess, (state, action) => ({...state, isLoadingButton : false, pasien : action.payload, isEdit: false, reloadTable : false }) ),
  on ( PasienActions.updateFailure, (state, action) => ({...state, isLoadingButton : false, errorMessage: action.message, isEdit : false, reloadTable: false }) ),

  on ( PasienActions.getByIdInitial, (state, action) => ({...state,  isLoadingButton : false, errorMessage: null, pasien : new PasienPayload}) ),
  on ( PasienActions.getByIdSuccess, (state, action) => ({...state, isLoadingButton : false, errorMessage: null, isEdit : true, pasien : action.payload, reloadTable : false }) ),
  on ( PasienActions.getByIdFailure, (state, action) => ({...state, isLoadingButton : false, errorMessage: action.message, isEdit : false, reloadTable: false }) ),

  on ( PasienActions.deleteInitial, (state, action) => ({...state, isLoadingButton : false, errorMessage: null, isEdit : false, reloadTable: false, pasien : new PasienPayload }) ),
  on ( PasienActions.deleteSuccess, (state, action) => ({...state, isLoadingButton : false, errorMessage: null, isEdit: false, reloadTable : true }) ),
  on ( PasienActions.deleteFailure, (state, action) => ({...state, isLoadingButton : false, errorMessage: action.message, isEdit : false, reloadTable: false }) ),

  on ( PasienActions.tableData, (state, action) => ({...state, reloadTable :true })),
  on ( PasienActions.clearData, (state, action) => ({...state, pasien: new PasienPayload, errorMessage: null, isEdit: false, reloadTable: false, isLoadingButton : false}) ),
)

export function pasienReducers (state : State, action : Action) : any {
  return _pasienReducers(state, action)
}
