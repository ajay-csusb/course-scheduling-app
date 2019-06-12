const devUrl = 'https://dev-main.csusb.edu/course-schedule';
const localUrl = 'http://localhost:3000/';

describe('Filter classes by course attribute', function () {

  context('Given class search form', () => {
    context('when a user searches by subject and GE is selected as course attribute', () => {
      before(function () {
        cy.visit(localUrl);
        cy.get('.search-autocomplete input').type('Biology').click();
        cy.get('div').contains('Biology', { timeout: 15000 }).click();
        cy.get('#additional-filters').click();
        cy.get('.course-attribute select').select('General Education');
        cy.get('button').contains('Submit').click();
        cy.wait(5000);
      });
      assertGeClasses();
    });

    context('when a user searches by subject and followed by GE as course attribute', () => {
      before(function () {
        cy.visit(localUrl);
        cy.get('.search-autocomplete input').type('Biology').click();
        cy.get('div').contains('Biology', { timeout: 15000 }).click();
        cy.get('button').contains('Submit').click();
        cy.wait(5000);
        cy.get('#additional-filters').click();
        cy.get('.course-attribute select').select('General Education');
        cy.get('button').contains('Submit').click();
        cy.wait(5000);
      });
      assertGeClasses();
    });
  });
});

function assertGeClasses() {
  it('should show classes that belong to GE', () => {
    cy.get('span').should('contain', 'BIOL  100 01');
    cy.get('span').should('contain', 'BIOL  100 02');
    cy.get('span').should('contain', 'BIOL  100 03');
    cy.get('span').should('contain', 'BIOL  100 04');
  });
}