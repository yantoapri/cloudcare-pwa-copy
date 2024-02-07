import { MenuRightPayload } from "src/app/private/models/class-payload-api/manajemen-menu/menu-right-payload";
import { Action, createReducer, on } from '@ngrx/store';
import * as MenuRightActions from "./menu-right.actions"

export interface State {
  menuRight : MenuRightPayload | null
  isLoadingButton : boolean
  errorMessage : any | null
  reloadTable : boolean
  submitButton : boolean
  isEdit: boolean
}

const initialState : State = {
  menuRight : null,
  isLoadingButton : false,
  errorMessage : null,
  reloadTable : false,
  submitButton : false,
  isEdit: false
}

const _menuRightReducers = createReducer(initialState,
  on ( MenuRightActions.addMenuRight, (state, action) => ({...state, isLoadingButton: true, errorMessage : null, isEdit: false, reloadTable: false }) ),
  on ( MenuRightActions.addMenuSuccess, (state, action) => ({...state, menuRight: action.payload, isLoadingButton: false, isEdit: false,errorMessage : null, reloadTable : false }) ),
  on ( MenuRightActions.addMenuFailure, (state, action) => ({...state, errorMessage : action.message, isEdit: false, reloadTable: false, isLoadingButton: false }) ),

  on ( MenuRightActions.updateMenuRight, (state, action) => ({...state, isLoadingButton: true, errorMessage : null, isEdit: false, reloadTable: false }) ),
  on ( MenuRightActions.updateMenuRightSuccess, (state, action) => ({...state, menuRight : action.payload, reloadTable : false,  errorMessage: null, isLoadingButton: false, isEdit: false }) ),
  on ( MenuRightActions.updateMenuRightFailure, (state, action) => ({...state, isLoadingButton: false, errorMessage: action.message }) ),

  on ( MenuRightActions.getMenuRightById, (state, action) => ({...state, menuRight : new MenuRightPayload, isEdit: false, reloadTable: false }) ),
  on ( MenuRightActions.getMenuRightByIdSuccess, (state, action) => ({...state, menuRight: action.payload, isLoadingButton: false, errorMessage: null, isEdit: true, reloadTable: false }) ),
  on ( MenuRightActions.getMenuRightByIdFailure, (state, action) => ({...state, errorMessage: action.message, isLoadingButton: false, isEdit: false, reloadTable: false }) ),

  on ( MenuRightActions.deleteMenuRight, (state, action) => ({...state, menuRight : new MenuRightPayload, errorMessage: null, isEdit: false }) ),
  on ( MenuRightActions.deleteMenuRightSuccess, (state, action) => ({...state, menuRight: action.payload, reloadTable : true }) ),
  on ( MenuRightActions.deleteMenuRightFailure, (state, action) => ({...state,  reloadTable: false, errorMessage : action.message, isLoadingButton: false }) ),

  on ( MenuRightActions.tableData, (state, action) => ({...state, reloadTable :true })),
  on ( MenuRightActions.clearData, (state, action) => ({...state, menuRight: new MenuRightPayload, errorMessage: null, isEdit: false, reloadTable: false, isLoadingButton : false }) )
)

export function menuRightReducers (state : State, action : Action) : any {
  return _menuRightReducers(state, action)
}
