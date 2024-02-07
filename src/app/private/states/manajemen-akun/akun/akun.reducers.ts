import { Action, createReducer, on } from '@ngrx/store';
import { AkunPayload } from 'src/app/private/models/class-payload-api/manajemen-akun/akun-payload'
import * as AkunAction from './akun.actions'
export interface State {
  akun : AkunPayload | null
  isLoadingButton: boolean
  errorMessage : any | null
  reloadTable: boolean;
  isEdit : boolean
}
const initialState: State = {
  akun : null,
  isLoadingButton : false,
  errorMessage: null,
  reloadTable: false,
  isEdit: false
}
const _manajemenAkunReducer = createReducer(
  initialState,

  on(AkunAction.addAkun, (state, action) => ({...state, isLoadingButton: true, errorMessage : null, isEdit : false }) ),
  on(AkunAction.addAkunSuccess, (state, action) => ({...state, akun : action.payload, errorMessage: null, isLoadingButton : false }) ),
  on(AkunAction.addAkunFailure, (state, action) => ({...state, errorMessage: action.message, isLoadingButton: false }) ),

  on(AkunAction.getAkunById, (state, action) => ({...state, akun : new AkunPayload, errorMessage : null, isLoadingButton : true, isEdit : false }) ),
  on(AkunAction.getAkunByIdSuccess, (state, action) => ({...state, akun : action.payload, isLoadingButton : false, isEdit: true }) ),
  on(AkunAction.getAkunByIdFailure, (state, action) => ({...state, errorMessage: action.message, isLoadingButton : false, isEdit : false }) ),

  on(AkunAction.updateAkun, (state, action) => ({...state, errorMessage : null, isEdit : false, isLoadingButton : true }) ),
  on(AkunAction.updateAkunSuccess, (state, action) => ({...state, isEdit : false, isLoadingButton : false, errorMessage: null }) ),
  on(AkunAction.updateAkunFailure, (state, action) => ({...state, errorMessage: action.message, isLoadingButton : false, isEdit : false }) ),

  on(AkunAction.deleteAkun, (state, action) => ({...state, errorMessage : null, akun : new AkunPayload,reloadTable: false }) ),
  on(AkunAction.deleteAkunSuccess, (state, action) => ({...state, akun: action.payload, reloadTable: true }) ),
  on(AkunAction.deleteAkunFailure, (state, action) => ({...state, errorMessage: action.message, isLoadingButton : false, reloadTable: false }) ),

  on(AkunAction.clearState, (state, action) => ({...state, errorMessage : null, isLoadingButton: false})),
  // on(AkunAction.tableData, (state, action) => ({...state }) ),

)

export function manajemenAkunReducer(state: State, action: Action): any {
  return _manajemenAkunReducer(state, action);
}
