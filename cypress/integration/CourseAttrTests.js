const url = require('./Utils');

describe('Filter classes by course attribute', function () {

  context('Given class search form', () => {
    context('when a user searches by subject and GE is selected as course attribute', () => {
      before(function () {
        cy.visit(url);
        cy.get('.search-autocomplete input').type('Biology').click();
        cy.get('div').contains('Biology', { timeout: 15000 }).click();
        cy.get('#additional-filters').click();
        cy.get('.course-attribute select').select('General Education');
        cy.get('.btn-primary').click();
        cy.wait(20000);
      });
      assertGeClasses();
    });

    context('when a user searches by subject and followed by GE as course attribute', () => {
      before(function () {
        cy.visit(url);
        cy.get('.search-autocomplete input').type('Biology').click();
        cy.get('div').contains('Biology').click();
        cy.get('.btn-primary').click();
        cy.get('#additional-filters').click();
        cy.get('.course-attribute select').select('General Education');
        cy.get('.btn-primary').click();
      });
      assertGeClasses();
    });
  });

  context('When a user searches for Graduate level classes followed by GE classes', () => {
    before(function () {
      cy.visit(url);
      cy.get('.search-autocomplete input').type('Fin').click();
      cy.get('div').contains('Finance').click();
      cy.get('#additional-filters').click();
      cy.get('.course-attribute select').select('Graduate classes');
      cy.get('.btn-primary').click();
      cy.get('span').should('contain', 'FIN 602');
      cy.get('.course-attribute select').select('General Education');
      cy.get('.btn-primary').click();
    });
    it('should show classes that only belong to GE', () => {
      cy.get('span').should('contain', 'FIN 101 02');
    });
  });
});

function assertGeClasses() {
  it('should show classes that belong to GE', () => {
    cy.get('span').should('contain', 'BIOL 100 01');
    cy.get('span').should('contain', 'BIOL 100 02');
    cy.get('span').should('contain', 'BIOL 100 03');
    cy.get('span').should('contain', 'BIOL 100 04');
  });
}