import React from 'react';
import { render } from '@testing-library/react';
import BookList from './BookList';

describe('BookList', () => {
  // Test loading state:
  it('loading', () => {
    const props = { loading: true }
    const { container } = render(<BookList { ...props } />);
    const content = container.querySelector('p');
    // Note: Since we are testing the UI, we are concerned with what
    // is actually displayed on screen.
    
  });

  // Test error state:
  it('error', () => {
    const props = { error: true }
    const { container } = render(<BookList { ...props } />);
    const content = container.querySelector('p');
    expect(content.innerHTML).toContain('Error');
  });

  // Test success scenario:
  it('render books', () => {
    const props = {
      books: [
        { 'name': 'Refactoring', 'id': 1 },
        { 'name': 'Domain-driven design', 'id': 2 }
      ]
    };

    const { container } = render(<BookList { ...props } />);
    const titles = [...container.querySelectorAll('h2')].map((x) => x.innerHTML);
    expect(titles).toEqual(['Refactoring', 'Domain-driven design']);
  });
});