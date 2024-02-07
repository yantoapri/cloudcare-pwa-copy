
import { createAction, props } from '@ngrx/store';
import { InformasiKlinikPayload } from "src/app/private/models/class-payload-api/manajemen-klinik/informasi-klinik.payload";

const ADD_INITIAL = '[INFO_KLINIK] add initial',
ADD_SUCCESS = '[INFO_KLINIK] add success',
ADD_FAILURE = '[INFO_KLINIK] add failure ',
UPDATE_INITIAL = '[INFO_KLINIK] update initial',
UDPATE_SUCCESS = '[INFO_KLINIK] update success',
UPDATE_FAILURE = '[INFO_KLINIK] update failure',
GET_BYID_INITIAL = '[INFO_KLINIK] get byid initial',
GET_BYID_SUCCESS = '[INFO_KLINIK] get byid success',
GET_BYID_FAILURE = '[INFO_KLINIK] get byid failure',
DELETE_INITIAL = '[INFO_KLINIK] delete initial',
DELETE_SUCCESS = '[INFO_KLINIK] delete success',
DELETE_FAILURE = '[INFO_KLINIK] delete failure',

CLEAR_DATA = '[INFO_KLINIK] clear data ',
TABLE_DATA = '[INFO_KLINIK] table data';




export const updateInitial = createAction(UPDATE_INITIAL, props<{ payload : InformasiKlinikPayload }>() );
export const updateSuccess = createAction(UDPATE_SUCCESS, props<{ payload: any }>() );
export const updateFailure = createAction(UPDATE_FAILURE, props<{ message : any }>() );

export const getByIdInitial = createAction(GET_BYID_INITIAL);
export const getByIdSuccess = createAction(GET_BYID_SUCCESS, props<{ payload : InformasiKlinikPayload }>() );
export const getByIdFailure = createAction(GET_BYID_FAILURE, props<{ message : any }>() );



export const clearData = createAction(CLEAR_DATA);
export const tableData = createAction(TABLE_DATA);
