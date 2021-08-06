import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../redux/actions/actions';
import BookDetail from './BookDetail';
import { bookSelector } from '../redux/selectors/selector'

const BookDetailContainer = ({ match }) => {
  const dispatch = useDispatch();
  const book = useSelector(bookSelector);
  
  useEffect(() => {
    dispatch(actions.fetchBook(match.params.id))
  }, [match.params.id, dispatch]);

  return (<BookDetail book={book} />);
}

export default BookDetailContainer;