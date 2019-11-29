import {combineReducers} from 'redux';
import accountReducer from './reducers/account.reducer';
import counterReducer from './reducers/counter.reducer';

export default combineReducers({
  accountReducer,
  counterReducer,
});
