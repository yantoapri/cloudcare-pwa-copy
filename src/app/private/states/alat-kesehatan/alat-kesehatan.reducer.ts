import { AlatKesehatanPayload } from 'src/app/private/models/class-payload-api/alat-kesehatan/alat-kesehatan-payload'
import { Action, createReducer, on } from '@ngrx/store';
import * as AlatKesehatanActions from './alat-kesehatan.action'




export interface State {
    AlatKesehatan: AlatKesehatanPayload | null
    isLoadingButton: boolean
    errorMessage: any | null
    reloadTable: boolean
    submitButton: boolean
    isEdit: boolean
}
const initialState: State = {
    AlatKesehatan: null,
    isLoadingButton: false,
    errorMessage: null,
    reloadTable: false,
    submitButton: false,
    isEdit: false
}

const _AlatKesehatanReducers = createReducer(
    initialState,

    on(AlatKesehatanActions.addInitial, (state, action) => ({ ...state, isLoadingButton: true, errorMessage: null, reloadTable: false, isEdit: false })),
    on(AlatKesehatanActions.addSuccess, (state, action) => ({ ...state, isLoadingButton: false, reloadTable: false, errorMessage: null })),
    on(AlatKesehatanActions.addFailure, (state, action) => ({ ...state, errorMessage: action.message, reloadTable: false, isLoadingButton: false })),

    on(AlatKesehatanActions.updateInitial, (state, action) => ({ ...state, isLoadingButton: true, errorMessage: null, reloadTable: false, isEdit: false })),
    on(AlatKesehatanActions.updateSuccess, (state, action) => ({ ...state, reloadTable: false, isLoadingButton: false, errorMessage: null })),
    on(AlatKesehatanActions.updateFailure, (state, action) => ({ ...state, errorMessage: action.message, reloadTable: false, isLoadingButton: false })),

    on(AlatKesehatanActions.getByIdInitial, (state, action) => ({ ...state, AlatKesehatan: new AlatKesehatanPayload, errorMessage: null, isEdit: false, reloadTable: false })),
    on(AlatKesehatanActions.getByIdSuccess, (state, action) => ({ ...state, AlatKesehatan: action.payload, isEdit: true, reloadTable: false, errorMessage: null })),
    on(AlatKesehatanActions.getByIdFailure, (state, action) => ({ ...state, errorMessage: action.message, reloadTable: false, isLoadingButton: false })),

    on(AlatKesehatanActions.deleteInitial, (state, action) => ({ ...state, AlatKesehatan: new AlatKesehatanPayload, errorMessage: null, isEdit: false, reloadTable: false })),
    on(AlatKesehatanActions.deleteSuccess, (state, action) => ({ ...state, reloadTable: false, errorMessage: null, isEdit: false })),
    on(AlatKesehatanActions.deleteFailure, (state, action) => ({ ...state, errorMessage: action.message, reloadTable: false, isLoadingButton: false })),

    on(AlatKesehatanActions.tableData, (state, action) => ({ ...state, AlatKesehatan: new AlatKesehatanPayload, reloadTable: true })),
    on(AlatKesehatanActions.clearData, (state, action) => ({
        ...state,
        AlatKesehatan: new AlatKesehatanPayload,
        isLoadingButton: false,
        errorMessage: null,
        reloadTable: false,
        submitButton: false,
        isEdit: false
    })
    ),
)


export function AlatKesehatanReducers(state: State, action: Action) {
    return _AlatKesehatanReducers(state, action)
}
