
import { JadwalSesiPayload } from "src/app/private/models/class-payload-api/master-data/ruang-dan-jadwal/jadwal-sesi-payload";
import { Action, createReducer, on } from '@ngrx/store';
import * as JadwalSesiActions from './jadwal-sesi.actions'

export interface State {
  jadwalSesi : JadwalSesiPayload | null
  isLoadingButton : boolean
  errorMessage: any | null
  reloadTable : boolean
  submitButton : boolean
  isEdit : boolean
}

const initialState : State = {
  jadwalSesi : null,
  isLoadingButton : false,
  errorMessage : null,
  reloadTable : false,
  submitButton : false,
  isEdit : false
}

const _jadwalSesiReducers = createReducer(initialState,
  on ( JadwalSesiActions.addInitial, (state, action) => ({...state, isLoadingButton : true, errorMessage : null, isEdit: false, reloadTable : false }) ),
  on ( JadwalSesiActions.addSuccess, (state, action) => ({...state, isLoadingButton : true, jadwalSesi : action.payload, reloadTable: false }) ),
  on ( JadwalSesiActions.addFailure, (state, action) => ({...state, isLoadingButton : false, errorMessage: action.message, isEdit : false, reloadTable: false }) ),

  on ( JadwalSesiActions.updateInitial, (state, action) => ({...state, isLoadingButton : true, errorMessage : null, isEdit: false, reloadTable : false }) ),
  on ( JadwalSesiActions.updateSuccess, (state, action) => ({...state, isLoadingButton : true, jadwalSesi : action.payload, reloadTable: false, isEdit: false }) ),
  on ( JadwalSesiActions.updateFailure, (state, action) => ({...state, isLoadingButton : false, errorMessage: action.message, isEdit : false, reloadTable: false }) ),

  on ( JadwalSesiActions.getByIdInitial, (state, action) => ({...state,  isLoadingButton : false, errorMessage: null, isEdit : false, jadwalSesi : new JadwalSesiPayload, reloadTable : false}) ),
  on ( JadwalSesiActions.getByIdSuccess, (state, action) => ({...state, isLoadingButton : false, errorMessage: null, isEdit : true, jadwalSesi : action.payload, reloadTable : false }) ),
  on ( JadwalSesiActions.getByIdFailure, (state, action) => ({...state, isLoadingButton : false, errorMessage: action.message, isEdit : false, reloadTable: false }) ),

  on ( JadwalSesiActions.deleteInitial, (state, action) => ({...state, isLoadingButton : false, errorMessage: null, isEdit : false, reloadTable: false, jadwalSesi : new JadwalSesiPayload }) ),
  on ( JadwalSesiActions.deleteSuccess, (state, action) => ({...state, isLoadingButton : false, errorMessage: null, isEdit: false, reloadTable : false }) ),
  on ( JadwalSesiActions.deleteFailure, (state, action) => ({...state, isLoadingButton : false, errorMessage: action.message, isEdit : false, reloadTable: false }) ),

  on ( JadwalSesiActions.tableData, (state, action) => ({...state, reloadTable :true })),
  on ( JadwalSesiActions.clearData, (state, action) => ({...state, jadwalSesi: new JadwalSesiPayload, errorMessage: null, isEdit: false, reloadTable: false, isLoadingButton : false}) ),
)

export function jadwalSesiReducers (state : State, action : Action) : any {
  return _jadwalSesiReducers(state, action)
}
