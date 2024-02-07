import { JadwalDokterPayload } from "src/app/private/models/class-payload-api/pengaturan-jadwal/jadwal-dokter-payload";

import { JadwalLiburPayload } from "src/app/private/models/class-payload-api/master-data/ruang-dan-jadwal/jadwal-libur-payload";
import { Action, createReducer, on } from '@ngrx/store';
// import * as JadwalLiburActions from './jadwal-libur.actions'
import * as JadwalDokterActions from './jadwal-dokter.actions'
export interface State {
  jadwalDokter : JadwalDokterPayload | null
  isLoadingButton : boolean
  errorMessage: any | null
  reloadTable : boolean
  submitButton : boolean
  isEdit : boolean
}

const initialState : State = {
  jadwalDokter : null,
  isLoadingButton : false,
  errorMessage : null,
  reloadTable : false,
  submitButton : false,
  isEdit : false
}

const _jadwalDokterReducers = createReducer(initialState,
  on ( JadwalDokterActions.addInitial, (state, action) => ({...state, isLoadingButton : true,  isEdit: false, reloadTable : false }) ),
  on ( JadwalDokterActions.addSuccess, (state, action) => ({...state, isLoadingButton : false, jadwalDokter : action.payload, errorMessage: null }) ),
  on ( JadwalDokterActions.addFailure, (state, action) => ({...state, isLoadingButton : false, errorMessage: action.message, isEdit : false, reloadTable: false }) ),

  on ( JadwalDokterActions.updateInitial, (state, action) => ({...state, isLoadingButton : true, errorMessage : null, isEdit: false, reloadTable : false }) ),
  on ( JadwalDokterActions.updateSuccess, (state, action) => ({...state, isLoadingButton : false, jadwalDokter : action.payload, isEdit: false, reloadTable : false }) ),
  on ( JadwalDokterActions.updateFailure, (state, action) => ({...state, isLoadingButton : false, errorMessage: action.message, isEdit : false, reloadTable: false }) ),

  on ( JadwalDokterActions.getByIdInitial, (state, action) => ({...state,  isLoadingButton : false, errorMessage: null, jadwalDokter : new JadwalDokterPayload}) ),
  on ( JadwalDokterActions.getByIdSuccess, (state, action) => ({...state, isLoadingButton : false, errorMessage: null, isEdit : true, jadwalDokter : action.payload, reloadTable : false }) ),
  on ( JadwalDokterActions.getByIdFailure, (state, action) => ({...state, isLoadingButton : false, errorMessage: action.message, isEdit : false, reloadTable: false }) ),

  on ( JadwalDokterActions.deleteInitial, (state, action) => ({...state, isLoadingButton : false, errorMessage: null, isEdit : false, reloadTable: false, jadwalDokter : new JadwalDokterPayload }) ),
  on ( JadwalDokterActions.deleteSuccess, (state, action) => ({...state, isLoadingButton : false, errorMessage: null, isEdit: false, reloadTable : true }) ),
  on ( JadwalDokterActions.deleteFailure, (state, action) => ({...state, isLoadingButton : false, errorMessage: action.message, isEdit : false, reloadTable: false }) ),

  on ( JadwalDokterActions.tableData, (state, action) => ({...state, reloadTable : true })),
  on ( JadwalDokterActions.clearData, (state, action) => ({...state, jadwalDokter: new JadwalDokterPayload, errorMessage: null, isEdit: false, reloadTable: false, isLoadingButton : false}) ),
)

export function jadwalDokterReducers (state : State, action : Action) : any {
  return _jadwalDokterReducers(state, action)
}
