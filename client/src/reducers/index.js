import { combineReducers } from 'redux';
import authReducer from './authReducer';
import gifReducer from './gifReducer';

const rootReducer = combineReducers({
    auth: authReducer,
    gifs: gifReducer
});

export default rootReducer;