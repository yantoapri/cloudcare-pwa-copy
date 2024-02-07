import { fakturPayload } from 'src/app/private/models/class-payload-api/gudang-transaksi/pembelian-payload'
import { Action, createReducer, on } from '@ngrx/store';
import * as fakturPembelianActions from './faktur-pembelian.action'




export interface State {
    fakturPembelian: fakturPayload | null
    isLoadingButton: boolean
    errorMessage: any | null
    reloadTable: boolean
    submitButton: boolean
    isEdit: boolean
}
const initialState: State = {
    fakturPembelian: null,
    isLoadingButton: false,
    errorMessage: null,
    reloadTable: false,
    submitButton: false,
    isEdit: false
}

const _fakturPembelianReducers = createReducer(
    initialState,

    on(fakturPembelianActions.addInitial, (state, action) => ({ ...state, isLoadingButton: true, errorMessage: null, reloadTable: false, isEdit: false })),
    on(fakturPembelianActions.addSuccess, (state, action) => ({ ...state, isLoadingButton: false, reloadTable: false, errorMessage: null })),
    on(fakturPembelianActions.addFailure, (state, action) => ({ ...state, errorMessage: action.message, reloadTable: false, isLoadingButton: false })),

    on(fakturPembelianActions.updateInitial, (state, action) => ({ ...state, isLoadingButton: true, errorMessage: null, reloadTable: false, isEdit: false })),
    on(fakturPembelianActions.updateSuccess, (state, action) => ({ ...state, reloadTable: false, isLoadingButton: false, errorMessage: null })),
    on(fakturPembelianActions.updateFailure, (state, action) => ({ ...state, errorMessage: action.message, reloadTable: false, isLoadingButton: false })),

    on(fakturPembelianActions.getByIdInitial, (state, action) => ({ ...state, fakturPembelian: new fakturPayload, errorMessage: null, isEdit: false, reloadTable: false })),
    on(fakturPembelianActions.getByIdSuccess, (state, action) => ({ ...state, fakturPembelian: action.payload, isEdit: true, reloadTable: false, errorMessage: null })),
    on(fakturPembelianActions.getByIdFailure, (state, action) => ({ ...state, errorMessage: action.message, reloadTable: false, isLoadingButton: false })),

    on(fakturPembelianActions.deleteInitial, (state, action) => ({ ...state, fakturPembelian: new fakturPayload, errorMessage: null, isEdit: false, reloadTable: false })),
    on(fakturPembelianActions.deleteSuccess, (state, action) => ({ ...state, reloadTable: false, errorMessage: null, isEdit: false })),
    on(fakturPembelianActions.deleteFailure, (state, action) => ({ ...state, errorMessage: action.message, reloadTable: false, isLoadingButton: false })),

    on(fakturPembelianActions.tableData, (state, action) => ({ ...state, fakturPembelian: new fakturPayload, reloadTable: true })),
    on(fakturPembelianActions.clearData, (state, action) => ({
        ...state,
        fakturPembelian: new fakturPayload,
        isLoadingButton: false,
        errorMessage: null,
        reloadTable: false,
        submitButton: false,
        isEdit: false
    })
    ),
)


export function fakturPembelianReducers(state: State, action: Action) {
    return _fakturPembelianReducers(state, action)
}
