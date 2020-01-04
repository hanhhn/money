import {combineReducers} from 'redux';
import authReducer from './reducers/auth.reducer';
import headerReducer from './reducers/header.reducer';

export default combineReducers({
  authReducer,
  headerReducer,
});
