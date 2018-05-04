import { GET_CARDS } from '../actions/types';

export default (state = [], action) => {
  switch (action.type) {
    case GET_CARDS:
      return action.payload || [];
    default:
      return state;
  }
};
