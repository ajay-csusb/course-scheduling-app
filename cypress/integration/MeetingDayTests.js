const devUrl = 'https://dev-main.csusb.edu/course-schedule';
const localUrl = 'http://localhost:3000/';

describe('Filter classes by meeting day', function () {

  before(function () {
    cy.visit(localUrl);
    cy.get('.search-autocomplete input').type('Biology').click();
    cy.get('div').contains('Biology', { timeout: 15000 }).click();
  });

  context('when a user does not check any days', () => {
    it('should should classes all in-person and online classes', () => {
      cy.get('button').contains('Submit').click();
      cy.wait(10000);
      cy.get('span').should('contain', 'M-W');
      cy.get('span').should('contain', 'Tu-Th');
      cy.get('span').should('contain', 'Meeting Days: N/A');
    });
  });

  context('when a user searches for classes on Monday', () => {
    it('should should classes on Monday', () => {
      cy.get('.mon > .bp3-control-indicator').click();
      cy.get('button').contains('Submit').click();
      cy.wait(10000);
      cy.get('span').should('contain', 'M-W');
      cy.get('span').should('not.contain', 'Tu-Th');
    });
  });

  context('when a user searches for classes on Monday and Tuesday', () => {
    it('should should classes on Monday and Tuesday', () => {
      cy.get('.tue > .bp3-control-indicator').click();
      cy.get('button').contains('Submit').click();
      cy.wait(50000);
      cy.get('span').should('contain', 'M-W');
      cy.get('span').should('contain', 'Tu-Th');
    });
  });

});