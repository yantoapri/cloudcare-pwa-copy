import { createAction, props } from '@ngrx/store';
// import { TipeRole } from '../../../models/tipe-role'
import { TipeRolePayload } from '../../../models/class-payload-api/role-and-rights/tipe-role-payload'
const ADD_TYPE_ROLE = '[TYPE_ROLE] Add Type Role',
ADD_TYPE_ROLE_SUCCESS = '[TYPE_ROLE] Add Type Role Success',
ADD_TYPE_ROLE_FAILURE = '[TYPE_ROLE] Add Type Role Failure',
TYPE_ROLE_SHOW_MENU = '[TYPE_ROLE] Type Role Show Menu',
EDIT_TYPE_ROLE = '[TYPE_ROLE] Edit type role',
EDIT_TYPE_ROLE_SUCCESS = '[TYPE_ROLE] Edit type role success',
EDIT_TYPE_ROLE_FAILURE = '[TYPE_ROLE] Edit type role failure',
GET_TYPE_ROLE_BY_ID = '[TYPE_ROLE] Get type role by id',
GET_TYPE_ROLE_BY_ID_SUCCESS = '[TYPE_ROLE] Get type role by id success',
GET_TYPE_ROLE_BY_ID_FAILURE = '[TYPE_ROLE] Get type role by id failure',
DELETE_TYPE_ROLE = '[TYPE_ROLE] Delete type role',
DELETE_TYPE_ROLE_SUCCESS = '[TYPE_ROLE] Delete type role success',
DELETE_TYPE_ROLE_FAILURE = '[TYPE_ROLE] Delete type role failure',
TABLE_DATA = '[TYPE_ROLE] Type role table data',
CLEAR_DATA = '[TYPE_ROLE] clear';

export const clearData = createAction(CLEAR_DATA);
export const addTypeRole = createAction(
  ADD_TYPE_ROLE,
  props<{
    payload: TipeRolePayload
  }>()
);

export const addTypeRoleSuccess = createAction(
  ADD_TYPE_ROLE_SUCCESS,
  props<{
    payload: TipeRolePayload
  }>()
);

export const addTypeRoleFailure = createAction(
  ADD_TYPE_ROLE_FAILURE,
  props<{
    message: string
  }>()
);
export const editTypeRole = createAction(
  EDIT_TYPE_ROLE,
  props<{
    payload: TipeRolePayload
  }>()
);

export const editTypeRoleSuccess = createAction(
  EDIT_TYPE_ROLE_SUCCESS,
  props<{
    payload: TipeRolePayload
  }>()
);

export const editTypeRoleFailure = createAction(
  EDIT_TYPE_ROLE_FAILURE,
  props<{
    message: string
  }>()
);

export const getTypeRoleById = createAction(
  GET_TYPE_ROLE_BY_ID,
  props<{
    payload: {
      id: any
    }
  }>()
);

export const getTypeRoleByIdSuccess = createAction(
  GET_TYPE_ROLE_BY_ID_SUCCESS,
  props<{
    payload: TipeRolePayload
  }>()
);

export const getTypeRoleByIdFailure = createAction(
  GET_TYPE_ROLE_BY_ID_FAILURE,
  props<{
    message: string
  }>()
);

export const deleteTypeRole = createAction(
  DELETE_TYPE_ROLE,
  props<{
    payload: {
      id : number
    }
  }>()
);
export const deleteTypeRoleSuccess = createAction(
  DELETE_TYPE_ROLE_SUCCESS,
  props<{
    payload: TipeRolePayload
  }>()
);
export const deleteTypeRoleFailure = createAction(
  DELETE_TYPE_ROLE_FAILURE,
  props<{
    message: string
  }>()
);

export const typeRoleShowMenu = createAction(
  TYPE_ROLE_SHOW_MENU
);

export const tableData = createAction(
  TABLE_DATA
);
