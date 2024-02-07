
import { defektaAlatPayload } from "src/app/private/models/class-payload-api/alat-kesehatan/defekta-payload";
import { createAction, props } from '@ngrx/store';


const ADD_INITIAL = '[ALAT KESEHATAN] add initial',
    ADD_SUCCESS = '[ALAT KESEHATAN] add success',
    ADD_FAILURE = '[ALAT KESEHATAN] add failure ',
    UPDATE_INITIAL = '[ALAT KESEHATAN] update initial',
    UDPATE_SUCCESS = '[ALAT KESEHATAN] update success',
    UPDATE_FAILURE = '[ALAT KESEHATAN] update failure',
    GET_BYID_INITIAL = '[ALAT KESEHATAN] get byid initial',
    GET_BYID_SUCCESS = '[ALAT KESEHATAN] get byid success',
    GET_BYID_FAILURE = '[ALAT KESEHATAN] get byid failure',
    DELETE_INITIAL = '[ALAT KESEHATAN] delete initial',
    DELETE_SUCCESS = '[ALAT KESEHATAN] delete success',
    DELETE_FAILURE = '[ALAT KESEHATAN] delete failure',

    CLEAR_DATA = '[ALAT KESEHATAN] clear data ',
    TABLE_DATA = '[ALAT KESEHATAN] table data';


export const addInitial = createAction(ADD_INITIAL, props<{ payload: defektaAlatPayload }>());
export const addSuccess = createAction(ADD_SUCCESS, props<{ payload: any }>());
export const addFailure = createAction(ADD_FAILURE, props<{ message: any }>());

export const updateInitial = createAction(UPDATE_INITIAL, props<{ payload: any }>());
export const updateSuccess = createAction(UDPATE_SUCCESS, props<{ payload: any }>());
export const updateFailure = createAction(UPDATE_FAILURE, props<{ message: any }>());

export const getByIdInitial = createAction(GET_BYID_INITIAL, props<{ payload: { id: any } }>());
export const getByIdSuccess = createAction(GET_BYID_SUCCESS, props<{ payload: defektaAlatPayload }>());
export const getByIdFailure = createAction(GET_BYID_FAILURE, props<{ message: any }>());

export const deleteInitial = createAction(DELETE_INITIAL, props<{ payload: { id: any } }>());
export const deleteSuccess = createAction(DELETE_SUCCESS, props<{ payload: any }>());
export const deleteFailure = createAction(DELETE_FAILURE, props<{ message: any }>());

export const clearData = createAction(CLEAR_DATA);
export const tableData = createAction(TABLE_DATA);
