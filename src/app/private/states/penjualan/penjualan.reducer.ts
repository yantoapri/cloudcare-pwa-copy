import { Action, createReducer, on } from '@ngrx/store';
import * as PenjualanActions from './penjualan.action'
import { PenjualanPayload, AddObatPayload, AddAlatPayload } from "src/app/private/models/class-payload-api/gudang-transaksi/penjualan-payload";
// import { obatPayload } from '../../models/class-payload-api/gudang-transaksi/pembelian-payload';


export interface State {
    PenjualanPayload: PenjualanPayload | null
    ObatPayload: AddObatPayload | null
    AlatPayload: AddAlatPayload | null
    isLoadingButton: boolean
    errorMessage: any | null
    reloadTable: boolean
    submitButton: boolean
    isEdit: boolean
}

const initialState: State = {
    PenjualanPayload: null,
    ObatPayload: null,
    AlatPayload: null,
    isLoadingButton: false,
    errorMessage: null,
    reloadTable: false,
    submitButton: false,
    isEdit: false
}


const _Penjualan = createReducer(initialState,
    on(PenjualanActions.addInitial, (state, action) => ({ ...state, isLoadingButton: true, errorMessage: null, isEdit: false, reloadTable: false })),
    on(PenjualanActions.addSuccess, (state, action) => ({ ...state, isLoadingButton: true, PenjualanPayload: action.payload, reloadTable: false })),
    on(PenjualanActions.addFailure, (state, action) => ({ ...state, isLoadingButton: false, errorMessage: action.message, isEdit: false, reloadTable: false })),

    on(PenjualanActions.updateInitial, (state, action) => ({ ...state, isLoadingButton: true, errorMessage: null, isEdit: false, reloadTable: false })),
    on(PenjualanActions.updateSuccess, (state, action) => ({ ...state, isLoadingButton: true, PenjualanPayload: action.payload, reloadTable: false })),
    on(PenjualanActions.updateFailure, (state, action) => ({ ...state, isLoadingButton: false, errorMessage: action.message, isEdit: false, reloadTable: false })),

    on(PenjualanActions.getByIdInitial, (state, action) => ({ ...state, isLoadingButton: false, errorMessage: null, isEdit: false, PenjualanPayload: new PenjualanPayload, reloadTable: false })),
    on(PenjualanActions.getByIdSuccess, (state, action) => ({ ...state, isLoadingButton: false, errorMessage: null, isEdit: true, PenjualanPayload: action.payload, reloadTable: false })),
    on(PenjualanActions.getByIdFailure, (state, action) => ({ ...state, isLoadingButton: false, errorMessage: action.message, isEdit: false, reloadTable: false })),

    on(PenjualanActions.deleteInitial, (state, action) => ({ ...state, isLoadingButton: false, errorMessage: null, isEdit: false, reloadTable: false, PenjualanPayload: new PenjualanPayload })),
    on(PenjualanActions.deleteSuccess, (state, action) => ({ ...state, isLoadingButton: false, errorMessage: null, isEdit: false, reloadTable: false })),
    on(PenjualanActions.deleteFailure, (state, action) => ({ ...state, isLoadingButton: false, errorMessage: action.message, isEdit: false, reloadTable: false })),

    on(PenjualanActions.tableData, (state, action) => ({ ...state, reloadTable: true })),
    on(PenjualanActions.clearData, (state, action) => ({ ...state, PenjualanPayload: new PenjualanPayload, errorMessage: null, isEdit: false, reloadTable: false, isLoadingButton: false })),
    // obat-----------------------------------------------------------------------------------
    on(PenjualanActions.addObatInitial, (state, action) => ({ ...state, isLoadingButton: true, errorMessage: null, isEdit: false, reloadTable: false })),
    on(PenjualanActions.addObatSuccess, (state, action) => ({ ...state, isLoadingButton: true, ObatPayload: action.payload, reloadTable: false })),
    on(PenjualanActions.addObatFailure, (state, action) => ({ ...state, isLoadingButton: false, errorMessage: action.message, isEdit: false, reloadTable: false })),

    on(PenjualanActions.updateObatInitial, (state, action) => ({ ...state, isLoadingButton: true, errorMessage: null, isEdit: false, reloadTable: false })),
    on(PenjualanActions.updateObatSuccess, (state, action) => ({ ...state, isLoadingButton: true, ObatPayload: action.payload, reloadTable: false })),
    on(PenjualanActions.updateObatFailure, (state, action) => ({ ...state, isLoadingButton: false, errorMessage: action.message, isEdit: false, reloadTable: false })),

    on(PenjualanActions.deleteObatInitial, (state, action) => ({ ...state, isLoadingButton: false, errorMessage: null, isEdit: false, reloadTable: false, ObatPayload: new AddObatPayload })),
    on(PenjualanActions.deleteObatSuccess, (state, action) => ({ ...state, isLoadingButton: false, errorMessage: null, isEdit: false, reloadTable: false })),
    on(PenjualanActions.deleteObatFailure, (state, action) => ({ ...state, isLoadingButton: false, errorMessage: action.message, isEdit: false, reloadTable: false })),
    // alat--------------------------------------------------------------------------------------------
    on(PenjualanActions.addAlatInitial, (state, action) => ({ ...state, isLoadingButton: true, errorMessage: null, isEdit: false, reloadTable: false })),
    on(PenjualanActions.addAlatSuccess, (state, action) => ({ ...state, isLoadingButton: true, AlatPayload: action.payload, reloadTable: false })),
    on(PenjualanActions.addAlatFailure, (state, action) => ({ ...state, isLoadingButton: false, errorMessage: action.message, isEdit: false, reloadTable: false })),

    on(PenjualanActions.updateAlatInitial, (state, action) => ({ ...state, isLoadingButton: true, errorMessage: null, isEdit: false, reloadTable: false })),
    on(PenjualanActions.updateAlatSuccess, (state, action) => ({ ...state, isLoadingButton: true, AlatPayload: action.payload, reloadTable: false })),
    on(PenjualanActions.updateAlatFailure, (state, action) => ({ ...state, isLoadingButton: false, errorMessage: action.message, isEdit: false, reloadTable: false })),

    on(PenjualanActions.deleteAlatInitial, (state, action) => ({ ...state, isLoadingButton: false, errorMessage: null, isEdit: false, reloadTable: false, AlatPayload: new AddAlatPayload })),
    on(PenjualanActions.deleteAlatSuccess, (state, action) => ({ ...state, isLoadingButton: false, errorMessage: null, isEdit: false, reloadTable: false })),
    on(PenjualanActions.deleteAlatFailure, (state, action) => ({ ...state, isLoadingButton: false, errorMessage: action.message, isEdit: false, reloadTable: false })),
);

export function PenjualanReducers(state: State, action: Action): any {
    return _Penjualan(state, action)
}
