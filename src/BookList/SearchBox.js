import React from 'react';
import TextField from '@material-ui/core/TextField/TextField';
import clone from 'lodash.clone';

const SearchBox = ({ term, onSearch }) => {
  const protectedSearch = (event) => {
    const value = clone(event.target.value);
    if (value !== ' ') {
      onSearch(event);
    }
  }

  return (
    <TextField
      label='Search'
      value={term}
      data-test='search'
      onChange={protectedSearch}
      margin='normal'
      variant='outlined'
    />
  );
}

export default SearchBox;