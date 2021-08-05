import axios from 'axios';
import * as types from '../types';

// An action creator:
// Will create an action and bind with events from user interaction.
export const setSearchTerm = (term) => {
  // Actions have a 'type' prop that signal the type of action performed;
  // other than that, the structure of an action object is up to us to define.
  return { type: types.SET_SEARCH_TERM, term }
}

export const fetchBooks = () => {
  return (dispatch, getState) => {
    dispatch({ type: types.FETCH_BOOKS_PENDING });
    const state = getState();

    return axios
      .get(`http://localhost:8080/books?q=${state.term || ''}`)
      .then((res) => dispatch({ type: types.FETCH_BOOKS_SUCCESS, books: res.data }))
      .catch((err) => dispatch({ type: types.FETCH_BOOKS_FAILED, err: err.message}));
  }
}