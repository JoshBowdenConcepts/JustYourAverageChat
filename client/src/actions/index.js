import axios from 'axios';
import { FETCH_USER } from './types';

// GET /api/current_use --- Get the current user
export const fetchUser = () => async dispatch => {
  const res = await axios.get('/api/current_user');
  dispatch({ type: FETCH_USER, payload: res.data });
};

// POST /api/login --- Login the user with provided credentials
export const loginUser = (email, password) => async dispatch => {
  const user = await axios.post('/api/login', {
    email: email,
    password: password
  })
  .catch(function (error) {
    console.log(error);
  });
  console.log(`This is the user returned to actions ${user}`);
  if (user) {
    dispatch({ type: FETCH_USER, payload: user.data });
  } else {
    dispatch({ type: FETCH_USER, payload: user });
    let hostname = window.location.hostname;
    hostname += '?error=Either your email or password are incorrect.';
    window.location = hostname;
  }
  
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
