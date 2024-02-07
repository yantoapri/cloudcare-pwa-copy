

import { AntreanUmumPayload } from "src/app/private/models/class-payload-api/dokter/antrean-dokter/antrean-umum-payload";
import { createAction, props } from '@ngrx/store';


const ADD_INITIAL = '[ANTREAN DOKTER UMUM] add initial',
ADD_SUCCESS = '[ANTREAN DOKTER UMUM] add success',
ADD_FAILURE = '[ANTREAN DOKTER UMUM] add failure ',

UPDATE_INITIAL = '[ANTREAN DOKTER UMUM] update initial',
UDPATE_SUCCESS = '[ANTREAN DOKTER UMUM] update success',
UPDATE_FAILURE = '[ANTREAN DOKTER UMUM] update failure',

GET_BYID_INITIAL = '[ANTREAN DOKTER UMUM] get byid initial',
GET_BYID_SUCCESS = '[ANTREAN DOKTER UMUM] get byid success',
GET_BYID_FAILURE = '[ANTREAN DOKTER UMUM] get byid failure',

DELETE_INITIAL = '[ANTREAN DOKTER UMUM] delete initial',
DELETE_SUCCESS = '[ANTREAN DOKTER UMUM] delete success',
DELETE_FAILURE = '[ANTREAN DOKTER UMUM] delete failure',

CLEAR_DATA = '[ANTREAN DOKTER UMUM] clear data ',
TABLE_DATA = '[ANTREAN DOKTER UMUM] table data';


export const addInitial = createAction(ADD_INITIAL, props<{ payload : AntreanUmumPayload }>() );
export const addSuccess = createAction(ADD_SUCCESS, props<{ payload: any }>() );
export const addFailure = createAction(ADD_FAILURE, props<{ message : any }>() );

export const updateInitial = createAction(UPDATE_INITIAL, props<{ payload : AntreanUmumPayload }>() );
export const updateSuccess = createAction(UDPATE_SUCCESS, props<{ payload: any }>() );
export const updateFailure = createAction(UPDATE_FAILURE, props<{ message : any }>() );

export const getByIdInitial = createAction(GET_BYID_INITIAL, props<{ payload: { id : string, id_pasien : string } }>() );
export const getByIdSuccess = createAction(GET_BYID_SUCCESS, props<{ payload : any, aksiAntrean : string }>() );
export const getByIdFailure = createAction(GET_BYID_FAILURE, props<{ message : any }>() );

export const deleteInitial = createAction(DELETE_INITIAL, props<{ payload: { id : any } }>() );
export const deleteSuccess = createAction(DELETE_SUCCESS, props<{ payload : any }>() );
export const deleteFailure = createAction(DELETE_FAILURE, props<{ message : any }>() );

export const clearData = createAction(CLEAR_DATA);
export const tableData = createAction(TABLE_DATA);
