import { FETCH_IMAGES } from '../actions/types';

export default function(state = null, action) {
  switch (action.type) {
    case FETCH_IMAGES:
      return action.payload || false;
    default:
      return state;
  }
}