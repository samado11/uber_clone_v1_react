import { createStore,combineReducers } from 'redux'
import  authReducer  from './authReducer';
import  typeReducer  from './typeReducer';

// const reducers = combineReducers({
//    authReducer
// });

export const store = createStore(authReducer)