import { ProsesAntreanPerawatPayload } from "src/app/private/models/class-payload-api/perawat/proses-antrean-perawat-payload";
import { createAction, props } from '@ngrx/store';
import { ResponseApi } from "src/app/core/models/response-api";

const ADD_INITIAL = '[PROSES_ANTREAN_PERAWAT] add initial',
ADD_SUCCESS = '[PROSES_ANTREAN_PERAWAT] add success',
ADD_FAILURE = '[PROSES_ANTREAN_PERAWAT] add failure ',
UPDATE_INITIAL = '[PROSES_ANTREAN_PERAWAT] update initial',
UDPATE_SUCCESS = '[PROSES_ANTREAN_PERAWAT] update success',
UPDATE_FAILURE = '[PROSES_ANTREAN_PERAWAT] update failure',
GET_BYID_INITIAL = '[PROSES_ANTREAN_PERAWAT] get byid initial',
GET_BYID_SUCCESS = '[PROSES_ANTREAN_PERAWAT] get byid success',
GET_BYID_FAILURE = '[PROSES_ANTREAN_PERAWAT] get byid failure',
DELETE_INITIAL = '[PROSES_ANTREAN_PERAWAT] delete initial',
DELETE_SUCCESS = '[PROSES_ANTREAN_PERAWAT] delete success',
DELETE_FAILURE = '[PROSES_ANTREAN_PERAWAT] delete failure',

CLEAR_DATA = '[PROSES_ANTREAN_PERAWAT] clear data ',
TABLE_DATA = '[PROSES_ANTREAN_PERAWAT] table data';


export const addInitial = createAction(ADD_INITIAL, props<{ payload : ProsesAntreanPerawatPayload, kode_poli : string }>() );
export const addSuccess = createAction(ADD_SUCCESS, props<{ payload: any, kode_poli : string }>() );
export const addFailure = createAction(ADD_FAILURE, props<{ message : any }>() );

export const updateInitial = createAction(UPDATE_INITIAL, props<{ payload : ProsesAntreanPerawatPayload, kode_poli : string }>() );
export const updateSuccess = createAction(UDPATE_SUCCESS, props<{ payload: any , kode_poli : string}>() );
export const updateFailure = createAction(UPDATE_FAILURE, props<{ message : any }>() );

export const getByIdInitial = createAction(GET_BYID_INITIAL, props<{ payload: { id : any } }>() );
export const getByIdSuccess = createAction(GET_BYID_SUCCESS, props<{ payload : ProsesAntreanPerawatPayload }>() );
export const getByIdFailure = createAction(GET_BYID_FAILURE, props<{ message : any }>() );

export const deleteInitial = createAction(DELETE_INITIAL, props<{ payload: { id : any } }>() );
export const deleteSuccess = createAction(DELETE_SUCCESS, props<{ payload : any }>() );
export const deleteFailure = createAction(DELETE_FAILURE, props<{ message : any }>() );

export const clearData = createAction(CLEAR_DATA);
export const tableData = createAction(TABLE_DATA);
