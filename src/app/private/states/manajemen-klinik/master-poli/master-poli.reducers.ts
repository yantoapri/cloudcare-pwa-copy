import { MasterPoliPayload } from "src/app/private/models/class-payload-api/manajemen-klinik/master-poli-payload";
import { Action, createReducer, on } from '@ngrx/store';
import * as MasterPoliAction from './master-poli.actions'

export interface State {
  masterPoli : MasterPoliPayload | null
  isLoadingButton : boolean
  errorMessage : any | null
  reloadTable : boolean
  submitButton : boolean
  isEdit : boolean
  successProccess : boolean
}
const initialState : State = {
  masterPoli :  null,
  isLoadingButton : false,
  errorMessage :  null,
  reloadTable : false,
  submitButton : false,
  successProccess: false,
  isEdit : false
}

const _masterPoliReducers = createReducer(
  initialState,

  on (MasterPoliAction.addMasterPoli, (state, action) => ({...state, isLoadingButton: true, errorMessage : null, reloadTable : false, isEdit : false }) ),
  on (MasterPoliAction.addMasterPoliSuccess, (state, action) => ({...state, isLoadingButton: false,reloadTable: false, errorMessage : null }) ),
  on (MasterPoliAction.addMasterPoliFailure, (state, action) => ({...state, errorMessage: action.message, reloadTable : false, isLoadingButton: false }) ),

  on (MasterPoliAction.updateMasterPoli, (state, action) => ({...state, isLoadingButton: true, errorMessage : null, reloadTable : false, isEdit : false }) ),
  on (MasterPoliAction.updateMasterPoliSuccess, (state, action) => ({...state,  reloadTable: false, isLoadingButton: false, errorMessage : null }) ),
  on (MasterPoliAction.updateMasterPoliFailure, (state, action) => ({...state, errorMessage: action.message, reloadTable : false, isLoadingButton: false }) ),

  on (MasterPoliAction.getMasterPoliById, (state, action) => ({...state, masterPoli: new MasterPoliPayload, isEdit : false,reloadTable : false, errorMessage : null }) ),
  on (MasterPoliAction.getMasterPoliByIdSuccess, (state, action) => ({...state, masterPoli : action.payload, isEdit : true, reloadTable: false, errorMessage: null }) ),
  on (MasterPoliAction.getMasterPoliByIdFailure, (state, action) => ({...state, errorMessage: action.message, reloadTable : false, isLoadingButton: false }) ),

  on (MasterPoliAction.deleteMasterPoli, (state, action) => ({...state, masterPoli: new MasterPoliPayload, errorMessage: null, isEdit: false }) ),
  on (MasterPoliAction.deleteMasterPoliSuccess, (state, action) => ({...state, reloadTable : false, }) ),
  on (MasterPoliAction.deleteMasterPoliFailure, (state, action) => ({...state, errorMessage: action.message, reloadTable : false, isLoadingButton: false}) ),

  on (MasterPoliAction.tableData, (state, action) => ({...state, masterPoli : new MasterPoliPayload, reloadTable : true }) ),
  on (MasterPoliAction.clearData, (state, action) => ({
      ...state,
      masterPoli : new MasterPoliPayload,
      isLoadingButton : false,
      errorMessage :  null,
      reloadTable : false,
      submitButton : false,
      isEdit : false
    })
  ),
)

export function MasterPoliReducers (state : State, action : Action) {
  return _masterPoliReducers(state, action)
}
