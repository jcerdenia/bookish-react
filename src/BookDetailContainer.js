import React from 'react';
import { useRemoteService } from './hooks'

function BookDetailContainer({ match }) {
  const { data } = useRemoteService(`http://localhost:8080/books/${match.params.id}`, {});
  
  return (
    <div className='detail'>
      <h2 className='book-title'>
        {data.name}
      </h2>
    </div>
  );
}

export default BookDetailContainer;