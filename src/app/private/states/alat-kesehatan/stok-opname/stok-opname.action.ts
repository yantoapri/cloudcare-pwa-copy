
import { StokOpnameAlatPayload } from "src/app/private/models/class-payload-api/gudang-transaksi/stok-opname-payload";
import { createAction, props } from '@ngrx/store';


const ADD_INITIAL = '[STOK OPNAME] add initial',
    ADD_SUCCESS = '[STOK OPNAME] add success',
    ADD_FAILURE = '[STOK OPNAME] add failure ',
    UPDATE_INITIAL = '[STOK OPNAME] update initial',
    UDPATE_SUCCESS = '[STOK OPNAME] update success',
    UPDATE_FAILURE = '[STOK OPNAME] update failure',
    GET_BYID_INITIAL = '[STOK OPNAME] get byid initial',
    GET_BYID_SUCCESS = '[STOK OPNAME] get byid success',
    GET_BYID_FAILURE = '[STOK OPNAME] get byid failure',
    DELETE_INITIAL = '[STOK OPNAME] delete initial',
    DELETE_SUCCESS = '[STOK OPNAME] delete success',
    DELETE_FAILURE = '[STOK OPNAME] delete failure',

    CLEAR_DATA = '[STOK OPNAME] clear data ',
    TABLE_DATA = '[STOK OPNAME] table data';


export const addInitial = createAction(ADD_INITIAL, props<{ payload: StokOpnameAlatPayload, id: any }>());
export const addSuccess = createAction(ADD_SUCCESS, props<{ payload: any }>());
export const addFailure = createAction(ADD_FAILURE, props<{ message: any }>());

export const updateInitial = createAction(UPDATE_INITIAL, props<{ payload: StokOpnameAlatPayload }>());
export const updateSuccess = createAction(UDPATE_SUCCESS, props<{ payload: any }>());
export const updateFailure = createAction(UPDATE_FAILURE, props<{ message: any }>());

export const getByIdInitial = createAction(GET_BYID_INITIAL, props<{ payload: { id: any } }>());
export const getByIdSuccess = createAction(GET_BYID_SUCCESS, props<{ payload: StokOpnameAlatPayload }>());
export const getByIdFailure = createAction(GET_BYID_FAILURE, props<{ message: any }>());

export const deleteInitial = createAction(DELETE_INITIAL, props<{ payload: { id: any } }>());
export const deleteSuccess = createAction(DELETE_SUCCESS, props<{ payload: any }>());
export const deleteFailure = createAction(DELETE_FAILURE, props<{ message: any }>());

export const clearData = createAction(CLEAR_DATA);
export const tableData = createAction(TABLE_DATA);
