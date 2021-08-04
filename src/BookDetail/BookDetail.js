import React from 'react';

function BookDetail({ book }) {
  return (
    <div className='detail'>
      <h2 className='book-title'>{book.name}</h2>
      <p className='book-description'>{getDescriptionFor(book)}</p>
    </div>
  );
}

// Better to keep this separate from rendering
// as a pure computing function, for better testability.
const getDescriptionFor = (book) => {
  // If book has no description, return name instead.
  return book.description ? book.description : book.name
}

export default BookDetail;