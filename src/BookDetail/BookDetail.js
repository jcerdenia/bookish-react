import React, { useState, useEffect } from 'react';
import ReviewList from '../ReviewList/ReviewList';
import { TextField, Button } from '@material-ui/core';

const BookDetail = ({ book }) => {
  // prevent component from attempting to render with undefined values:
  if (book === undefined) book = emptyBook;

  const [name, setName] = useState('');
  const [content, setContent] = useState('');

  return (
    <div className='detail'>
      <h2 className='book-title'>{book.name}</h2>
      <p className='book-description'>{getDescriptionFor(book)}</p>

      <form noValidate autoComplete='off'>
        <TextField 
          label='Name' 
          name='name' 
          margin='normal' 
          variant='outlined' 
          onChange={(e) => setName(e.target.value)}
        />
        <TextField 
          name='content' 
          label='Content' 
          margin='normal' 
          variant='outlined' 
          multiline 
          maxRows='4' 
          value={content} 
        />
        <Button variant='contained' color='primary' name='submit'>Submit</Button>
      </form>

      {book.reviews && <ReviewList reviews={book.reviews} />}
    </div>
  );
}

// Better to keep this separate from rendering
// as a pure computing function, for better testability.
const getDescriptionFor = (book) => {
  // If book has no description, return name instead.
  return book.description ? book.description : book.name
}

const emptyBook = { name: '', description: '', id: 0 };

export default BookDetail;