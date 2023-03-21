import { combineReducers } from 'redux';
import playerReducer from './playerReducer';

const rootReducer = combineReducers({
  player: playerReducer,
  login,
});

export default rootReducer;
