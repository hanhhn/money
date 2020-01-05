import {combineReducers} from 'redux';
import authReducer from './reducers/auth.reducer';
import headerReducer from './reducers/header.reducer';
import outputReducer from './reducers/output.reducer';
import inputReducer from './reducers/input.reducer';

export default combineReducers({
  authReducer,
  headerReducer,
  outputReducer,
  inputReducer,
});
