
import { returPayload,returResep } from "src/app/private/models/class-payload-api/gudang-transaksi/retur-penjualan-payload";
import { createAction, props } from '@ngrx/store';


const ADD_INITIAL = '[RETUR PENJUALAN] add initial',
    ADD_SUCCESS = '[RETUR PENJUALAN] add success',
    ADD_FAILURE = '[RETUR PENJUALAN] add failure ',
    ADD_RESEP_INITIAL = '[RETUR PENJUALAN] add initial',
    ADD_RESEP_SUCCESS = '[RETUR PENJUALAN] add success',
    ADD_RESEP_FAILURE = '[RETUR PENJUALAN] add failure ',
    UPDATE_INITIAL = '[RETUR PENJUALAN] update initial',
    UDPATE_SUCCESS = '[RETUR PENJUALAN] update success',
    UPDATE_FAILURE = '[RETUR PENJUALAN] update failure',
    GET_BYID_INITIAL = '[RETUR PENJUALAN] get byid initial',
    GET_BYID_SUCCESS = '[RETUR PENJUALAN] get byid success',
    GET_BYID_FAILURE = '[RETUR PENJUALAN] get byid failure',
    DELETE_INITIAL = '[RETUR PENJUALAN] delete initial',
    DELETE_SUCCESS = '[RETUR PENJUALAN] delete success',
    DELETE_FAILURE = '[RETUR PENJUALAN] delete failure',

    CLEAR_DATA = '[RETUR PENJUALAN] clear data ',
    TABLE_DATA = '[RETUR PENJUALAN] table data';


export const addInitial = createAction(ADD_INITIAL, props<{ payload: returPayload }>());
export const addSuccess = createAction(ADD_SUCCESS, props<{ payload: any }>());
export const addFailure = createAction(ADD_FAILURE, props<{ message: any }>());

export const addResepInitial = createAction(ADD_RESEP_INITIAL, props<{ payload: returResep }>());
export const addResepSuccess = createAction(ADD_RESEP_SUCCESS, props<{ payload: any }>());
export const addResepFailure = createAction(ADD_RESEP_FAILURE, props<{ message: any }>());
// export const updateInitial = createAction(UPDATE_INITIAL, props<{ payload: any }>());
// export const updateSuccess = createAction(UDPATE_SUCCESS, props<{ payload: any }>());
// export const updateFailure = createAction(UPDATE_FAILURE, props<{ message: any }>());

export const getByIdInitial = createAction(GET_BYID_INITIAL, props<{ payload: { id: any } }>());
export const getByIdSuccess = createAction(GET_BYID_SUCCESS, props<{ payload: returPayload }>());
export const getByIdFailure = createAction(GET_BYID_FAILURE, props<{ message: any }>());

export const deleteInitial = createAction(DELETE_INITIAL, props<{ payload: { id: any } }>());
export const deleteSuccess = createAction(DELETE_SUCCESS, props<{ payload: any }>());
export const deleteFailure = createAction(DELETE_FAILURE, props<{ message: any }>());

export const clearData = createAction(CLEAR_DATA);
export const tableData = createAction(TABLE_DATA);
