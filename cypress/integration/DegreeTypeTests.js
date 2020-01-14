const url = require('./Utils');

describe('Filter classes by degree type', function () {

  context('Given class search form', () => {
    context('when a user searches by degree type', () => {
      context('and Graduate is selected', () => {
        before(function () {
          cy.visit(url);
          cy.get('.search-autocomplete input').type('Accounting').click();
          cy.wait(5000);
          cy.get('span').contains('ACCT', { timeout: 20000 }).click();
          cy.get('#additional-filters').click();
          cy.get('.course-attribute select').select('Graduate classes');
          cy.get('.btn-primary').click();
          cy.wait(10000);
        });

        it('should show graduate level classes', () => {
          cy.get('span').should('contain', 'Graduate');
        });

        it('should not show undergraduate level classes', () => {
          cy.get('span').should('not.contain', 'Undergraduate');
        });
      });
    });
  });
});
