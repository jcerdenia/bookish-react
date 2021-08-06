import { createSelector } from 'reselect';

// Takes two args: array of input selectors, and a transform function
export const bookListSelector = createSelector([
  (state) => state.books,
  (state) => state.loading,    
  (state) => state.error,
], (books, loading, error) => ({ books, loading, error }));

export const bookSelector = (state) => state.book;