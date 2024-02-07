import { DaftarPoliklinikPayload } from 'src/app/private/models/class-payload-api/manajemen-klinik/daftar-poliklinik-payload'
import { Action, createReducer, on } from '@ngrx/store';
import * as DaftarPoliklinikActions from './daftar-poliklinik.actions'

export interface State {
  daftarPoliklinik : DaftarPoliklinikPayload | null
  isLoadingButton : boolean
  errorMessage : any | null
  reloadTable : boolean
  submitButton : boolean
  isEdit : boolean
}

const initialState : State = {
  daftarPoliklinik :  null,
  isLoadingButton : false,
  errorMessage :  null,
  reloadTable : false,
  submitButton : false,
  isEdit : false
}

const _daftarPoliklinikReducers = createReducer(initialState,

on(DaftarPoliklinikActions.addDaftarPoliklinik, (state, action) => ({...state, errorMessage: null, isEdit: false, reloadTable : false, isLoadingButton: true}) ),
on(DaftarPoliklinikActions.addDaftarPoliklinikSuccess, (state, action) => ({...state, reloadTable: false , errorMessage: null, isEdit: false, isLoadingButton: false }) ),
on(DaftarPoliklinikActions.addDaftarPoliklinikFailure, (state, action) => ({...state, errorMessage: action.message, reloadTable : false, isLoadingButton: false }) ),

on(DaftarPoliklinikActions.updateDaftarPoliklinik, (state, action) => ({...state, errorMessage: null, isEdit: false, reloadTable : false, isLoadingButton: true }) ),
on(DaftarPoliklinikActions.updateDaftarPoliklinikSuccess, (state, action) => ({...state, reloadTable: false , errorMessage: null, isEdit: false, isLoadingButton: false }) ),
on(DaftarPoliklinikActions.updateDaftarPoliklinikFailure, (state, action) => ({...state, errorMessage: action.message, reloadTable : false, isLoadingButton: false, isEdit: false }) ),

on(DaftarPoliklinikActions.getBbyIdDaftarPoliklinik, (state, action) => ({...state, daftarPoliklinik : new DaftarPoliklinikPayload, errorMessage: null, isEdit: false, reloadTable : false, isLoadingButton: true }) ),
on(DaftarPoliklinikActions.getBbyIdDaftarPoliklinikSuccess, (state, action) => ({...state, daftarPoliklinik: action.payload, isEdit : true, reloadTable : false, errorMessage : null, isLoadingButton: false }) ),
on(DaftarPoliklinikActions.getBbyIdDaftarPoliklinikFailure, (state, action) => ({...state, errorMessage: action.message, reloadTable : false, isLoadingButton: false }) ),

on(DaftarPoliklinikActions.deleteDaftarPoliklinik, (state, action) => ({...state, daftarPoliklinik : new DaftarPoliklinikPayload, errorMessage: null, isEdit: false, reloadTable : false }) ),
on(DaftarPoliklinikActions.deleteDaftarPoliklinikSuccess, (state, action) => ({...state, reloadTable: false , errorMessage: null, isEdit: false, isLoadingButton: false }) ),
on(DaftarPoliklinikActions.deleteDaftarPoliklinikFailure, (state, action) => ({...state, errorMessage: action.message, reloadTable : false, isLoadingButton: false }) ),

on(DaftarPoliklinikActions.tableData, (state, action) => ({...state, daftarPoliklinik : new DaftarPoliklinikPayload, reloadTable : true }) ),
on(DaftarPoliklinikActions.clearData, (state, action) => ({
    ...state,
    daftarPoliklinik : new DaftarPoliklinikPayload,
    isLoadingButton : false,
    errorMessage :  null,
    reloadTable : false,
    submitButton : false,
    isEdit : false
  })
),

)

export function DaftarPoliklinikReducers (state: State, action : Action) {
  return _daftarPoliklinikReducers(state, action)
}
