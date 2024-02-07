import { createAction, props } from '@ngrx/store';


const ADD_INITIAL = '[BIAYA] add initial',
ADD_SUCCESS = '[BIAYA] add success',
ADD_FAILURE = '[BIAYA] add failure ',
UPDATE_INITIAL = '[BIAYA] update initial',
UDPATE_SUCCESS = '[BIAYA] update success',
UPDATE_FAILURE = '[BIAYA] update failure',
GET_BYID_INITIAL = '[BIAYA] get byid initial',
GET_BYID_SUCCESS = '[BIAYA] get byid success',
GET_BYID_FAILURE = '[BIAYA] get byid failure',
DELETE_INITIAL = '[BIAYA] delete initial',
DELETE_SUCCESS = '[BIAYA] delete success',
DELETE_FAILURE = '[BIAYA] delete failure',

CLEAR_DATA = '[BIAYA] clear data ',
TABLE_DATA = '[BIAYA] table data';


export const addInitial = createAction(ADD_INITIAL, props<{ payload : any }>() );
export const addSuccess = createAction(ADD_SUCCESS, props<{ payload: any }>() );
export const addFailure = createAction(ADD_FAILURE, props<{ message : any }>() );

export const updateInitial = createAction(UPDATE_INITIAL, props<{ payload : any }>() );
export const updateSuccess = createAction(UDPATE_SUCCESS, props<{ payload: any }>() );
export const updateFailure = createAction(UPDATE_FAILURE, props<{ message : any }>() );

export const getByIdInitial = createAction(GET_BYID_INITIAL, props<{ payload: { id : any } }>() );
export const getByIdSuccess = createAction(GET_BYID_SUCCESS, props<{ payload : any }>() );
export const getByIdFailure = createAction(GET_BYID_FAILURE, props<{ message : any }>() );

export const deleteInitial = createAction(DELETE_INITIAL, props<{ payload: { id : any } }>() );
export const deleteSuccess = createAction(DELETE_SUCCESS, props<{ payload : any }>() );
export const deleteFailure = createAction(DELETE_FAILURE, props<{ message : any }>() );

export const clearData = createAction(CLEAR_DATA);
export const tableData = createAction(TABLE_DATA);
