import { Action, createReducer, on } from '@ngrx/store';
import { User as UserClass } from '../../models/user';
import * as AuthActions from './auth.actions';

export interface State {
  // is a user authenticated?
  isAuthenticated: boolean;
  // if authenticated, there should be a user object
  user: UserClass | null;
  // error message
  errorMessage: string | null;
  submitBtn: string;
  isLoadingBtn: boolean;
  time_login:any;
}

const initialState: State = {
  isAuthenticated: false,
  user: null,
  errorMessage: null,
  submitBtn: 'Sign In',
  isLoadingBtn: false,
  time_login:null
};

const _authReducer = createReducer(
  initialState,
  on(
    AuthActions.login_time,
    // AuthActions.loginSuccess,
    (state,action) => ({
      ...state,
      time_login:action.payload
    })
  ),
  on(
    AuthActions.login,
    // AuthActions.loginSuccess,
    (state) => ({
      ...state,
      submitBtn: 'Sign In',
      isLoadingBtn: true
    })
  ),

  on(
    AuthActions.loginSuccess,
    (state, action) => ({
      ...state,
      isAuthenticated: true,
      user: action.payload,
      isLoadingBtn: true,
      errorMessage: null
    })
  ),

  on(
    AuthActions.loginFailure,
    (state, action) => ({
      ...state,
      // errorMessage: 'Incorrect username or password.',
      errorMessage: action.message,
      submitBtn: 'Sign In',
      isLoadingBtn: false,
    })
  ),

  on(
    AuthActions.logout,
    // AuthActions.loginSuccess,
    (state) => ({
      ...state,
      isAuthenticated: false,
      user: new UserClass,
    })
  ),

  on(AuthActions.getStatus,(state) => ({...state})),
  on(AuthActions.clearData,(state)=>({...state, isAuthenticated: false,user: new UserClass, errorMessage: null, submitBtn: 'Sign In', isLoadingBtn: false}))

);


export function authReducer(state: State, action: Action): any {
  return _authReducer(state, action);
}
