import axios from 'axios';
import * as actions from './redux/actions/actions';
import store from './store';

// Integration test connecting action + reducer + store together.
// Demonstrates that all the elements work together to provide the expected outcome.
describe('Store', () => {
  const books = [{ id: 1, name: 'Refactoring' }];
  
  it('Fetch books from remote service', () => {
    axios.get = jest.fn().mockImplementation(() => Promise.resolve({ data: books })); // mock resulting data
    return store
      .dispatch(actions.fetchBooks())
      .then(() => {
        const state = store.getState();
        expect(state.books.length).toEqual(1);
        expect(state.books).toEqual(books);
      });
  });
});