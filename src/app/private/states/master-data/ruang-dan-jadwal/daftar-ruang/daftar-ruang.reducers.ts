import { DaftarRuangPayload } from "src/app/private/models/class-payload-api/master-data/ruang-dan-jadwal/daftar-ruang-payload";
import { Action, createReducer, on } from '@ngrx/store';
import * as DaftarRuangActions from './daftar-ruang.actions'

export interface State {
  daftarRuang : DaftarRuangPayload | null
  isLoadingButton : boolean
  errorMessage: any | null
  reloadTable : boolean
  submitButton : boolean
  isEdit : boolean
}

const initialState : State = {
  daftarRuang : null,
  isLoadingButton : false,
  errorMessage : null,
  reloadTable : false,
  submitButton : false,
  isEdit : false
}

const _daftarRuangReducers = createReducer(initialState,
  on ( DaftarRuangActions.addInitial, (state, action) => ({...state, isLoadingButton : true, errorMessage : null, isEdit: false, reloadTable : false }) ),
  on ( DaftarRuangActions.addSuccess, (state, action) => ({...state, isLoadingButton : false, daftarRuang : action.payload }) ),
  on ( DaftarRuangActions.addFailure, (state, action) => ({...state, isLoadingButton : false, errorMessage: action.message, isEdit : false, reloadTable: false }) ),
  on ( DaftarRuangActions.updateInitial, (state, action) => ({...state, isLoadingButton : true, errorMessage : null, isEdit: false, reloadTable : false }) ),
  on ( DaftarRuangActions.updateSuccess, (state, action) => ({...state, isLoadingButton : false, daftarRuang : action.payload,  }) ),
  on ( DaftarRuangActions.updateFailure, (state, action) => ({...state, isLoadingButton : false, errorMessage: action.message, isEdit : false, reloadTable: false }) ),

  on ( DaftarRuangActions.getByIdInitial, (state, action) => ({...state,  isLoadingButton : false, errorMessage: null, isEdit : false, daftarRuang : new DaftarRuangPayload}) ),
  on ( DaftarRuangActions.getByIdSuccess, (state, action) => ({...state, isLoadingButton : false, errorMessage: null, isEdit : true, daftarRuang : action.payload, reloadTable : false }) ),
  on ( DaftarRuangActions.getByIdFailure, (state, action) => ({...state, isLoadingButton : false, errorMessage: action.message, isEdit : false, reloadTable: false }) ),

  on ( DaftarRuangActions.deleteInitial, (state, action) => ({...state, isLoadingButton : false, errorMessage: null, isEdit : false, reloadTable: false, daftarRuang : new DaftarRuangPayload }) ),
  on ( DaftarRuangActions.deleteSuccess, (state, action) => ({...state, isLoadingButton : false, errorMessage: null, isEdit: false, reloadTable : true }) ),
  on ( DaftarRuangActions.deleteFailure, (state, action) => ({...state, isLoadingButton : false, errorMessage: action.message, isEdit : false, reloadTable: false }) ),

  on ( DaftarRuangActions.tableData, (state, action) => ({...state, reloadTable :true })),
  on ( DaftarRuangActions.clearData, (state, action) => ({...state, daftarRuang: new DaftarRuangPayload, errorMessage: null, isEdit: false, reloadTable: false, isLoadingButton : false}) ),
)

export function daftarRuangReducers (state : State, action : Action) : any {
  return _daftarRuangReducers(state, action)
}
