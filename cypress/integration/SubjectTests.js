const url = require('./Utils');

describe('Filter classes by subject', function () {

  context('when a user searches by subject', () => {
    before(function () {
      cy.visit(url);
      cy.get('.search-autocomplete input').type('Biology').click();
      cy.get('div').contains('Biology', { timeout: 15000 }).click();
      cy.get('.btn-primary').click();
      cy.wait(15000)
    });

    it('should show Biology classes', () => {
      cy.get('span').should('contain', 'BIOL 100');
      cy.get('span').should('contain', 'BIOL 300');
    });
  });

  context('when a user does not enter asubject', () => {
    before(function () {
      cy.visit(url);
      cy.get('.btn-primary').click();
    });

    it('should show an error message', () => {
      cy.get('div').should('contain', 'Please select a Subject');
    });

    it('should highlight the subject textfield', () => {
      cy.get('input').should('contain.class', 'bp3-intent-danger');
    });
  });

});
