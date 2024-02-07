import { DaftarKlinikPayload } from 'src/app/private/models/class-payload-api/manajemen-klinik/daftar-klinik-payload'
import { createAction, props } from '@ngrx/store';



const ADD_DAFTAR_KLINIK = '[DAFTAR KLINIK] add initial',
ADD_DAFTAR_KLINIK_SUCCESS = '[DAFTAR KLINIK] add success',
ADD_DAFTAR_KLINIK_FAILURE = '[DAFTAR KLINIK] add failure',

UPDATE_DAFTAR_KLINIK = '[DAFTAR KLINIK] update initial',
UPDATE_DAFTAR_KLINIK_SUCCESS = '[DAFTAR KLINIK] update success',
UPDATE_DAFTAR_KLINIK_FAILURE = '[DAFTAR KLINIK] update failure',

GET_BY_ID_DAFTAR_KLINIK = '[DAFTAR KLINIK] get by id initial',
GET_BY_ID_DAFTAR_KLINIK_SUCCESS = '[DAFTAR KLINIK] get by id success ',
GET_BY_ID_DAFTAR_KLINIK_FAILURE = '[DAFTAR KLINIK] get by id failure',

DELETE_DAFTAR_KLINIK = '[DAFTAR KLINIK] delete initial ',
DELETE_DAFTAR_KLINIK_SUCCESS = '[DAFTAR KLINIK] delete success',
DELETE_DAFTAR_KLINIK_FAILURE = '[DAFTAR KLINIK] delete failure',

CLEAR_DATA = '[DAFTAR KLINIK] CLEAR DATA',
TABLE_DATA = '[DAFTAR KLINIK] RELOAD TABLE DATA'


export const addDaftarKlinik = createAction(ADD_DAFTAR_KLINIK, props<{ payload : DaftarKlinikPayload }>() );
export const addDaftarKlinikSuccess = createAction(ADD_DAFTAR_KLINIK_SUCCESS, props<{ payload : any }>() );
export const addDaftarKlinikFailure = createAction(ADD_DAFTAR_KLINIK_FAILURE, props<{ message : any }>() );

export const updateDaftarKlinik = createAction(UPDATE_DAFTAR_KLINIK, props<{ payload : DaftarKlinikPayload }>() );
export const updateDaftarKlinikSuccess = createAction(UPDATE_DAFTAR_KLINIK_SUCCESS, props<{ payload : any }>() );
export const updateDaftarKlinikFailure = createAction(UPDATE_DAFTAR_KLINIK_FAILURE, props<{ message : any }>() );

export const getByIdDaftarKlinik = createAction(GET_BY_ID_DAFTAR_KLINIK, props<{ payload : { id: any } }>() );
export const getByIdDaftarKlinikSuccess = createAction(GET_BY_ID_DAFTAR_KLINIK_SUCCESS, props<{ payload : any }>() );
export const getByIdDaftarKlinikFailure = createAction(GET_BY_ID_DAFTAR_KLINIK_FAILURE, props<{ message : any }>() );

export const deleteDaftarKlinik = createAction(DELETE_DAFTAR_KLINIK, props<{ payload : { id : any } }>() );
export const deleteDaftarKlinikSuccess = createAction(DELETE_DAFTAR_KLINIK_SUCCESS, props<{ payload : any }>() );
export const deleteDaftarKlinikFailure = createAction(DELETE_DAFTAR_KLINIK_FAILURE, props<{ message : any }>() );

export const tableData = createAction(TABLE_DATA);
export const clearData = createAction(CLEAR_DATA);
