import React from 'react';
import TextField from '@material-ui/core/TextField/TextField';

const SearchBox = ({ term, onSearch }) => {
  const protect = (event) => {
    const value = event.target.value;
    if (value.trim().length > 0) {
      return onSearch(event);
    }
  }

  return (
    <TextField
      label='Search'
      value={term}
      data-test='search'
      onChange={protect}
      margin='normal'
      variant='outlined'
    />
  );
}

export default SearchBox;