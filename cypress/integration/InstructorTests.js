const url = require('./Utils');

describe.skip('Filter classes by instructor', function () {
  // @Todo check if instructor select list loads
  context('when a user searches only by instructor', () => {
    before(function () {
      cy.visit(url);
      cy.get('.search-instructor-autocomplete input').click();
      cy.wait(3000);
      cy.get('a.search-instructor-autocomplete-items div').contains('Liu, Xiang').click();
      cy.get('.btn-primary').click();
      cy.wait(1000);
    });
    it('should show Accounting classes by Liu, Xiang', () => {
      cy.get('a').should('contain', 'Liu, Xiang');
    });
  });

});
