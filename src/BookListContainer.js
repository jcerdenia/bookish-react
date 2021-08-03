import React from 'react';
import BookList from './BookList';
import { useRemoteService } from './hook';

function BookListContainer() {
  const { data, loading, error } = useRemoteService([]);

  /*
  if (loading) {
    return <p>Loading...</p>
  }

  if (error) {
    return <p>Error...</p>
  }
  */

  return <BookList books={data} />
}

export default BookListContainer;