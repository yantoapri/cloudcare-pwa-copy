import * as fromAuth from './login/auth.reducers';


export interface PublicAppState {
  auth: fromAuth.State;
}
