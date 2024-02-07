
import { defektaObatPayload } from "src/app/private/models/class-payload-api/obat/obat-defekta";
import { createAction, props } from '@ngrx/store';


const ADD_INITIAL = '[OBAT] add initial',
    ADD_SUCCESS = '[OBAT] add success',
    ADD_FAILURE = '[OBAT] add failure ',
    UPDATE_INITIAL = '[OBAT] update initial',
    UDPATE_SUCCESS = '[OBAT] update success',
    UPDATE_FAILURE = '[OBAT] update failure',
    GET_BYID_INITIAL = '[OBAT] get byid initial',
    GET_BYID_SUCCESS = '[OBAT] get byid success',
    GET_BYID_FAILURE = '[OBAT] get byid failure',
    DELETE_INITIAL = '[OBAT] delete initial',
    DELETE_SUCCESS = '[OBAT] delete success',
    DELETE_FAILURE = '[OBAT] delete failure',

    CLEAR_DATA = '[OBAT] clear data ',
    TABLE_DATA = '[OBAT] table data';


export const addInitial = createAction(ADD_INITIAL, props<{ payload: defektaObatPayload }>());
export const addSuccess = createAction(ADD_SUCCESS, props<{ payload: any }>());
export const addFailure = createAction(ADD_FAILURE, props<{ message: any }>());

export const updateInitial = createAction(UPDATE_INITIAL, props<{ payload: any }>());
export const updateSuccess = createAction(UDPATE_SUCCESS, props<{ payload: any }>());
export const updateFailure = createAction(UPDATE_FAILURE, props<{ message: any }>());

export const getByIdInitial = createAction(GET_BYID_INITIAL, props<{ payload: { id: any } }>());
export const getByIdSuccess = createAction(GET_BYID_SUCCESS, props<{ payload: defektaObatPayload }>());
export const getByIdFailure = createAction(GET_BYID_FAILURE, props<{ message: any }>());

export const deleteInitial = createAction(DELETE_INITIAL, props<{ payload: { id: any } }>());
export const deleteSuccess = createAction(DELETE_SUCCESS, props<{ payload: any }>());
export const deleteFailure = createAction(DELETE_FAILURE, props<{ message: any }>());

export const clearData = createAction(CLEAR_DATA);
export const tableData = createAction(TABLE_DATA);
