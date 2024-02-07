import { KonsolidasiPayload } from 'src/app/private/models/class-payload-api/rekam-medis/konsolidasi-data/konsolidasi-payload'
import { Action, createReducer, on } from '@ngrx/store';
import * as KonsolidasiActions from './konsolidasi-data.action'




export interface State {
	Konsolidasi: KonsolidasiPayload | null
	isLoadingButton: boolean
	errorMessage: any | null
	reloadTable: boolean
	submitButton: boolean
	isEdit: boolean
}
const initialState: State = {
	Konsolidasi: null,
	isLoadingButton: false,
	errorMessage: null,
	reloadTable: false,
	submitButton: false,
	isEdit: false
}

const _KonsolidasiReducers = createReducer(
	initialState,

	on(KonsolidasiActions.addInitial, (state, action) => ({ ...state, isLoadingButton: true, errorMessage: null, reloadTable: false, isEdit: false })),
	on(KonsolidasiActions.addSuccess, (state, action) => ({ ...state, isLoadingButton: false, reloadTable: false, errorMessage: null })),
	on(KonsolidasiActions.addFailure, (state, action) => ({ ...state, errorMessage: action.message, reloadTable: false, isLoadingButton: false })),

	// on(KonsolidasiActions.updateInitial, (state, action) => ({ ...state, isLoadingButton: true, errorMessage: null, reloadTable: false, isEdit: false })),
	// on(KonsolidasiActions.updateSuccess, (state, action) => ({ ...state, reloadTable: false, isLoadingButton: false, errorMessage: null })),
	// on(KonsolidasiActions.updateFailure, (state, action) => ({ ...state, errorMessage: action.message, reloadTable: false, isLoadingButton: false })),

	// on(KonsolidasiActions.getByIdInitial, (state, action) => ({ ...state, Konsolidasi: new KonsolidasiPayload, errorMessage: null, isEdit: false, reloadTable: false })),
	// on(KonsolidasiActions.getByIdSuccess, (state, action) => ({ ...state, Konsolidasi: action.payload, isEdit: true, reloadTable: false, errorMessage: null })),
	// on(KonsolidasiActions.getByIdFailure, (state, action) => ({ ...state, errorMessage: action.message, reloadTable: false, isLoadingButton: false })),

	// on(KonsolidasiActions.deleteInitial, (state, action) => ({ ...state, Konsolidasi: new KonsolidasiPayload, errorMessage: null, isEdit: false, reloadTable: false })),
	// on(KonsolidasiActions.deleteSuccess, (state, action) => ({ ...state, reloadTable: false, errorMessage: null, isEdit: false })),
	// on(KonsolidasiActions.deleteFailure, (state, action) => ({ ...state, errorMessage: action.message, reloadTable: false, isLoadingButton: false })),

	on(KonsolidasiActions.tableData, (state, action) => ({ ...state, Konsolidasi: new KonsolidasiPayload, reloadTable: true })),
	on(KonsolidasiActions.clearData, (state, action) => ({
		...state,
		Konsolidasi: new KonsolidasiPayload,
		isLoadingButton: false,
		errorMessage: null,
		reloadTable: false,
		submitButton: false,
		isEdit: false
	})
	),
)


export function KonsolidasiReducers(state: State, action: Action) {
	return _KonsolidasiReducers(state, action)
}
