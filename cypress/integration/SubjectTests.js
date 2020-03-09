const { url, selectSubject } = require('./Utils');

describe('Filter classes by subject', function () {
  context('when a user searches for Biology classes', () => {
    before(function () {
      cy.visit(url);
      selectSubject();
      cy.get('.btn-primary').click();
    });

    it('should show Biology classes', () => {
      cy.get('span').should('contain', 'BIOL 100');
    });
  });

});
