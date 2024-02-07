import { MenuPayload } from 'src/app/private/models/class-payload-api/manajemen-menu/menu-payload'
import * as MenuActions from './menu.actions'
import { Action, createReducer, on } from '@ngrx/store';

export interface State {
  menu : MenuPayload | null
  isLoadingButton : boolean
  errorMessage : any | null
  reloadTable : boolean
  submitButton : boolean
  isEdit: boolean
}

const initialState : State = {
  menu : null,
  isLoadingButton : false,
  errorMessage : null,
  reloadTable : false,
  submitButton : false,
  isEdit: false
}

const _menuReducers = createReducer(initialState,

  on ( MenuActions.addMenu, (state, action) => ({...state,isLoadingButton: true, errorMessage : null, isEdit: false, reloadTable: false}) ),
  on ( MenuActions.addMenuSuccess, (state, action) => ({...state, menu: action.payload, isLoadingButton: false, isEdit: false,errorMessage : null, reloadTable : false}) ),
  on ( MenuActions.addMenuFailure, (state, action) => ({...state, errorMessage : action.message, isEdit: false, reloadTable: false}) ),

  on ( MenuActions.updateMenu, (state, action) => ({...state, isLoadingButton: true, errorMessage : null, isEdit: false, reloadTable: false}) ),
  on ( MenuActions.updateMenuSuccess, (state, action) => ({...state, menu : action.payload, reloadTable : false,  errorMessage: null, isLoadingButton: false}) ),
  on ( MenuActions.updateMenuFailure, (state, action) => ({...state, isLoadingButton: false, errorMessage: action.message }) ),

  on ( MenuActions.getMenuById, (state, action) => ({...state, menu : new MenuPayload, isEdit: false, reloadTable: false }) ),
  on ( MenuActions.getMenuByIdSuccess, (state, action) => ({...state, menu: action.payload, isLoadingButton: false, errorMessage: null, isEdit: true, reloadTable: false }) ),
  on ( MenuActions.getMenuByIdFailure, (state, action) => ({...state, errorMessage: action.message, isLoadingButton: false, isEdit: false, reloadTable: false }) ),

  on ( MenuActions.deleteMenu, (state, action) => ({...state, menu : new MenuPayload, errorMessage: null, isEdit: false }) ),
  on ( MenuActions.deleteMenuSuccess, (state, action) => ({...state, menu: action.payload, reloadTable : false }) ),
  on ( MenuActions.deleteMenuFailure, (state, action) => ({...state, reloadTable: false, errorMessage : action.message }) ),

  on ( MenuActions.tableData, (state, action) => ({...state, reloadTable :true })),
  on ( MenuActions.clearData, (state, action) => ({...state, menu: new MenuPayload, errorMessage: null, isEdit: false, reloadTable: false, isLoadingButton : false}) )
)

export function menuReducers (state: State, action : Action) : any {
  return _menuReducers(state, action)
}
