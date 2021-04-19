const { url, selectSubject} = require('./Utils');

describe('Loading message behavior', function () {
  context('When Biology is selected as a subject', () => {
    before(() => {
      cy.visit(url);
      cy.get("#term").select('Fall 2019')
      cy.get('.search-autocomplete input').type('Biology').click();
      cy.get('div').contains('Biology').click();
      cy.get('.mon > .bp3-control-indicator').click();
      cy.get('.btn-primary').click();
    });

    it('should show loading message', () => {
      cy.get('div').should('contain.class', 'bp3-progress-bar');
    });

  it.skip('should show loading message if the results are filtered further', () => {
      selectSubject('English');
      cy.get('.btn-primary').click();
      cy.get('.mon > .bp3-control-indicator').click();
      cy.get('div').should('contain.class', 'bp3-progress-bar');
    });

    it.skip('should show loading message after a search is made where no results are found', () => {
      cy.get("#term").select('Spring 2021')
      cy.get('.search-autocomplete input').type('Biology').click();
      cy.get('div').contains('Biology', { timeout: 700 }).click();
      cy.get('.sun > .bp3-control-indicator').click();
      cy.get('.btn-primary').click();
      cy.get('.sun > .bp3-control-indicator').click();
      cy.get('.btn-primary').click();
      cy.get('div').should('contain.class', 'bp3-progress-bar');
    });
  });
});
