const url = require('./Utils');

describe('Loading message behavior', function () {
  context('When Biology is selected as a subject', () => {
    before(() => {
      cy.visit(url);
      cy.get('.search-autocomplete input').type('Biology').click();
      cy.get('div').contains('Biology', { timeout: 7000 }).click();
      cy.get('.mon > .bp3-control-indicator').click();
      cy.get('.btn-primary').click();
    });

    it('should show loading message', () => {
      cy.get('div').should('contain.class', 'bp3-spinner-animation');
    });

    it('should show loading message if the results are filtered further', () => {
      cy.get('.course-number').type('300');
      cy.get('.btn-primary').click();
      cy.get('.mon > .bp3-control-indicator').click();
      cy.get('div').should('contain.class', 'bp3-spinner-animation');
    });

    it('should show loading message after a search is made where no results are found', () => {
      cy.visit(url);
      cy.get('.search-autocomplete input').type('Biology').click();
      cy.get('div').contains('Biology', { timeout: 7000 }).click();
      cy.get('.sun > .bp3-control-indicator').click();
      cy.get('.btn-primary').click();
      cy.get('.sun > .bp3-control-indicator').click();
      cy.get('.btn-primary').click();
      cy.get('div').should('contain.class', 'bp3-spinner-animation');
    });
  });
});
