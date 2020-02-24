const { url, selectSubject } = require('./Utils');

describe('Class information displays accurate data', function () {
  context('when a user searches by a subject', () => {
    before(function () {
      cy.visit(url);
      selectSubject();
      cy.get('.btn-primary').click();
    });

    it('class results should not be clickable', () => {
      cy.get('div').should('not.contain.class', 'bp3-interactive');
    });
  });

});
