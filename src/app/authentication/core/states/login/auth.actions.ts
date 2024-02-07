import { createAction, props } from '@ngrx/store';

import { User } from '../../models/user';
import { LoginForm } from '../../models/login-form';

export const LOGIN = '[Auth] Login',
  LOGIN_SUCCESS = '[Auth] Login Success',
  LOGIN_FAILURE = '[Auth] Login Failure',
  LOGOUT = '[Auth] Logout',
  GET_STATUS = '[Auth] Get Status',
  CLEAR_DATA = '[Auth] clear data',
  TIME_LOGIN='[Auth] time login';

  export const login_time = createAction(
    TIME_LOGIN,
    props<{
      payload: any
    }>()
  );
export const login = createAction(
  LOGIN,
  props<{
    payload: LoginForm
  }>()
);

export const loginSuccess = createAction(
  LOGIN_SUCCESS,
  // props<any>()
  props<{
    payload: User
  }>()
)

export const loginFailure = createAction(
  LOGIN_FAILURE,
  props<{
    message: string
  }>()
)

export const logout = createAction(LOGOUT)
export const getStatus = createAction(GET_STATUS)
export const clearData = createAction(CLEAR_DATA)
