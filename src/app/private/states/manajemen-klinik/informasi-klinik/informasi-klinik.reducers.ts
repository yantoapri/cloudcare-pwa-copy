import { Action, createReducer, on } from '@ngrx/store';
import * as InformasiKlinikActions from './informasi-klinik.actions'
import { InformasiKlinikPayload } from 'src/app/private/models/class-payload-api/manajemen-klinik/informasi-klinik.payload';

export interface State {
  infoKlinik : InformasiKlinikPayload
  isLoadingButton : boolean
  errorMessage: any | null
  reloadTable : boolean
  submitButton : boolean
  isEdit : boolean
}

const initialState : State = {
  infoKlinik : null,
  isLoadingButton : false,
  errorMessage : null,
  reloadTable : false,
  submitButton : false,
  isEdit : false
}

const _informasiKlinikReducers = createReducer(initialState,

  on ( InformasiKlinikActions.updateInitial, (state, action) => ({...state, isLoadingButton : true, errorMessage : null, isEdit: false, reloadTable : false }) ),
  on ( InformasiKlinikActions.updateSuccess, (state, action) => ({...state, isLoadingButton : false, infoKlinik : action.payload,  }) ),
  on ( InformasiKlinikActions.updateFailure, (state, action) => ({...state, isLoadingButton : false, errorMessage: action.message, isEdit : false, reloadTable: false }) ),

  on ( InformasiKlinikActions.getByIdInitial, (state, action) => ({...state,  isLoadingButton : false, errorMessage: null, isEdit : false, infoKlinik : new InformasiKlinikPayload}) ),
  on ( InformasiKlinikActions.getByIdSuccess, (state, action) => ({...state, isLoadingButton : false, errorMessage: null, isEdit : true, infoKlinik : action.payload, reloadTable : false }) ),
  on ( InformasiKlinikActions.getByIdFailure, (state, action) => ({...state, isLoadingButton : false, errorMessage: action.message, isEdit : false, reloadTable: false }) ),

  on ( InformasiKlinikActions.tableData, (state, action) => ({...state, reloadTable : true })),
  on ( InformasiKlinikActions.clearData, (state, action) => ({...state, infoKlinik: new InformasiKlinikPayload, errorMessage: null, isEdit: false, reloadTable: false, isLoadingButton : false}) ),
)

export function InformasiKlinikReducers (state : State, action : Action) : any {
  return _informasiKlinikReducers(state, action)
}
