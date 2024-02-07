import { Action, createReducer, on } from '@ngrx/store';
import { AntreanUmumPayload } from "src/app/private/models/class-payload-api/dokter/antrean-dokter/antrean-umum-payload";
import * as AntreanUmumAction from './anteran-umum.actions'

export interface State {
  pasien : AntreanUmumPayload | null
  isLoadingButton: boolean
  errorMessage : any | null
  reloadTable: boolean;
  isEdit : boolean
  simpanSukses : boolean
  aksiAntrean : string
}

const initialState: State = {
  pasien : null,
  isLoadingButton : false,
  errorMessage: null,
  reloadTable: false,
  isEdit: false,
  aksiAntrean: null,
  simpanSukses : false
}

const _antreanUmumReducer = createReducer(
  initialState,

  on(AntreanUmumAction.addInitial, (state, action) => ({...state, isLoadingButton: true,  errorMessage: null, isEdit: false, simpanSukses : false }) ),
  on(AntreanUmumAction.addSuccess, (state, action) => ({...state, isLoadingButton: false,  errorMessage: null, isEdit: false, simpanSukses : true }) ),
  on(AntreanUmumAction.addFailure, (state, action) => ({...state, isLoadingButton: false,  errorMessage: action.message, isEdit: false, simpanSukses : false }) ),

  on(AntreanUmumAction.updateInitial, (state, action) => ({...state, isLoadingButton: true,  errorMessage: null, isEdit: false, simpanSukses : false }) ),
  on(AntreanUmumAction.updateSuccess, (state, action) => ({...state, isLoadingButton: false,  errorMessage: null, isEdit: false, simpanSukses : true }) ),
  on(AntreanUmumAction.updateFailure, (state, action) => ({...state, isLoadingButton: false,  errorMessage: action.message, isEdit: false, simpanSukses : false }) ),

  on(AntreanUmumAction.getByIdInitial, (state, action) => ({...state, pasien: new AntreanUmumPayload, aksiAntrean : null, isLoadingButton: false, errorMessage: null, isEdit: false, simpanSukses : false }) ),
  on(AntreanUmumAction.getByIdSuccess, (state, action) => ({...state, pasien: action.payload, aksiAntrean : action.aksiAntrean, isLoadingButton: false, errorMessage: null, isEdit: true, simpanSukses : false }) ),
  on(AntreanUmumAction.getByIdFailure, (state, action) => ({...state, isLoadingButton: false, aksiAntrean : null, errorMessage: action.message, isEdit: false, simpanSukses : false }) ),


  // updateInitial
  // updateSuccess
  // updateFailure


)

  export function antreanUmumReducers(state: State, action: Action): any {
    return _antreanUmumReducer(state, action);
  }
