import * as types from '../types'

// A reducer is responsible for articulating how the app's state
// will change in response to any actions sent to the store.
const reducer = (state = [], action) => {
  switch(action.type) {
    case types.FETCH_BOOKS_PENDING: return { ...state, loading: true };
    case types.FETCH_BOOKS_SUCCESS: return { books: action.books };
    default: return state;
  }
}

export default reducer;