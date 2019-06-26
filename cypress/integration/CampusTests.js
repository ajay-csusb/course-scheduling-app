const devUrl = 'https://dev-main.csusb.edu/course-schedule';
const localUrl = 'http://localhost:3000/';

describe('Filter classes by campus', function () {

  context('when a user searches for Palm Desert', () => {
    before(function () {
      cy.visit(localUrl);
      cy.get('.search-autocomplete input').type('Communication Studies').click();
      cy.get('div').contains('Communication Studies', { timeout: 15000 }).click();
      cy.get('.campus-select select').select('Palm Desert');
      cy.get('button').contains('Submit').click();
      cy.wait(10000);
    });
    it('should show classes in Palm Desert', () => {
      cy.get('span').should('contain', 'Campus: Palm Desert');
      cy.get('span').should('not.contain', 'Campus: San Bernardino');
    });
  });

  context('when a user searches for San Bernardino', () => {
    before(function () {
      cy.visit(localUrl);
      cy.get('.search-autocomplete input').type('Communication Studies').click();
      cy.get('div').contains('Communication Studies', { timeout: 15000 }).click();
      cy.get('.campus-select select').select('San Bernardino');
      cy.get('button').contains('Submit').click();
      cy.wait(10000);
    });
    it('should show classes in Palm Desert', () => {
      cy.get('span').should('contain', 'Campus: San Bernardino');
      cy.get('span').should('not.contain', 'Campus: Palm Desert');
    });
  });

  context('when a user searches for classes on both campus', () => {
    before(function () {
      cy.visit(localUrl);
      cy.get('.search-autocomplete input').type('Communication Studies').click();
      cy.get('div').contains('Communication Studies', { timeout: 15000 }).click();
      cy.get('button').contains('Submit').click();
      cy.wait(10000);
      cy.get('.campus-select select').select('Both');
      cy.get('button').contains('Submit').click();
      cy.wait(10000);
    });
    it('should show classes on San Bernardino and Palm Desert campus', () => {
      cy.get('span').should('contain', 'Campus: Palm Desert');
      cy.get('span').should('contain', 'Campus: San Bernardino');
    });
  });

});
