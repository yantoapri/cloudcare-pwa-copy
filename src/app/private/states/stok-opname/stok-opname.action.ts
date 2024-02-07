
import { StokOpnameObatPayload, StokOpnameAlatPayload } from "src/app/private/models/class-payload-api/gudang-transaksi/stok-opname-payload";
import { createAction, props } from '@ngrx/store';


const ADD_INITIAL = '[STOK OPNAME OBAT] add initial',
	ADD_SUCCESS = '[STOK OPNAME OBAT] add success',
	ADD_FAILURE = '[STOK OPNAME OBAT] add failure ',

	ADD_TINJAU_FAILURE = '[STOK OPNAME OBAT TINJAU] add tinjau failure ',
	ADD_TINJAU_INITIAL = '[STOK OPNAME OBAT TINJAU] add tinjau initial',
	ADD_TINJAU_SUCCESS = '[STOK OPNAME OBATTINJAU] add tinjau success',

	START_INITIAL = '[STOK OPNAME OBAT] start initial',
	START_SUCCESS = '[STOK OPNAME OBAT] start success',
	START_FAILURE = '[STOK OPNAME OBAT] start failure ',

	FINISH_INITIAL = '[STOK OPNAME OBAT] finish initial',
	FINISH_SUCCESS = '[STOK OPNAME OBAT] finish success',
	FINISH_FAILURE = '[STOK OPNAME OBAT] finish failure ',

	UPDATE_INITIAL = '[STOK OPNAME OBAT] update initial',
	UDPATE_SUCCESS = '[STOK OPNAME OBAT] update success',
	UPDATE_FAILURE = '[STOK OPNAME OBAT] update failure',

	UPDATE_TINJAU_INITIAL = '[STOK OPNAME OBAT] update initial',
	UDPATE_TINJAU_SUCCESS = '[STOK OPNAME OBAT] update success',
	UPDATE_TINJAU_FAILURE = '[STOK OPNAME OBAT] update failure',

	GET_BYID_INITIAL = '[STOK OPNAME OBAT] get byid initial',
	GET_BYID_SUCCESS = '[STOK OPNAME OBAT] get byid success',
	GET_BYID_FAILURE = '[STOK OPNAME OBAT] get byid failure',
	
	DELETE_INITIAL = '[STOK OPNAME OBAT] delete initial',
	DELETE_SUCCESS = '[STOK OPNAME OBAT] delete success',
	DELETE_FAILURE = '[STOK OPNAME OBAT] delete failure',

	CLEAR_DATA = '[STOK OPNAME OBAT] clear data ',
	TABLE_DATA = '[STOK OPNAME OBAT] table data',

	ADD_INITIAL_ALAT = '[STOK OPNAME ALAT ] add initial',
	ADD_SUCCESS_ALAT = '[STOK OPNAME ALAT ] add success',
	ADD_FAILURE_ALAT = '[STOK OPNAME ALAT ] add failure ',

	ADD_TINJAU_INITIAL_ALAT = '[STOK OPNAME ALAT TINJAU ] add tinjau initial',
	ADD_TINJAU_SUCCESS_ALAT = '[STOK OPNAME ALAT TINJAU ] add tinjau success',
	ADD_TINJAU_FAILURE_ALAT = '[STOK OPNAME ALAT TINJAU] add tinjau failure ',
	
	START_TINJAU_INITIAL = '[STOK OPNAME TINJAU] start initial',
	START_TINJAU_SUCCESS = '[STOK OPNAME TINJAU ] start success',
	START_TINJAU_FAILURE = '[STOK OPNAME TINJAU ] start failure ',

	FINISH_INITIAL_ALAT = '[STOK OPNAME ALAT ] finish initial',
	FINISH_SUCCESS_ALAT = '[STOK OPNAME ALAT ] finish success',
	FINISH_FAILURE_ALAT = '[STOK OPNAME ALAT ] finish failure ',

	UPDATE_INITIAL_ALAT = '[STOK OPNAME ALAT ] update initial',
	UDPATE_SUCCESS_ALAT = '[STOK OPNAME ALAT ] update success',
	UPDATE_FAILURE_ALAT = '[STOK OPNAME ALAT ] update failure',

	UPDATE_TINJAU_INITIAL_ALAT = '[STOK OPNAME ALAT ] update initial',
	UDPATE_TINJAU_SUCCESS_ALAT = '[STOK OPNAME ALAT ] update success',
	UPDATE_TINJAU_FAILURE_ALAT = '[STOK OPNAME ALAT ] update failure',
	GET_BYID_INITIAL_ALAT = '[STOK OPNAME ALAT ] get byid initial',

	GET_BYID_SUCCESS_ALAT = '[STOK OPNAME ALAT ] get byid success',
	GET_BYID_FAILURE_ALAT = '[STOK OPNAME ALAT ] get byid failure',

	DELETE_INITIAL_ALAT = '[STOK OPNAME ALAT ] delete initial',
	DELETE_SUCCESS_ALAT = '[STOK OPNAME ALAT ] delete success',
	DELETE_FAILURE_ALAT = '[STOK OPNAME ALAT ] delete failure',

	CLEAR_DATA_ALAT = '[STOK OPNAME ALAT ] clear data ',
	TABLE_DATA_ALAT = '[STOK OPNAME ALAT ] table data';


