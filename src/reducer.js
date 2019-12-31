import {combineReducers} from 'redux';
import authReducer from './reducers/auth.reducer';
import navigateReducer from './reducers/navigate.reducer';
import tabsReducer from './reducers/tab.reducer';

export default combineReducers({
  authReducer,
  navigateReducer,
  tabsReducer,
});
