const url = require('./Utils');
describe('Show scroll to top icon', function () {
  context('when a user searches by subject', () => {
    context('and scrolls through the results', () => {
      before(function () {
        cy.visit(url);
        cy.get('.search-autocomplete input').type('Biology').click();
        cy.get('div').contains('Biology', { timeout: 15000 }).click();
        cy.get('.btn-primary').click();
        cy.wait(5000)
      });

      it('then scroll to top icon should be displayed', () => {
        cy.scrollTo(0, 5000, { easing: 'linear'});
        cy.get('#back-to-top').should('be.visible');
      });
    });
  });

});
