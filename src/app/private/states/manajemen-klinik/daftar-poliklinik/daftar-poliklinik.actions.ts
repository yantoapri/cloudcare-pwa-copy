import { DaftarPoliklinikPayload } from 'src/app/private/models/class-payload-api/manajemen-klinik/daftar-poliklinik-payload'
import { createAction, props } from '@ngrx/store';


const ADD_DAFTAR_POLIKLINIK = '[DAFTAR POLIKLINIK] add initial',
ADD_DAFTAR_POLIKLINIK_SUCCESS = '[DAFTAR POLIKLINIK] add success',
ADD_DAFTAR_POLIKLINIK_FAILURE = '[DAFTAR POLIKLINIK] add failure',
UPDATE_DAFTAR_POLIKLINIK = '[DAFTAR POLIKLINIK] update initial',
UPDATE_DAFTAR_POLIKLINIK_SUCCESS = '[DAFTAR POLIKLINIK] update success',
UPDATE_DAFTAR_POLIKLINIK_FAILURE = '[DAFTAR POLIKLINIK] update failure',
GET_BYID_DAFTAR_POLIKLINIK = '[DAFTAR POLIKLINIK] get id initial',
GET_BYID_DAFTAR_POLIKLINIK_SUCCESS = '[DAFTAR POLIKLINIK] get id success',
GET_BYID_DAFTAR_POLIKLINIK_FAILURE = '[DAFTAR POLIKLINIK] get id failure',
DELETE_DAFTAR_POLIKLINIK = '[DAFTAR POLIKLINIK] delete initial',
DELETE_DAFTAR_POLIKLINIK_SUCCESS = '[DAFTAR POLIKLINIK] delete success',
DELETE_DAFTAR_POLIKLINIK_FAILURE = '[DAFTAR POLIKLINIK] delete failure',

CLEAR_DATA = '[DAFTAR POLIKLINIK] CLEAR DATA',
TABLE_DATA = '[DAFTAR POLIKLINIK] RELOAD TABLE DATA';

export const addDaftarPoliklinik = createAction(ADD_DAFTAR_POLIKLINIK, props<{ payload : DaftarPoliklinikPayload }>() );
export const addDaftarPoliklinikSuccess = createAction(ADD_DAFTAR_POLIKLINIK_SUCCESS, props<{ payload : any }>() );
export const addDaftarPoliklinikFailure = createAction(ADD_DAFTAR_POLIKLINIK_FAILURE, props<{ message: any }>() );

export const updateDaftarPoliklinik = createAction(UPDATE_DAFTAR_POLIKLINIK, props<{ payload : DaftarPoliklinikPayload }>() );
export const updateDaftarPoliklinikSuccess = createAction(UPDATE_DAFTAR_POLIKLINIK_SUCCESS, props<{ payload : any }>() );
export const updateDaftarPoliklinikFailure = createAction(UPDATE_DAFTAR_POLIKLINIK_FAILURE, props<{ message: any }>() );

export const getBbyIdDaftarPoliklinik = createAction(GET_BYID_DAFTAR_POLIKLINIK, props<{ payload : { id : any } }>() );
export const getBbyIdDaftarPoliklinikSuccess = createAction(GET_BYID_DAFTAR_POLIKLINIK_SUCCESS, props<{ payload : any }>() );
export const getBbyIdDaftarPoliklinikFailure = createAction(GET_BYID_DAFTAR_POLIKLINIK_FAILURE, props<{ message: any }>() );

export const deleteDaftarPoliklinik = createAction(DELETE_DAFTAR_POLIKLINIK, props<{ payload : { id : any } }>() );
export const deleteDaftarPoliklinikSuccess = createAction(DELETE_DAFTAR_POLIKLINIK_SUCCESS, props<{ payload : any }>() );
export const deleteDaftarPoliklinikFailure = createAction(DELETE_DAFTAR_POLIKLINIK_FAILURE, props<{ message: any }>() );

export const tableData = createAction(TABLE_DATA);
export const clearData = createAction(CLEAR_DATA);

