
import { PasienPayload } from "src/app/private/models/class-payload-api/pasien/pasien-payload";
import { createAction, props } from '@ngrx/store';


const ADD_INITIAL = '[PASIEN] add initial',
ADD_SUCCESS = '[PASIEN] add success',
ADD_FAILURE = '[PASIEN] add failure ',
UPDATE_INITIAL = '[PASIEN] update initial',
UDPATE_SUCCESS = '[PASIEN] update success',
UPDATE_FAILURE = '[PASIEN] update failure',
GET_BYID_INITIAL = '[PASIEN] get byid initial',
GET_BYID_SUCCESS = '[PASIEN] get byid success',
GET_BYID_FAILURE = '[PASIEN] get byid failure',
DELETE_INITIAL = '[PASIEN] delete initial',
DELETE_SUCCESS = '[PASIEN] delete success',
DELETE_FAILURE = '[PASIEN] delete failure',

CLEAR_DATA = '[PASIEN] clear data ',
TABLE_DATA = '[PASIEN] table data';


export const addInitial = createAction(ADD_INITIAL, props<{ payload : PasienPayload }>() );
export const addSuccess = createAction(ADD_SUCCESS, props<{ payload: any }>() );
export const addFailure = createAction(ADD_FAILURE, props<{ message : any }>() );

export const updateInitial = createAction(UPDATE_INITIAL, props<{ payload : PasienPayload }>() );
export const updateSuccess = createAction(UDPATE_SUCCESS, props<{ payload: any }>() );
export const updateFailure = createAction(UPDATE_FAILURE, props<{ message : any }>() );

export const getByIdInitial = createAction(GET_BYID_INITIAL, props<{ payload: { id : any } }>() );
export const getByIdSuccess = createAction(GET_BYID_SUCCESS, props<{ payload : PasienPayload }>() );
export const getByIdFailure = createAction(GET_BYID_FAILURE, props<{ message : any }>() );

export const deleteInitial = createAction(DELETE_INITIAL, props<{ payload: { id : any } }>() );
export const deleteSuccess = createAction(DELETE_SUCCESS, props<{ payload : any }>() );
export const deleteFailure = createAction(DELETE_FAILURE, props<{ message : any }>() );

export const clearData = createAction(CLEAR_DATA);
export const tableData = createAction(TABLE_DATA);
