
import { MenuPayload } from 'src/app/private/models/class-payload-api/manajemen-menu/menu-payload'
import { createAction, props } from '@ngrx/store';

const ADD_MENU = '[MENU] add Menu initial',
ADD_MENU_SUCCESS = '[MENU] add Menu success',
ADD_MENU_FAILURE = '[MENU] add Menu failure',

UPDATE_MENU = '[MENU] update Menu initial',
UPDATE_MENU_SUCCESS = '[MENU] update Menu success',
UPDATE_MENU_FAILURE = '[MENU] update Menu failure',

GET_MENU_BY_ID = '[MENU] get Menu by id initial',
GET_MENU_BY_ID_SUCCESS = '[MENU] get Menu by id success',
GET_MENU_BY_ID_FAILURE = '[MENU] get Menu by id failure',

DELETE_MENU = '[MENU] delete Menu initial',
DELETE_MENU_SUCCESS = '[MENU] delete Menu success',
DELETE_MENU_FAILURE = '[MENU] delete Menu failure',

CLEAR_DATA = '[MENU] clear data',
TABLE_DATA = '[MENU] table data';


export const addMenu = createAction(ADD_MENU, props<{ payload : MenuPayload }>());
export const addMenuSuccess = createAction(ADD_MENU_SUCCESS, props<{ payload : any }>());
export const addMenuFailure = createAction(ADD_MENU_FAILURE, props<{ message : string }>());

export const updateMenu = createAction(UPDATE_MENU, props<{ payload : MenuPayload }>());
export const updateMenuSuccess = createAction(UPDATE_MENU_SUCCESS, props<{ payload : any }>());
export const updateMenuFailure = createAction(UPDATE_MENU_FAILURE, props<{ message : string }>());

export const getMenuById = createAction(GET_MENU_BY_ID, props<{ payload : { id : string } }>());
export const getMenuByIdSuccess = createAction(GET_MENU_BY_ID_SUCCESS, props<{ payload : MenuPayload }>());
export const getMenuByIdFailure = createAction(GET_MENU_BY_ID_FAILURE, props<{ message : string }>());

export const deleteMenu = createAction(DELETE_MENU, props<{ payload : { id: string  } }>());
export const deleteMenuSuccess = createAction(DELETE_MENU_SUCCESS, props<{ payload : any }>());
export const deleteMenuFailure = createAction(DELETE_MENU_FAILURE, props<{ message : string }>());

export const tableData = createAction(TABLE_DATA);
export const clearData = createAction(CLEAR_DATA);
