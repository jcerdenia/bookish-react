import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import { setSearchTerm, fetchBooks } from './actions';
import * as types from '../types';

const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe('BookListContainer related actions', () => {
  // Assert that when a search term is provided to setSearchTerm,
  // the action will be created.
  it('sets the search keyword', () => {
    const term = '';
    const expected = { type: types.SET_SEARCH_TERM, term }
    const action = setSearchTerm(term);
    expect(action).toEqual(expected);
  });

  // Success scenario
  it('fetches data successfully', () => {
    const books = [
      { id: 1, name: 'Refactoring' },
      { id: 2, name: 'Domain-driven design' }
    ];

    // Stub an API call:
    axios.get = jest.fn().mockImplementation(() => Promise.resolve({ data: books }));
    // we expect fetchBooks to create two actions:
    const expectedActions = [
      { type: types.FETCH_BOOKS_PENDING }, // indicates request has been sent
      { type: types.FETCH_BOOKS_SUCCESS, books } // indicates response has been received
    ];

    const store = mockStore({ books: [] });
    return store
      .dispatch(fetchBooks())
      .then(() => expect(store.getActions()).toEqual(expectedActions));
  });

  // Failure scenario
  it('fetches data with error', () => {
    axios.get = jest.fn().mockImplementation(() => Promise.reject({ message: 'Something went wrong' }));
    const expectedActions = [
      { type: types.FETCH_BOOKS_PENDING },
      { type: types.FETCH_BOOKS_FAILED, err: 'Something went wrong' }
    ];

    const store = mockStore({ books: [] });
    return store
      .dispatch(fetchBooks())
      .then(() => expect(store.getActions()).toEqual(expectedActions));
  });

  it('performs a search', () => {
    axios.get = jest.fn().mockImplementation(() => Promise.resolve());
    // Fetch data from store:
    const store = mockStore({ books: [] , term: 'domain' });

    return store
      .dispatch(fetchBooks())
      .then(() => {
        const state = store.getState();
        expect(state.term).toEqual('domain');
        expect(axios.get).toHaveBeenCalledWith('http://localhost:8080/books?q=domain');
      });
  })
});