const url = require('./Utils');

describe.skip('Show classes that are open', function () {
  context('when a user searches for open classes related to Biology', () => {
    before(function () {
      cy.visit(url);
      cy.get('.search-autocomplete input').type('Biology').click();
      cy.get('div').contains('Biology').click();
      cy.get('.open-classes > input').click();
      cy.get('.btn-primary').click();
    });
    assertOpenBioClasses();
  });

  function assertOpenBioClasses() {
    it('should show BIO 100', () => {
      cy.get('span').should('contain', 'BIOL');
    });
  }
});
