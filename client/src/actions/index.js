import axios from 'axios';
import { FETCH_USER, FETCH_GIFS, FETCH_IMAGES } from './types';

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
    window.location = '/login?error=Either your email or password are incorrect.';
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

// Get /gifs/search
export const gifSearch = (query) => async dispatch => {
  const gifs = await axios.get(`/api/gifs/${query}`);
  dispatch({ type: FETCH_GIFS, payload: gifs.data });
};

// Get /pexels/search
export const imageSearch = (query) => async dispatch => {
  const images = await axios.get(`/api/pexels/${query}`);
  dispatch({ type: FETCH_IMAGES, payload: images.data });
};
