import configureMockStore from 'redux-mock-store';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import BookDetailContainer from './BookDetailContainer';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { fetchBook } from '../redux/actions/actions';
import { toBeInTheDocument } from '@testing-library/jest-dom';
import store from '../store';

describe('BookDetailContainer', () => {
  it('renders', async () => {
    const props = { match: { params: { id: 2 }}}
    const mock = new MockAdapter(axios);
    
    mock.onGet('http://localhost:8080/books/2').reply(200, {
      name: 'Acceptance test driven development with React', 
      description: 'A book about what the title says',
      id: 2
    });

    const { findByText } = renderWithProvider(<BookDetailContainer {...props} />);
    const book = await findByText('Acceptance test driven development with React');
    expect(book).toBeInTheDocument();
  })

  it('fetch book by id', () => {
    const book = { id: 1, name: 'Refactoring' }
    axios.get = jest.fn().mockImplementation(() => Promise.resolve({ data: book }));
    
    return store
      .dispatch(fetchBook(1)) // arg is book ID
      .then(() => expect(axios.get).toHaveBeenCalledWith('http://localhost:8080/books/1'));
  });
});

const renderWithProvider = (component) => {
  return { ...render(
    <Provider store={store}>
      <Router>{component}</Router>{}
    </Provider>
  )}
};