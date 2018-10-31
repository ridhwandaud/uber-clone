import { combineReducers } from 'redux';
import LoginReducer from './loginReducer';
import LocationReducer from './locationReducer';
export default combineReducers({
  LoginReducer,
  LocationReducer,
}); 