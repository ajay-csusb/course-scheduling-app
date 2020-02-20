const url = require('./Utils');

describe('No classes behavior', function () {

  context('When Biology is selected as a subject and Sunday is checked together', () => {
    it('should display message for no classes found', () => {
      cy.visit(url);
      cy.get('.search-autocomplete input').type('Biology').click();
      cy.get('div').contains('Biology', { timeout: 7000 }).click();
      cy.get('.sun > .bp3-control-indicator').click();
      cy.get('.btn-primary').click();
      cy.get('p').should('contain', 'Found 0 classes');
      cy.get('i').should('contain', 'Try refining the search above to get more results');
    });
  });

});
