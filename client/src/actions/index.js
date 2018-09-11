import axios from 'axios';
import { FETCH_USER } from './types';

// GET /api/current_use --- Get the current user
export const fetchUser = () => async dispatch => {
  const res = await axios.get('/api/current_user');
  dispatch({ type: FETCH_USER, payload: res.data });
};

// POST /api/signup --- Signup the user with given credentials
export const signupUser = (email, password, passwordConf, username) => async dispatch => {
  if(password !== passwordConf) {
    return false;
  }
  const newUser = await axios.post('/api/signup', {
    email: email,
    password: password,
    username: username
  })
  .catch(function (error) {
    console.log(error);
  });
  dispatch({ type: FETCH_USER, payload: newUser.data });
};
