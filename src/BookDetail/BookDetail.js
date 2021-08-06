import React from 'react';

const BookDetail = ({ book }) => {
  // prevent component from attempting to render with undefined values:
  if (book === undefined) book = { name: '', description: '', id: 0 };

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