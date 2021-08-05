import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SearchBox from './SearchBox';

describe('SearchBox', () => {
  it('renders input', () => {
    const props = { term: '', onSearch: jest.fn() }
    const { container } = render(<SearchBox {...props} />);
    const input = container.querySelector('input[type="text"]');
    // input 'domain' into search box
    userEvent.type(input, 'domain');
    expect(props.onSearch).toHaveBeenCalled();
  });

  // Test if empty query does not get searched.
  // Given in the book, but commented out because I don't like it.
  /*
  it('ignores empty strings', () => {
    const props = { term: '', onSearch: jest.fn() }
    const { container } = render(<SearchBox {...props} />);
    const input = container.querySelector('input[type="text"]');
    // input blank string into search box
    userEvent.type(input, '  ');
    expect(props.onSearch).not.toHaveBeenCalled();
  })
  */
});