export const addInitial = createAction(ADD_INITIAL, props<{ payload: StokOpnameObatPayload, id: any }>());
export const addSuccess = createAction(ADD_SUCCESS, props<{ payload: any }>());
export const addFailure = createAction(ADD_FAILURE, props<{ message: any }>());

export const addTinjauInitial = createAction(ADD_TINJAU_INITIAL, props<{ payload: any, id: any }>());
export const addTinjauSuccess = createAction(ADD_TINJAU_SUCCESS, props<{ payload: any }>());
export const addTinjauFailure = createAction(ADD_TINJAU_FAILURE, props<{ message: any }>());


export const startInitial = createAction(START_INITIAL);
export const startSuccess = createAction(START_SUCCESS, props<{ payload: any }>());
export const startFailure = createAction(START_FAILURE, props<{ message: any }>());


export const updateInitial = createAction(UPDATE_INITIAL, props<{ id: any, payload: StokOpnameObatPayload }>());
export const updateSuccess = createAction(UDPATE_SUCCESS, props<{ payload: any }>());
export const updateFailure = createAction(UPDATE_FAILURE, props<{ message: any }>());

export const updateTinjauInitial = createAction(UPDATE_TINJAU_INITIAL, props<{ id: any, payload: StokOpnameObatPayload }>());
export const updateTinjauSuccess = createAction(UDPATE_TINJAU_SUCCESS, props<{ payload: any }>());
export const updateTinjauFailure = createAction(UPDATE_TINJAU_FAILURE, props<{ message: any }>());

export const finishInitial = createAction(FINISH_INITIAL, props<{ id: any }>());
export const finishSuccess = createAction(FINISH_SUCCESS, props<{ payload: any }>());
export const finishFailure = createAction(FINISH_FAILURE, props<{ message: any }>());

export const getByIdInitial = createAction(GET_BYID_INITIAL, props<{ payload: { id: any } }>());
export const getByIdSuccess = createAction(GET_BYID_SUCCESS, props<{ payload: StokOpnameObatPayload }>());
export const getByIdFailure = createAction(GET_BYID_FAILURE, props<{ message: any }>());

export const deleteInitial = createAction(DELETE_INITIAL, props<{ payload: { id: any } }>());
export const deleteSuccess = createAction(DELETE_SUCCESS, props<{ payload: any }>());
export const deleteFailure = createAction(DELETE_FAILURE, props<{ message: any }>());

export const clearData = createAction(CLEAR_DATA);
export const tableData = createAction(TABLE_DATA);


export const addInitialAlat = createAction(ADD_INITIAL_ALAT, props<{ payload: StokOpnameAlatPayload, id: any }>());
export const addSuccessAlat = createAction(ADD_SUCCESS_ALAT, props<{ payload: any }>());
export const addFailureAlat = createAction(ADD_FAILURE_ALAT, props<{ message: any }>());

export const addTinjauInitialAlat = createAction(ADD_TINJAU_INITIAL_ALAT, props<{ payload: any, id: any }>());
export const addTinjauSuccessAlat = createAction(ADD_TINJAU_SUCCESS_ALAT, props<{ payload: any }>());
export const addTinjauFailureAlat = createAction(ADD_TINJAU_FAILURE_ALAT, props<{ message: any }>());


export const startTinjau = createAction(START_TINJAU_INITIAL);
export const startSuccessTinjau = createAction(START_TINJAU_SUCCESS, props<{ payload: any }>());
export const startFailureTinjau = createAction(START_TINJAU_FAILURE, props<{ message: any }>());


export const updateInitialAlat = createAction(UPDATE_INITIAL_ALAT, props<{ id: any, payload: StokOpnameAlatPayload }>());
export const updateSuccessAlat = createAction(UDPATE_SUCCESS_ALAT, props<{ payload: any }>());
export const updateFailureAlat = createAction(UPDATE_FAILURE_ALAT, props<{ message: any }>());

export const updateTinjauInitialAlat = createAction(UPDATE_TINJAU_INITIAL_ALAT, props<{ id: any, payload: StokOpnameAlatPayload }>());
export const updateTinjauSuccessAlat = createAction(UDPATE_TINJAU_SUCCESS_ALAT, props<{ payload: any }>());
export const updateTinjauFailureAlat = createAction(UPDATE_TINJAU_FAILURE_ALAT, props<{ message: any }>());

export const finishInitialAlat = createAction(FINISH_INITIAL_ALAT, props<{ id: any }>());
export const finishSuccessAlat = createAction(FINISH_SUCCESS_ALAT, props<{ payload: any }>());
export const finishFailureAlat = createAction(FINISH_FAILURE_ALAT, props<{ message: any }>());

export const getByIdInitialAlat = createAction(GET_BYID_INITIAL_ALAT, props<{ payload: { id: any } }>());
export const getByIdSuccessAlat = createAction(GET_BYID_SUCCESS_ALAT, props<{ payload: StokOpnameAlatPayload }>());
export const getByIdFailureAlat = createAction(GET_BYID_FAILURE_ALAT, props<{ message: any }>());

export const deleteInitialAlat = createAction(DELETE_INITIAL_ALAT, props<{ payload: { id: any } }>());
export const deleteSuccessAlat = createAction(DELETE_SUCCESS_ALAT, props<{ payload: any }>());
export const deleteFailureAlat = createAction(DELETE_FAILURE_ALAT, props<{ message: any }>());

export const clearDataAlat = createAction(CLEAR_DATA);
export const tableDataAlat = createAction(TABLE_DATA);
