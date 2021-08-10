import React from 'react';
import ReviewList from './ReviewList';
import BookDetail from '../BookDetail/BookDetail';
import { render } from '@testing-library/react';
import toBeInTheDocument from '@testing-library/jest-dom';
import store from '../store';
import { Provider } from 'react-redux';

describe('ReviewList', () => {
  it('renders an empty list', () => {
    const props = { reviews: [] } // pass in a static (empty) list
    const { container } = renderWithProvider(<ReviewList { ...props} />);
    const reviews = container.querySelector('[data-test="reviews-container"]');
    expect(reviews).toBeInTheDocument();
  });

  it('renders a list when data is passed', () => {
    const props = { reviews: [
      { name: 'Vladimir', date: '2018/07/21', content: 'Excellent work, really impressed by your efforts.' },
      { name: 'Paisios', date: '2018/06/22', content: 'What a great book.' }
    ]};

    const { container } = renderWithProvider(<ReviewList {...props} />);
    const reviews = container.querySelectorAll('[data-test="reviews-container"] .review');
    expect(reviews.length).toBe(2);
    expect(reviews[0].innerHTML).toEqual('Vladimir');
  });

  it('renders reviews', () => {
    const props = { book: { 
      name: 'Refactoring', 
      description: "Martin Fowler's Refactoring defined core ideas and techniques that hundreds of thousands of developers have used to improve their software.",
      reviews: [{ 
        name: 'Vladimir',
        date: '2018/06/21',
        content: 'Nice, well done.'
      }] 
    }}

    const { container } = renderWithProvider(<BookDetail {...props} />);
    const reviews = container.querySelectorAll('[data-test="reviews-container"] .review');
    expect(reviews.length).toBe(1);
    expect(reviews[0].innerHTML).toEqual('Vladimir');
  });
});

const renderWithProvider = (component) => {
  return { ...render(
    <Provider store={store}>{component}</Provider>
  )};
}