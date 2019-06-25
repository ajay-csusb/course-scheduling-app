const devUrl = 'https://dev-main.csusb.edu/course-schedule';
const localUrl = 'http://localhost:3000/';

describe('Filter classes by degree type', function () {

  context('Given class search form', () => {
    context('when a user searches by degree type', () => {
      context('and Graduate is selected', () => {
        before(function () {
          cy.visit(localUrl);
          cy.get('.select-term select').select('Fall 2019');
          cy.get('.search-autocomplete input').type('Accounting').click();
          cy.wait(5000);
          cy.get('span').contains('ACCT', { timeout: 20000 }).click();
          cy.get('#additional-filters').click();
          cy.get('.course-attribute select').select('Graduate classes');
          cy.get('button').contains('Submit').click();
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
