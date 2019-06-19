const devUrl = 'https://dev-main.csusb.edu/course-schedule';
const localUrl = 'http://localhost:3000/';

describe('Filter classes by course number', function () {

  context('Given class search form', () => {

    context('when a user searches by subject and course number', () => {
      before(function () {
        cy.visit(localUrl);
        cy.get('.search-autocomplete input').type('Biology').click();
        cy.get('div').contains('Biology', { timeout: 15000 }).click();
      });
      assertClassesByClassNumber();
    });

    context('when a user searches subject followed by course number', () => {
      before(function () {
        cy.visit(localUrl);
        cy.get('.search-autocomplete input').type('Biology').click();
        cy.get('div').contains('Biology', { timeout: 15000 }).click();
        cy.get('button').contains('Submit').click();
        cy.wait(10000);
      });
      assertClassesByClassNumber();
    });
  });
});

function assertClassesByClassNumber() {
  before(() => {
    cy.get('.course-number').type('300');
    cy.get('button').contains('Submit').click();
    cy.wait(10000);
  });
  it('should show classes having the course number', () => {
    cy.get('span').should('contain', 'BIOL  300 01');
  });
}