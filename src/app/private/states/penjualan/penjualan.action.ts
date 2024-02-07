import { PenjualanPayload, AddAlatPayload, AddObatPayload } from "src/app/private/models/class-payload-api/gudang-transaksi/penjualan-payload";
import { createAction, props } from '@ngrx/store';
import { ResponseApi } from "src/app/core/models/response-api";

const ADD_INITIAL = '[PENJUALAN] add initial',
    ADD_SUCCESS = '[PENJUALAN] add success',
    ADD_FAILURE = '[PENJUALAN] add failure ',
    UPDATE_INITIAL = '[PENJUALAN] update initial',
    UDPATE_SUCCESS = '[PENJUALAN] update success',
    UPDATE_FAILURE = '[PENJUALAN] update failure',
    GET_BYID_INITIAL = '[PENJUALAN] get byid initial',
    GET_BYID_SUCCESS = '[PENJUALAN] get byid success',
    GET_BYID_FAILURE = '[PENJUALAN] get byid failure',
    DELETE_INITIAL = '[PENJUALAN] delete initial',
    DELETE_SUCCESS = '[PENJUALAN] delete success',
    DELETE_FAILURE = '[PENJUALAN] delete failure',

    ADD_OBAT_INITIAL = '[OBAT] add initial',
    ADD_OBAT_SUCCESS = '[OBAT] add success',
    ADD_OBAT_FAILURE = '[OBAT] add failure ',
    UPDATE_OBAT_INITIAL = '[OBAT] update initial',
    UDPATE_OBAT_SUCCESS = '[OBAT] update success',
    UPDATE_OBAT_FAILURE = '[OBAT] update failure',
    GET_BYID_OBAT_INITIAL = '[OBAT] get byid initial',
    GET_BYID_OBAT_SUCCESS = '[OBAT] get byid success',
    GET_BYID_OBAT_FAILURE = '[OBAT] get byid failure',
    DELETE_OBAT_INITIAL = '[OBAT] delete initial',
    DELETE_OBAT_SUCCESS = '[OBAT] delete success',
    DELETE_OBAT_FAILURE = '[OBAT] delete failure',

    ADD_ALAT_KESEHATAN_INITIAL = '[ALAT KESEHATAN] add initial',
    ADD_ALAT_KESEHATAN_SUCCESS = '[ALAT KESEHATAN] add success',
    ADD_ALAT_KESEHATAN_FAILURE = '[ALAT KESEHATAN] add failure ',
    UPDATE_ALAT_KESEHATAN_INITIAL = '[ALAT KESEHATAN] update initial',
    UDPATE_ALAT_KESEHATAN_SUCCESS = '[ALAT KESEHATAN] update success',
    UPDATE_ALAT_KESEHATAN_FAILURE = '[ALAT KESEHATAN] update failure',
    GET_BYID_ALAT_KESEHATAN_INITIAL = '[ALAT KESEHATAN] get byid initial',
    GET_BYID_ALAT_KESEHATAN_SUCCESS = '[ALAT KESEHATAN] get byid success',
    GET_BYID_ALAT_KESEHATAN_FAILURE = '[ALAT KESEHATAN] get byid failure',
    DELETE_ALAT_KESEHATAN_INITIAL = '[ALAT KESEHATAN] delete initial',
    DELETE_ALAT_KESEHATAN_SUCCESS = '[ALAT KESEHATAN] delete success',
    DELETE_ALAT_KESEHATAN_FAILURE = '[ALAT KESEHATAN] delete failure',

    CLEAR_DATA = '[PENJUALAN] clear data ',
    TABLE_DATA = '[PENJUALAN] table data';


export const addInitial = createAction(ADD_INITIAL);
export const addSuccess = createAction(ADD_SUCCESS, props<{ payload: any }>());
export const addFailure = createAction(ADD_FAILURE, props<{ message: any }>());

export const updateInitial = createAction(UPDATE_INITIAL, props<{ payload: PenjualanPayload, id: string }>());
export const updateSuccess = createAction(UDPATE_SUCCESS, props<{ payload: any, id: string }>());
export const updateFailure = createAction(UPDATE_FAILURE, props<{ message: any }>());

export const getByIdInitial = createAction(GET_BYID_INITIAL, props<{ payload: { id: any } }>());
export const getByIdSuccess = createAction(GET_BYID_SUCCESS, props<{ payload: PenjualanPayload }>());
export const getByIdFailure = createAction(GET_BYID_FAILURE, props<{ message: any }>());

export const deleteInitial = createAction(DELETE_INITIAL, props<{ payload: { id: any } }>());
export const deleteSuccess = createAction(DELETE_SUCCESS, props<{ payload: any }>());
export const deleteFailure = createAction(DELETE_FAILURE, props<{ message: any }>());

// obat
export const addObatInitial = createAction(ADD_OBAT_INITIAL, props<{ payload: AddObatPayload, id: string }>());
export const addObatSuccess = createAction(ADD_OBAT_SUCCESS, props<{ payload: any }>());
export const addObatFailure = createAction(ADD_OBAT_FAILURE, props<{ message: any }>());

export const updateObatInitial = createAction(UPDATE_OBAT_INITIAL, props<{ payload: AddObatPayload, id: string }>());
export const updateObatSuccess = createAction(UDPATE_OBAT_SUCCESS, props<{ payload: any, id: string }>());
export const updateObatFailure = createAction(UPDATE_OBAT_FAILURE, props<{ message: any }>());


export const deleteObatInitial = createAction(DELETE_OBAT_INITIAL, props<{ id: any }>());
export const deleteObatSuccess = createAction(DELETE_OBAT_SUCCESS, props<{ payload: any }>());
export const deleteObatFailure = createAction(DELETE_OBAT_FAILURE, props<{ message: any }>());


// alat
export const addAlatInitial = createAction(ADD_ALAT_KESEHATAN_INITIAL, props<{ payload: AddAlatPayload, id: string }>());
export const addAlatSuccess = createAction(ADD_ALAT_KESEHATAN_SUCCESS, props<{ payload: any }>());
export const addAlatFailure = createAction(ADD_ALAT_KESEHATAN_FAILURE, props<{ message: any }>());

export const updateAlatInitial = createAction(UPDATE_ALAT_KESEHATAN_INITIAL, props<{ payload: AddAlatPayload, id: string }>());
export const updateAlatSuccess = createAction(UDPATE_ALAT_KESEHATAN_SUCCESS, props<{ payload: any, id: string }>());
export const updateAlatFailure = createAction(UPDATE_ALAT_KESEHATAN_FAILURE, props<{ message: any }>());

export const deleteAlatInitial = createAction(DELETE_ALAT_KESEHATAN_INITIAL, props<{ id: any }>());
export const deleteAlatSuccess = createAction(DELETE_ALAT_KESEHATAN_SUCCESS, props<{ payload: any }>());
export const deleteAlatFailure = createAction(DELETE_ALAT_KESEHATAN_FAILURE, props<{ message: any }>());

export const clearData = createAction(CLEAR_DATA);
export const tableData = createAction(TABLE_DATA);
