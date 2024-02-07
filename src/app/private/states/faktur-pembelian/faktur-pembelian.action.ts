
import { fakturPayload } from "src/app/private/models/class-payload-api/gudang-transaksi/pembelian-payload";
import { createAction, props } from '@ngrx/store';


const ADD_INITIAL = '[RETUR PEMBELIAN] add initial',
    ADD_SUCCESS = '[RETUR PEMBELIAN] add success',
    ADD_FAILURE = '[RETUR PEMBELIAN] add failure ',
    UPDATE_INITIAL = '[RETUR PEMBELIAN] update initial',
    UDPATE_SUCCESS = '[RETUR PEMBELIAN] update success',
    UPDATE_FAILURE = '[RETUR PEMBELIAN] update failure',
    GET_BYID_INITIAL = '[RETUR PEMBELIAN] get byid initial',
    GET_BYID_SUCCESS = '[RETUR PEMBELIAN] get byid success',
    GET_BYID_FAILURE = '[RETUR PEMBELIAN] get byid failure',
    DELETE_INITIAL = '[RETUR PEMBELIAN] delete initial',
    DELETE_SUCCESS = '[RETUR PEMBELIAN] delete success',
    DELETE_FAILURE = '[RETUR PEMBELIAN] delete failure',

    CLEAR_DATA = '[RETUR PEMBELIAN] clear data ',
    TABLE_DATA = '[RETUR PEMBELIAN] table data';


export const addInitial = createAction(ADD_INITIAL, props<{ payload: fakturPayload }>());
export const addSuccess = createAction(ADD_SUCCESS, props<{ payload: any }>());
export const addFailure = createAction(ADD_FAILURE, props<{ message: any }>());

export const updateInitial = createAction(UPDATE_INITIAL, props<{ payload: fakturPayload }>());
export const updateSuccess = createAction(UDPATE_SUCCESS, props<{ payload: any }>());
export const updateFailure = createAction(UPDATE_FAILURE, props<{ message: any }>());

export const getByIdInitial = createAction(GET_BYID_INITIAL, props<{ payload: { id: any } }>());
export const getByIdSuccess = createAction(GET_BYID_SUCCESS, props<{ payload: fakturPayload }>());
export const getByIdFailure = createAction(GET_BYID_FAILURE, props<{ message: any }>());

export const deleteInitial = createAction(DELETE_INITIAL, props<{ payload: { id: any } }>());
export const deleteSuccess = createAction(DELETE_SUCCESS, props<{ payload: any }>());
export const deleteFailure = createAction(DELETE_FAILURE, props<{ message: any }>());

export const clearData = createAction(CLEAR_DATA);
export const tableData = createAction(TABLE_DATA);
