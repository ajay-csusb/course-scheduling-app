const url = require('./Utils');

describe('Filter classes by course number', function () {

  context('Given class search form', () => {
    context('when a user searches only by course number', () => {
      before(function () {
        cy.visit(url);
        cy.get('.btn-primary').click();
        cy.wait(100);
      });
      assertClassesByClassNumber();
    });

    context('when a user searches by subject and course number', () => {
      before(function () {
        cy.visit(url);
        cy.get('.search-autocomplete input').type('Biology').click();
        cy.get('div').contains('Biology', { timeout: 15000 }).click();
      });
      assertClassesByClassNumber();
    });

    context('when a user searches subject followed by course number', () => {
      before(function () {
        cy.visit(url);
        cy.get('.search-autocomplete input').type('Biology').click();
        cy.get('div').contains('Biology', { timeout: 15000 }).click();
        cy.get('.btn-primary').click();
        cy.wait(1000);
      });
      assertClassesByClassNumber();
    });
  });
});

function assertClassesByClassNumber() {
  before(() => {
    cy.get('.course-number').type('300');
    cy.get('.btn-primary').click();
    cy.wait(1000);
  });
  it('should show classes having the course number', () => {
    cy.get('span').should('contain', 'BIOL 300 01');
  });
}