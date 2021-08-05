import { createSelector } from 'reselect';

// Takes two args: array of input selectors, and a transform function
const bookListSelector = createSelector([
  (state) => state.books,
  (state) => state.loading,    
  (state) => state.error,
], (books, loading, error) => ({ books, loading, error }));

export default bookListSelector;