import { DaftarRuangPayload } from "src/app/private/models/class-payload-api/master-data/ruang-dan-jadwal/daftar-ruang-payload";
import { createAction, props } from '@ngrx/store';


const ADD_INITIAL = '[DAFTAR_RUANG] add initial',
ADD_SUCCESS = '[DAFTAR_RUANG] add success',
ADD_FAILURE = '[DAFTAR_RUANG] add failure ',
UPDATE_INITIAL = '[DAFTAR_RUANG] update initial',
UDPATE_SUCCESS = '[DAFTAR_RUANG] update success',
UPDATE_FAILURE = '[DAFTAR_RUANG] update failure',
GET_BYID_INITIAL = '[DAFTAR_RUANG] get byid initial',
GET_BYID_SUCCESS = '[DAFTAR_RUANG] get byid success',
GET_BYID_FAILURE = '[DAFTAR_RUANG] get byid failure',
DELETE_INITIAL = '[DAFTAR_RUANG] delete initial',
DELETE_SUCCESS = '[DAFTAR_RUANG] delete success',
DELETE_FAILURE = '[DAFTAR_RUANG] delete failure',

CLEAR_DATA = '[DAFTAR_RUANG] clear data ',
TABLE_DATA = '[DAFTAR_RUANG] table data';


export const addInitial = createAction(ADD_INITIAL, props<{ payload : DaftarRuangPayload }>() );
export const addSuccess = createAction(ADD_SUCCESS, props<{ payload: any }>() );
export const addFailure = createAction(ADD_FAILURE, props<{ message : any }>() );

export const updateInitial = createAction(UPDATE_INITIAL, props<{ payload : DaftarRuangPayload }>() );
export const updateSuccess = createAction(UDPATE_SUCCESS, props<{ payload: any }>() );
export const updateFailure = createAction(UPDATE_FAILURE, props<{ message : any }>() );

export const getByIdInitial = createAction(GET_BYID_INITIAL, props<{ payload: { id : any } }>() );
export const getByIdSuccess = createAction(GET_BYID_SUCCESS, props<{ payload : DaftarRuangPayload }>() );
export const getByIdFailure = createAction(GET_BYID_FAILURE, props<{ message : any }>() );

export const deleteInitial = createAction(DELETE_INITIAL, props<{ payload: { id : any } }>() );
export const deleteSuccess = createAction(DELETE_SUCCESS, props<{ payload : any }>() );
export const deleteFailure = createAction(DELETE_FAILURE, props<{ message : any }>() );

export const clearData = createAction(CLEAR_DATA);
export const tableData = createAction(TABLE_DATA);
