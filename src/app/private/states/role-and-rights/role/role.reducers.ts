import { Action, createReducer, on } from '@ngrx/store';
import * as RoleAction from './role.actions'
import { RolePayload } from 'src/app/private/models/class-payload-api/role-and-rights/role-payload'

export interface State {
  role : any | null
  isLoadingButton: boolean
  errorMessage : string | null
  reloadTable: boolean;
  isEdit : boolean
}

const initialState: State = {
  role : null,
  isLoadingButton : false,
  errorMessage: null,
  reloadTable: false,
  isEdit: false,
}

const _roleReducer = createReducer(initialState,

  on(RoleAction.addRole, (state, action) => ({...state, isLoadingButton: true, errorMessage: null })),
  on(RoleAction.addRoleSuccess, (state, action) => ({...state, role: action.payload, errorMessage: null })),
  on(RoleAction.addRoleFailure, (state, action) => ({...state, errorMessage: action.message })),

  on(RoleAction.editRole, (state, action) => ({...state, errorMessage: null, isLoadingButton: true, isEdit : false  })),
  on(RoleAction.editRoleSuccess, (state, action) => ({...state, role: action.payload, isLoadingButton: false, isEdit : false })),
  on(RoleAction.editRoleFailure, (state, action) => ({...state, errorMessage: action.message, isLoadingButton: false })),

  on(RoleAction.getRoleById, (state, action) => ({...state, role: new RolePayload, errorMessage: null, isLoadingButton: true, isEdit : false })),
  on(RoleAction.getRoleByIdSuccess, (state, action) => ({...state, role: action.payload, isLoadingButton: false, isEdit: true })),
  on(RoleAction.getRoleByIdFailure, (state, action) => ({...state, errorMessage: action.message, isLoadingButton: false, isEdit : false })),

  on(RoleAction.deleteRole, (state, action) => ({...state, errorMessage: null, role: new RolePayload })),
  on(RoleAction.deleteRoleSuccess, (state, action) => ({...state, role: action.payload, reloadTable: true })),
  on(RoleAction.deleteRoleFailure, (state, action) => ({...state, errorMessage: action.message, reloadTable: false })),
  // on(RoleAction.tableData, (state, action) => ({...state, })),

);

export function RoleReducer(state: State, action: Action): any {
  return _roleReducer(state, action);
}
