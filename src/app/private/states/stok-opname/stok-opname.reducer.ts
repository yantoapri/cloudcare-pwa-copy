import { StokOpnameObatPayload, StokOpnameAlatPayload } from 'src/app/private/models/class-payload-api/gudang-transaksi/stok-opname-payload'
import { Action, createReducer, on } from '@ngrx/store';
import * as StokOpnameActions from './stok-opname.action'




export interface State {
	StokOpname: StokOpnameObatPayload | null
	StokOpnameAlat: StokOpnameAlatPayload
	isLoadingButton: boolean
	errorMessage: any | null
	reloadTable: boolean
	submitButton: boolean
	isEdit: boolean
}
const initialState: State = {
	StokOpname: null,
	StokOpnameAlat: null,
	isLoadingButton: false,
	errorMessage: null,
	reloadTable: false,
	submitButton: false,
	isEdit: false
}

const _StokOpnameReducers = createReducer(
	initialState,

	on(StokOpnameActions.addInitial, (state, action) => ({ ...state, isLoadingButton: true, errorMessage: null, reloadTable: false, isEdit: false })),
	on(StokOpnameActions.addSuccess, (state, action) => ({ ...state, isLoadingButton: false, reloadTable: true, errorMessage: null })),
	on(StokOpnameActions.addFailure, (state, action) => ({ ...state, errorMessage: action.message, reloadTable: false, isLoadingButton: false })),

	on(StokOpnameActions.addTinjauInitial, (state, action) => ({ ...state, isLoadingButton: true, errorMessage: null, reloadTable: false, isEdit: false })),
	on(StokOpnameActions.addTinjauSuccess, (state, action) => ({ ...state, isLoadingButton: false, reloadTable: true, errorMessage: null })),
	on(StokOpnameActions.addTinjauFailure, (state, action) => ({ ...state, errorMessage: action.message, reloadTable: false, isLoadingButton: false })),

	on(StokOpnameActions.updateInitial, (state, action) => ({ ...state, isLoadingButton: true, errorMessage: null, reloadTable: false, isEdit: false })),
	on(StokOpnameActions.updateSuccess, (state, action) => ({ ...state, reloadTable: true, isLoadingButton: false, errorMessage: null })),
	on(StokOpnameActions.updateFailure, (state, action) => ({ ...state, errorMessage: action.message, reloadTable: false, isLoadingButton: false })),

	on(StokOpnameActions.updateTinjauInitial, (state, action) => ({ ...state, isLoadingButton: true, errorMessage: null, reloadTable: false, isEdit: false })),
	on(StokOpnameActions.updateTinjauSuccess, (state, action) => ({ ...state, reloadTable: true, isLoadingButton: false, errorMessage: null })),
	on(StokOpnameActions.updateTinjauFailure, (state, action) => ({ ...state, errorMessage: action.message, reloadTable: false, isLoadingButton: false })),

	on(StokOpnameActions.startInitial, (state, action) => ({ ...state, isLoadingButton: true, errorMessage: null, reloadTable: false, isEdit: false })),
	on(StokOpnameActions.startSuccess, (state, action) => ({ ...state, isLoadingButton: false, reloadTable: true, errorMessage: null })),
	on(StokOpnameActions.startFailure, (state, action) => ({ ...state, errorMessage: action.message, reloadTable: false, isLoadingButton: false })),


	on(StokOpnameActions.finishInitial, (state, action) => ({ ...state, isLoadingButton: true, errorMessage: null, reloadTable: false, isEdit: false })),
	on(StokOpnameActions.finishSuccess, (state, action) => ({ ...state, reloadTable: true, isLoadingButton: false, errorMessage: null })),
	on(StokOpnameActions.finishFailure, (state, action) => ({ ...state, errorMessage: action.message, reloadTable: false, isLoadingButton: false })),

	on(StokOpnameActions.getByIdInitial, (state, action) => ({ ...state, StokOpname: new StokOpnameObatPayload, errorMessage: null, isEdit: false, reloadTable: false })),
	on(StokOpnameActions.getByIdSuccess, (state, action) => ({ ...state, StokOpname: action.payload, isEdit: true, reloadTable: true, errorMessage: null })),
	on(StokOpnameActions.getByIdFailure, (state, action) => ({ ...state, errorMessage: action.message, reloadTable: false, isLoadingButton: false })),


	on(StokOpnameActions.tableData, (state, action) => ({ ...state, StokOpname: new StokOpnameObatPayload, reloadTable: true })),
	on(StokOpnameActions.clearData, (state, action) => ({
		...state,
		StokOpname: new StokOpnameObatPayload,
		isLoadingButton: false,
		errorMessage: null,
		reloadTable: false,
		submitButton: false,
		isEdit: false
	})
	),

	// ----------------alat---------------

	on(StokOpnameActions.addInitialAlat, (state, action) => ({ ...state, isLoadingButton: true, errorMessage: null, reloadTable: false, isEdit: false })),
	on(StokOpnameActions.addSuccessAlat, (state, action) => ({ ...state, isLoadingButton: false, reloadTable: true, errorMessage: null })),
	on(StokOpnameActions.addFailureAlat, (state, action) => ({ ...state, errorMessage: action.message, reloadTable: false, isLoadingButton: false })),

	on(StokOpnameActions.addTinjauInitialAlat, (state, action) => ({ ...state, isLoadingButton: true, errorMessage: null, reloadTable: false, isEdit: false })),
	on(StokOpnameActions.addTinjauSuccessAlat, (state, action) => ({ ...state, isLoadingButton: false, reloadTable: true, errorMessage: null })),
	on(StokOpnameActions.addTinjauFailureAlat, (state, action) => ({ ...state, errorMessage: action.message, reloadTable: false, isLoadingButton: false })),

	on(StokOpnameActions.updateInitialAlat, (state, action) => ({ ...state, isLoadingButton: true, errorMessage: null, reloadTable: false, isEdit: false })),
	on(StokOpnameActions.updateSuccessAlat, (state, action) => ({ ...state, reloadTable: true, isLoadingButton: false, errorMessage: null })),
	on(StokOpnameActions.updateFailureAlat, (state, action) => ({ ...state, errorMessage: action.message, reloadTable: false, isLoadingButton: false })),

	on(StokOpnameActions.updateTinjauInitialAlat, (state, action) => ({ ...state, isLoadingButton: true, errorMessage: null, reloadTable: false, isEdit: false })),
	on(StokOpnameActions.updateTinjauSuccessAlat, (state, action) => ({ ...state, reloadTable: true, isLoadingButton: false, errorMessage: null })),
	on(StokOpnameActions.updateTinjauFailureAlat, (state, action) => ({ ...state, errorMessage: action.message, reloadTable: false, isLoadingButton: false })),

	on(StokOpnameActions.tableDataAlat, (state, action) => ({ ...state, StokOpnameAlat: new StokOpnameAlatPayload, reloadTable: true })),
	on(StokOpnameActions.clearDataAlat, (state, action) => ({
		...state,
		StokOpnameAlat: new StokOpnameAlatPayload,
		isLoadingButton: false,
		errorMessage: null,
		reloadTable: false,
		submitButton: false,
		isEdit: false
	})
	),
)


export function StokOpnameReducers(state: State, action: Action) {
	return _StokOpnameReducers(state, action)
}
