import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../redux/actions/actions'
import BookList from './BookList';
import SearchBox from './SearchBox';
import { bookListSelector } from '../redux/selectors/selector';

const BookListContainer = () => {
  const dispatch = useDispatch();
  const [term, setTerm] = useState('');
  const { books, loading, error } = useSelector(bookListSelector);
  const onSearch = (event) => setTerm(event.target.value);

  useEffect(() => {
    dispatch(actions.setSearchTerm(term));
    dispatch(actions.fetchBooks());
  }, [term, dispatch]);

  return (
    <>
      <SearchBox term={term} onSearch={onSearch} />
      <BookList books={books} loading={loading} error={error} />
    </>
  );
}

export default BookListContainer;