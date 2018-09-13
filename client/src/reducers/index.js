import { combineReducers } from 'redux';
import authReducer from './authReducer';
import gifReducer from './gifReducer';
import imageReducer from './imageReducer';

const rootReducer = combineReducers({
    auth: authReducer,
    gifs: gifReducer,
    images: imageReducer
});

export default rootReducer;