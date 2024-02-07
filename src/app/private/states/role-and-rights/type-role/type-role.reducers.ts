import { Action, createReducer, on } from '@ngrx/store';
import * as TypeRoleActions from './type-role.actions';
// import { TipeRole } from '../../../models/tipe-role'
import { TipeRolePayload } from '../../../models/class-payload-api/role-and-rights/tipe-role-payload'
export interface State {
  typeRole : TipeRolePayload | null
  isLoadingButton: boolean
  errorMessage : string | null
  reloadTable: boolean;
  isEdit : boolean
}

const initialState: State = {
  typeRole : null,
  isLoadingButton : false,
  errorMessage: null,
  reloadTable: false,
  isEdit: false
}
const _typeRoleReducer = createReducer(
  initialState,

  on( TypeRoleActions.addTypeRole, (state) => ({ ...state, isLoadingButton : true }) ),
  on( TypeRoleActions.addTypeRoleSuccess, (state, action) => ({ ...state, typeRole: action.payload, errorMessage: null, isLoadingButton: false })   ),
  on( TypeRoleActions.addTypeRoleFailure, (state, action) => ({ ...state, errorMessage: action.message, isLoadingButton: false })  ),

  on( TypeRoleActions.editTypeRole, (state, action) => ({ ...state, isLoadingButton: true, isEdit : false }) ),
  on( TypeRoleActions.editTypeRoleSuccess, (state, action) => ({ ...state, typeRole : action.payload, errorMessage : null, isLoadingButton: false, isEdit : false }) ),
  on( TypeRoleActions.editTypeRoleFailure, (state, action) => ({ ...state, errorMessage: action.message, isLoadingButton : false, isEdit : false}) ),

  on( TypeRoleActions.getTypeRoleById, (state) => ({ ...state, typeRole : new TipeRolePayload, errorMessage: null, isLoadingButton : false, isEdit : false }) ),
  on( TypeRoleActions.getTypeRoleByIdSuccess, (state, action) => ({ ...state, typeRole : action.payload, errorMessage: null, isLoadingButton: false, isEdit : true  }) ),
  on( TypeRoleActions.getTypeRoleByIdFailure, (state, action) => ({ ...state, errorMessage: action.message, isLoadingButton: false, isEdit : false }) ),

  on( TypeRoleActions.deleteTypeRole, (state, action) => ({ ...state, typeRole : new TipeRolePayload, reloadTable : false }) ),
  on( TypeRoleActions.deleteTypeRoleSuccess, (state, action) => ({ ...state, typeRole : action.payload, errorMessage: null, reloadTable: true }) ),
  on( TypeRoleActions.deleteTypeRoleFailure, (state, action) => ({ ...state, errorMessage: action.message, reloadTable : false }) ),

  on( TypeRoleActions.typeRoleShowMenu, (state, action) => ({ ...state, isLoadingButton: false, }) ),
  on( TypeRoleActions.clearData, (state, action) => ({ ...state, typeRole : new TipeRolePayload, isLoadingButton : false, errorMessage: null, reloadTable: false, isEdit: false }) )

);

export function typeRoleReducer(state: State, action: Action): any {
  return _typeRoleReducer(state, action);
}
