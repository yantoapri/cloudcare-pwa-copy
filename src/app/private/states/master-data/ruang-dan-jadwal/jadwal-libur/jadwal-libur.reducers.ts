
import { JadwalLiburPayload } from "src/app/private/models/class-payload-api/master-data/ruang-dan-jadwal/jadwal-libur-payload";
import { Action, createReducer, on } from '@ngrx/store';
import * as JadwalLiburActions from './jadwal-libur.actions'

export interface State {
  jadwalLibur : JadwalLiburPayload | null
  isLoadingButton : boolean
  errorMessage: any | null
  reloadTable : boolean
  submitButton : boolean
  isEdit : boolean
}

const initialState : State = {
  jadwalLibur : null,
  isLoadingButton : false,
  errorMessage : null,
  reloadTable : false,
  submitButton : false,
  isEdit : false
}

const _jadwalLiburReducers = createReducer(initialState,
  on ( JadwalLiburActions.addInitial, (state, action) => ({...state, isLoadingButton : true,  isEdit: false, reloadTable : false }) ),
  on ( JadwalLiburActions.addSuccess, (state, action) => ({...state, isLoadingButton : false, jadwalLibur : action.payload, errorMessage: null }) ),
  on ( JadwalLiburActions.addFailure, (state, action) => ({...state, isLoadingButton : false, errorMessage: action.message, isEdit : false, reloadTable: false }) ),


  on ( JadwalLiburActions.updateInitial, (state, action) => ({...state, isLoadingButton : true, errorMessage : null, isEdit: false, reloadTable : false }) ),
  on ( JadwalLiburActions.updateSuccess, (state, action) => ({...state, isLoadingButton : false, jadwalLibur : action.payload, isEdit: false, reloadTable : false }) ),
  on ( JadwalLiburActions.updateFailure, (state, action) => ({...state, isLoadingButton : false, errorMessage: action.message, isEdit : false, reloadTable: false }) ),

  on ( JadwalLiburActions.getByIdInitial, (state, action) => ({...state,  isLoadingButton : false, errorMessage: null, jadwalLibur : new JadwalLiburPayload}) ),
  on ( JadwalLiburActions.getByIdSuccess, (state, action) => ({...state, isLoadingButton : false, errorMessage: null, isEdit : true, jadwalLibur : action.payload, reloadTable : false }) ),
  on ( JadwalLiburActions.getByIdFailure, (state, action) => ({...state, isLoadingButton : false, errorMessage: action.message, isEdit : false, reloadTable: false }) ),

  on ( JadwalLiburActions.deleteInitial, (state, action) => ({...state, isLoadingButton : false, errorMessage: null, isEdit : false, reloadTable: false, jadwalLibur : new JadwalLiburPayload }) ),
  on ( JadwalLiburActions.deleteSuccess, (state, action) => ({...state, isLoadingButton : false, errorMessage: null, isEdit: false, reloadTable : true }) ),
  on ( JadwalLiburActions.deleteFailure, (state, action) => ({...state, isLoadingButton : false, errorMessage: action.message, isEdit : false, reloadTable: false }) ),

  on ( JadwalLiburActions.tableData, (state, action) => ({...state, reloadTable :true })),
  on ( JadwalLiburActions.clearData, (state, action) => ({...state, jadwalLibur: new JadwalLiburPayload, errorMessage: null, isEdit: false, reloadTable: false, isLoadingButton : false}) ),
)

export function jadwalLiburReducers (state : State, action : Action) : any {
  return _jadwalLiburReducers(state, action)
}
