import {combineReducers} from 'redux';
import authReducer from './reducers/auth.reducer';
import incomingReducer from './reducers/incoming.reducer';

export default combineReducers({
  authReducer,
  incomingReducer,
});
