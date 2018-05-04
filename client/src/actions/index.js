import { FETCH_USER, GET_CARDS } from './types';
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

export const publishCard = (title, inputImageURL, name) => async dispatch => {
  let res;
  try {
    res = await axios('/api/publish_card', {
      method: 'post',
      data: { title, inputImageURL, name },
      withCredentials: true
    });
  } catch (err) {
    console.log(err);
    return;
  }
  dispatch({ type: GET_CARDS, payload: res.data });
};

export const getCards = () => async dispatch => {
  let res;
  try {
    res = await axios.get('/api/get_cards');
  } catch (error) {
    console.log(error);
  }
  dispatch({ type: GET_CARDS, payload: res.data });
};

export const likeCard = (cardID, currentUserID) => async dispatch => {
  let res;
  try {
    res = await axios('/api/like_card', {
      method: 'post',
      data: { cardID, currentUserID },
      withCredentials: true
    });
  } catch (err) {
    console.log(err);
    return;
  }
  dispatch({ type: GET_CARDS, payload: res.data });
};

export const unlikeCard = (cardID, currentUserID) => async dispatch => {
  let res;
  try {
    res = await axios('/api/unlike_card', {
      method: 'post',
      data: { cardID, currentUserID },
      withCredentials: true
    });
  } catch (err) {
    console.log(err);
    return;
  }
  dispatch({ type: GET_CARDS, payload: res.data });
};

export const deleteCard = cardID => async dispatch => {
  let res;
  try {
    res = await axios.delete(`/api/delete_card${cardID}`);
  } catch (err) {
    console.log(err);
    return;
  }
  dispatch({ type: GET_CARDS, payload: res.data });
};
