import React from 'react';
import { render } from '@testing-library/react';
import BookDetail from './BookDetail'
import toBeInTheDocument from '@testing-library/jest-dom';
import store from '../store';
import { Provider } from 'react-redux';
 
describe('Book Detail', () => {
  it('renders title', () => {
    const props = { book: { name: 'Refactoring' }};
    const { container } = renderWithProvider(<BookDetail {...props} />);
    const title = container.querySelector('.book-title');
    expect(title.innerHTML).toEqual(props.book.name);
  });

  it('renders description', () => {
    const props = { book: {
      name: 'Refactoring',
      description: "Martin Fowler's Refactoring defined core ideas and techniques that hundreds of thousands of developers have used to improve their software."
    }};

    const { container } = renderWithProvider(<BookDetail {...props} />);
    const description = container.querySelector('p.book-description');
    expect(description.innerHTML).toEqual(props.book.description);
  });

  // Test when props has no description field
  it('displays the book name when no description is given', () => {
    const props = { book: { name: 'Refactoring' }}
    const { container } = renderWithProvider(<BookDetail {...props} />);
    const description = container.querySelector('p.book-description');
    expect(description.innerHTML).toEqual(props.book.name);
  });

  // This test is given in the book, but without the corresponding implementation.
  // It can easily be done, but I don't like it.
  /*
  it('shows *more* link when description is too long', () => {
    const props = { book: {
      name: 'Refactoring',
      description: 'The book about how to do refactoring ....'
    }}

    const { container } = render(<BookDetail { ...props } />);
    const link = container.querySelector('a.show-more');
    const title = container.querySelector('p.book-description');

    expect(link.innerHTML).toEqual('Show more');
    expect(title.innerHTML).toEqual('The book about how to do refactoring ....');
  });
  */

  it('renders review form', () => {
    const props = { book: { 
      name: 'Refactoring',
      description: "Martin Fowler's Refactoring defined core ideas and techniques that hundreds of thousands of developers have used to improve their software."
    }}

    const { container } = renderWithProvider(<BookDetail {...props} />);
    const form = container.querySelector('form');
    const nameInput = container.querySelector('input[name="name"]');
    const contentTextArea = container.querySelector('textarea[name="content"]');
    const submitButton = container.querySelector('button[name="submit"]');

    expect(form).toBeInTheDocument();
    expect(nameInput).toBeInTheDocument();
    expect(contentTextArea).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });
});

const renderWithProvider = (component) => {
  return { ...render(
    <Provider store={store}>{component}</Provider>
  )};
}