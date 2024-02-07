import { SupplierPayload } from "src/app/private/models/class-payload-api/master-data/supplier-payload";
import { Action, createReducer, on } from '@ngrx/store';
import * as SupplierActions from './supplier.actions'

export interface State {
  supplier : SupplierPayload | null
  isLoadingButton : boolean
  errorMessage: any | null
  reloadTable : boolean
  submitButton : boolean
  isEdit : boolean
}

const initialState : State = {
  supplier : null,
  isLoadingButton : false,
  errorMessage : null,
  reloadTable : false,
  submitButton : false,
  isEdit : false
}

const _supplierReducers = createReducer(initialState,
  on ( SupplierActions.addInitial, (state, action) => ({...state, isLoadingButton : true, errorMessage : null, isEdit: false, reloadTable : false }) ),
  on ( SupplierActions.addSuccess, (state, action) => ({...state, isLoadingButton : true, supplier : action.payload, reloadTable: false }) ),
  on ( SupplierActions.addFailure, (state, action) => ({...state, isLoadingButton : false, errorMessage: action.message, isEdit : false, reloadTable: false }) ),

  on ( SupplierActions.updateInitial, (state, action) => ({...state, isLoadingButton : true, errorMessage : null, isEdit: false, reloadTable : false }) ),
  on ( SupplierActions.updateSuccess, (state, action) => ({...state, isLoadingButton : true, supplier : action.payload, reloadTable: false, isEdit: false }) ),
  on ( SupplierActions.updateFailure, (state, action) => ({...state, isLoadingButton : false, errorMessage: action.message, isEdit : false, reloadTable: false }) ),

  on ( SupplierActions.getByIdInitial, (state, action) => ({...state,  isLoadingButton : false, errorMessage: null, isEdit : false, supplier : new SupplierPayload, reloadTable : false}) ),
  on ( SupplierActions.getByIdSuccess, (state, action) => ({...state, isLoadingButton : false, errorMessage: null, isEdit : true, supplier : action.payload, reloadTable : false }) ),
  on ( SupplierActions.getByIdFailure, (state, action) => ({...state, isLoadingButton : false, errorMessage: action.message, isEdit : false, reloadTable: false }) ),

  on ( SupplierActions.deleteInitial, (state, action) => ({...state, isLoadingButton : false, errorMessage: null, isEdit : false, reloadTable: false, supplier : new SupplierPayload }) ),
  on ( SupplierActions.deleteSuccess, (state, action) => ({...state, isLoadingButton : false, errorMessage: null, isEdit: false, reloadTable : false }) ),
  on ( SupplierActions.deleteFailure, (state, action) => ({...state, isLoadingButton : false, errorMessage: action.message, isEdit : false, reloadTable: false }) ),

  on ( SupplierActions.tableData, (state, action) => ({...state, reloadTable :true })),
  on ( SupplierActions.clearData, (state, action) => ({...state, supplier: new SupplierPayload, errorMessage: null, isEdit: false, reloadTable: false, isLoadingButton : false}) ),
)

export function supplierReducers (state : State, action : Action) : any {
  return _supplierReducers(state, action)
}
