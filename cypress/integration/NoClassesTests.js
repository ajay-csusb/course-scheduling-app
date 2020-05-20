const { url, submit ,selectSubject } = require('./Utils');

describe('No classes behavior', function () {

  context('When Biology is selected as a subject and Sunday is checked together', () => {
    it('should display message for no classes found', () => {
      cy.visit(url);
      selectSubject();
      cy.get('.sun > .bp3-control-indicator').click();
      submit();
      cy.get('p').should('contain', '0 classes found');
      cy.get('i').should('contain', 'Try refining the search above to get more results');
    });
  });

});
