import { FETCH_USER } from './types';
import axios from 'axios';

export const fetchUser = () => async dispatch => {
  let res;
  try {
    res = await axios.get('/api/current_user');
  } catch (error) {
    console.log(error);
  }
  dispatch({ type: FETCH_USER, payload: res.data });
};
