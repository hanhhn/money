import {combineReducers} from 'redux';
import authReducer from './reducers/auth.reducer';
import incomingReducer from './reducers/incoming.reducer';
import outgoingReducer from './reducers/outgoing.reducer';

export default combineReducers({
  authReducer,
  incomingReducer,
  outgoingReducer,
});
