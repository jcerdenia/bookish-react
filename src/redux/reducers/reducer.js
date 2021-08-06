import * as types from '../types'

// A reducer is responsible for articulating how the app's state
// will change in response to any actions sent to the store.
const reducer = (state = [], action) => {
  switch(action.type) {
    case types.SET_SEARCH_TERM: return { term: action.term }
    case types.FETCH_BOOKS_PENDING: return { ...state, loading: true };
    case types.FETCH_BOOKS_SUCCESS: return { books: action.books };
    case types.FETCH_BOOKS_FAILED: return { ...state, loading: false, error: true };
    case types.FETCH_BOOK_PENDING: return { ...state, loading: true };
    case types.FETCH_BOOK_SUCCESS: return { book: action.book };
    case types.FETCH_BOOK_FAILED: return { ...state, loading: false, error: true }
    default: return state;
  }
}

export default reducer;