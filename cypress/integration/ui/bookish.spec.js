const goToApp = () => cy.visit('http://localhost:3000/');

const checkAppTitle = () => cy.get('h2[data-test="heading"]').contains('Bookish');

const checkBookListWith = (expectation = []) => {
  // We expect there is a container that has the data-test attr of book list
  cy.get('div[data-test="book-list"]').should('exist');
  // Each book item should have the expected titles specified in h2 tags.
  cy.get('div.book-item').should((books) => {
    expect(books).to.have.length(expectation.length);
    const titles = [...books].map((x) => x.querySelector('h2').innerHTML);
    expect(titles).to.deep.equal(expectation);
  });
}

const checkBookDetailWith = (name, id) => {
  cy.get('div.book-item').contains('View Details').eq(0).click(); // clicking on item 0
  cy.url().should('include', `/books/${id}`); // should take us to URL ending in /books/:id
  cy.get('h2.book-title').contains(name); // content should be this
}

const checkSearch = () => {
  cy.get('div.book-item').should('have.length', 4); // initial list length
  cy.get('[data-test="search"] input').type('design'); // search term
  cy.get('div.book-item').should('have.length', 1); // number of expected results
  cy.get('div.book-item').eq(0).contains('Domain-driven design'); // expected result
}

describe('Bookish application', () => {
  beforeEach(() => goToApp());

  // Test if there is a heading element on the page, and the content is Bookish.
  it('visits the bookish page', () => checkAppTitle());

  // Acceptance test for Book List.
  // Make sure the page contains a list of books.
  // Doesn't matter how it's implemented, as long as the list is there.
  it('Shows a book list', () => checkBookListWith([
    'Refactoring',
    'Domain-driven design',
    'Building Microservices',
    'Acceptance Test Driven Development with React'
  ]));

  // Acceptance test for Book Detail view.
  // Clicking on a book from the book list should take the user to a different page.
  // The page should contain content specific to each book (title, image, description, etc.)
  it('Goes to the detail page', () => checkBookDetailWith('Refactoring', 1));

  // Acceptance test for searching books by keyword.
  // Try to type the keyword 'design' into the search input box and
  // expect that only 'Domain-driven design' will show up in the book list.
  it('searches for a title', () => checkSearch());
});