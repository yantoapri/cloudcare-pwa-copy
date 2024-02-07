import { MenuRightPayload } from "src/app/private/models/class-payload-api/manajemen-menu/menu-right-payload";
import { createAction, props } from '@ngrx/store';

const ADD_MENU_RIGHT = '[MENU_RIGHT] add Menu_RIGHT initial',
ADD_MENU_RIGHT_SUCCESS = '[MENU_RIGHT] add Menu_RIGHT success',
ADD_MENU_RIGHT_FAILURE = '[MENU_RIGHT] add Menu_RIGHT failure',
UPDATE_MENU_RIGHT = '[MENU_RIGHT] update Menu_RIGHT initial',
UPDATE_MENU_RIGHT_SUCCESS = '[MENU_RIGHT] update Menu_RIGHT success',
UPDATE_MENU_RIGHT_FAILURE = '[MENU_RIGHT] update Menu_RIGHT failure',
GET_MENU_RIGHT_BY_ID = '[MENU_RIGHT] get Menu_RIGHT by id initial',
GET_MENU_RIGHT_BY_ID_SUCCESS = '[MENU_RIGHT] get Menu_RIGHT by id success',
GET_MENU_RIGHT_BY_ID_FAILURE = '[MENU_RIGHT] get Menu_RIGHT by id failure',
DELETE_MENU_RIGHT = '[MENU_RIGHT] delete Menu_RIGHT initial',
DELETE_MENU_RIGHT_SUCCESS = '[MENU_RIGHT] delete Menu_RIGHT success',
DELETE_MENU_RIGHT_FAILURE = '[MENU_RIGHT] delete Menu failure',

CLEAR_DATA = '[MENU] clear data',
TABLE_DATA = '[MENU] table data';

export const addMenuRight = createAction(ADD_MENU_RIGHT, props<{ payload : MenuRightPayload }>() );
export const addMenuSuccess = createAction(ADD_MENU_RIGHT_SUCCESS, props<{ payload : any }>() );
export const addMenuFailure = createAction(ADD_MENU_RIGHT_FAILURE, props<{ message : any }>() );

export const updateMenuRight = createAction(UPDATE_MENU_RIGHT, props<{ payload : MenuRightPayload  }>() );
export const updateMenuRightSuccess = createAction(UPDATE_MENU_RIGHT_SUCCESS, props<{ payload : any }>() );
export const updateMenuRightFailure = createAction(UPDATE_MENU_RIGHT_FAILURE, props<{ message : any }>() );

export const getMenuRightById = createAction(GET_MENU_RIGHT_BY_ID, props<{ payload : { id : any } }>() );
export const getMenuRightByIdSuccess = createAction(GET_MENU_RIGHT_BY_ID_SUCCESS, props<{ payload : any }>() );
export const getMenuRightByIdFailure = createAction(GET_MENU_RIGHT_BY_ID_FAILURE, props<{ message : any }>() );

export const deleteMenuRight = createAction(DELETE_MENU_RIGHT, props<{ payload : { id : any } }>() );
export const deleteMenuRightSuccess = createAction(DELETE_MENU_RIGHT_SUCCESS, props<{ payload : any }>() );
export const deleteMenuRightFailure = createAction(DELETE_MENU_RIGHT_FAILURE, props<{ message : any }>() );

export const tableData = createAction(TABLE_DATA);
export const clearData = createAction(CLEAR_DATA);
