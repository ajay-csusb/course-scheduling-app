const devUrl = 'https://dev-main.csusb.edu/course-schedule';
const localUrl = 'http://localhost:3000/';

describe('Filter classes by subject', function () {
  before(function () {
    cy.visit(localUrl);
    cy.get('.search-autocomplete input').type('Biology').click();
    cy.get('div').contains('Biology', { timeout: 15000 }).click();
    cy.get('button').contains('Submit').click();
    cy.wait(10000)
  });
  context('when a user searches by subject', () => {
    it('should show Biology classes', () => {
      cy.get('span').should('contain', 'BIOL  100');
      cy.get('span').should('contain', 'BIOL  300');
    });
  });

});
