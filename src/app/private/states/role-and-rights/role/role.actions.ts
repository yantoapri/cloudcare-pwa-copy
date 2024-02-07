import { createAction, props } from '@ngrx/store';
import { RolePayload } from 'src/app/private/models/class-payload-api/role-and-rights/role-payload'
import { ResponseApi } from 'src/app/core/models/response-api'

const ADD_ROLE = '[ROLE] Add Role initial',
ADD_ROLE_SUCCESS= '[ROLE] add role success',
ADD_ROLE_FAILURE = '[ROLE] add role failure',

EDIT_ROLE = '[ROLE] edit role initial',
EDIT_ROLE_SUCCESS = '[ROLE] edit role success',
EDIT_ROLE_FAILURE = '[ROLE] edit role failure ',

GET_ROLE_BY_ID = '[ROLE] get role by id initial',
GET_ROLE_BY_ID_SUCCESS = '[ROLE] get role by id success',
GET_ROLE_BY_ID_FAILURE = '[ROLE] get role by id failure',

DELETE_ROLE = '[ROLE] delete role initial',
DELETE_ROLE_SUCCESS = '[ROLE] delete role success',
DELETE_ROLE_FAILURE = '[ROLE] delete role failure',

TABLE_DATA = '[ROLE] table data';

export const addRole = createAction(ADD_ROLE, props<{ payload : RolePayload }>() );
export const addRoleSuccess = createAction(ADD_ROLE_SUCCESS, props<{ payload : RolePayload }>() );
export const addRoleFailure = createAction(ADD_ROLE_FAILURE, props<{ message : string }>() );

export const editRole = createAction(EDIT_ROLE, props<{ payload : RolePayload }>() );
export const editRoleSuccess = createAction(EDIT_ROLE_SUCCESS, props<{ payload : RolePayload }>() );
export const editRoleFailure = createAction(EDIT_ROLE_FAILURE, props<{ message: string }>() );

export const getRoleById = createAction(GET_ROLE_BY_ID, props<{ payload : { id : any } }>() );
export const getRoleByIdSuccess = createAction(GET_ROLE_BY_ID_SUCCESS, props<{ payload : any }>() );
export const getRoleByIdFailure = createAction(GET_ROLE_BY_ID_FAILURE, props<{ message: string }>() );

export const deleteRole = createAction(DELETE_ROLE, props<{ payload : { id: any } }>() );
export const deleteRoleSuccess = createAction(DELETE_ROLE_SUCCESS, props<{ payload : any }>() );
export const deleteRoleFailure = createAction(DELETE_ROLE_FAILURE, props<{ message : string }>() );

export const tableData = createAction(TABLE_DATA);
