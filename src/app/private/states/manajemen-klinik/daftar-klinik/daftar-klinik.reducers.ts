import { DaftarKlinikPayload } from 'src/app/private/models/class-payload-api/manajemen-klinik/daftar-klinik-payload'
import { Action, createReducer, on } from '@ngrx/store';
import * as DaftarKlinikActions from './daftar-klinik.actions'




export interface State {
  daftarKlinik : DaftarKlinikPayload | null
  isLoadingButton : boolean
  errorMessage : any | null
  reloadTable : boolean
  submitButton : boolean
  isEdit : boolean
}
const initialState : State = {
  daftarKlinik :  null,
  isLoadingButton : false,
  errorMessage :  null,
  reloadTable : false,
  submitButton : false,
  isEdit : false
}

const _daftarKlinikReducers = createReducer(
  initialState,

  on(DaftarKlinikActions.addDaftarKlinik, (state, action) => ({ ...state, isLoadingButton: true, errorMessage : null, reloadTable : false, isEdit : false }) ),
  on(DaftarKlinikActions.addDaftarKlinikSuccess, (state, action) => ({ ...state, isLoadingButton: false, reloadTable: false, errorMessage : null }) ),
  on(DaftarKlinikActions.addDaftarKlinikFailure, (state, action) => ({ ...state, errorMessage: action.message, reloadTable : false, isLoadingButton: false }) ),

  on(DaftarKlinikActions.updateDaftarKlinik, (state, action) => ({ ...state, isLoadingButton: true, errorMessage : null, reloadTable : false, isEdit : false }) ),
  on(DaftarKlinikActions.updateDaftarKlinikSuccess, (state, action) => ({ ...state, reloadTable: false, isLoadingButton: false, errorMessage : null }) ),
  on(DaftarKlinikActions.updateDaftarKlinikFailure, (state, action) => ({ ...state, errorMessage: action.message, reloadTable : false, isLoadingButton: false }) ),

  on(DaftarKlinikActions.getByIdDaftarKlinik, (state, action) => ({ ...state, daftarKlinik : new DaftarKlinikPayload, errorMessage: null, isEdit: false, reloadTable : false }) ),
  on(DaftarKlinikActions.getByIdDaftarKlinikSuccess, (state, action) => ({ ...state, daftarKlinik : action.payload, isEdit : true, reloadTable: false, errorMessage: null }) ),
  on(DaftarKlinikActions.getByIdDaftarKlinikFailure, (state, action) => ({ ...state, errorMessage: action.message, reloadTable : false, isLoadingButton: false }) ),

  on(DaftarKlinikActions.deleteDaftarKlinik, (state, action) => ({ ...state, daftarKlinik : new DaftarKlinikPayload, errorMessage: null, isEdit: false, reloadTable : false  }) ),
  on(DaftarKlinikActions.deleteDaftarKlinikSuccess, (state, action) => ({ ...state, reloadTable: false , errorMessage: null, isEdit: false }) ),
  on(DaftarKlinikActions.deleteDaftarKlinikFailure, (state, action) => ({ ...state, errorMessage: action.message, reloadTable : false, isLoadingButton: false }) ),

  on(DaftarKlinikActions.tableData, (state, action) => ({...state, daftarKlinik : new DaftarKlinikPayload, reloadTable : true }) ),
  on(DaftarKlinikActions.clearData, (state, action) => ({
      ...state,
      daftarKlinik : new DaftarKlinikPayload,
      isLoadingButton : false,
      errorMessage :  null,
      reloadTable : false,
      submitButton : false,
      isEdit : false
    })
  ),
)

  // on (DaftarKlinikActions.addMasterPoli, (state, action) => ({...state, isLoadingButton: true, errorMessage : null, reloadTable : false, isEdit : false }) ),

  export function DaftarKlinikReducers (state : State, action : Action) {
    return _daftarKlinikReducers(state, action)
  }
