import axios from 'axios';

describe('Bookish application', () => {
  // Setup and teardown:
  // Before all of the tests run, send a DELETE request to the db.
  // Then before each test is ran, insert two books into the stub server
  // with a POST request.
  // Finally, after each test, clean up.
  const cleanup = () => {
    return axios
      .delete('http://localhost:8080/books?_cleanup=true')
      .catch((err) => err);
  }

  before(cleanup);

  beforeEach(() => {
    const books = [
      { 'name': 'Refactoring', 'id': 1 },
      { 'name': 'Domain-driven design', 'id': 2 },
      { 'name': 'Building Microservices', 'id': 3 }
    ]

    return books.map((item) => {
      axios.post('http://localhost:8080/books', item, {
        headers: { 'Content-Type': 'application/json' }
      });
    });
  });

  afterEach(cleanup);

  // Test if there is a heading element on the page, and the content is Bookish.
  it('visits the bookish', () => {
    cy.visit('http://localhost:3000/');
    cy.get('h2[data-test="heading"]').contains('Bookish');
  });

  // Acceptance test for Book List.
  // Make sure the page contains a list of books.
  // Doesn't matter how it's implemented, as long as the list is there.
  it('Shows a book list', () => {
    cy.visit('http://localhost:3000/');
    // We expect there is a container that has the data-test attr of book list
    cy.get('div[data-test="book-list"]').should('exist');
    // Each book item should have the given titles specified in h2 tags.
    cy.get('div.book-item').should((books) => {
      expect(books).to.have.length(3);
      
      const titles = [...books].map((x) => x.querySelector('h2').innerHTML);
      expect(titles).to.deep.equal(['Refactoring', 'Domain-driven design', 'Building Microservices']);
    });
  });

  // Acceptance test for Book Detail view.
  // Clicking on a book from the book list should take the user to a different page.
  // The page should contain content specific to each book (title, image, description, etc.)
  it('Goes to the detail page', () =>{
    cy.visit('http://localhost:3000/');
    cy.get('div.book-item').contains('View Details').eq(0).click(); // clicking on item 0
    cy.url().should('include', '/books/1'); // should take us to URL ending in /books/1
    cy.get('h2.book-title').contains('Refactoring'); // content should be this
  });
});