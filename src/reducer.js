import {combineReducers} from 'redux';
import authReducer from './reducers/auth.reducer';
import navigateReducer from './reducers/navigate.reducer';
import tabsReducer from './reducers/tab.reducer';
import headerReducer from './reducers/header.reducer';
import changedReducer from './reducers/changed.reducer';

export default combineReducers({
  authReducer,
  navigateReducer,
  tabsReducer,
  headerReducer,
  changedReducer,
});
