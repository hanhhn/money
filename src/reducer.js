import {combineReducers} from 'redux';
import authReducer from './reducers/auth.reducer';
import navigateReducer from './reducers/navigate.reducer';

export default combineReducers({
  authReducer,
  navigateReducer,
});
