const url = require('./Utils');

describe.skip('Reset button behavior', function () {
  describe('Given a class search form', function () {
    describe('When reset button is clicked', function () {
      before(() => {
        cy.visit(url);
        cy.get('.search-autocomplete input').type('Communication Studies').click();
        cy.get('div').contains('Communication Studies', { timeout: 15000 }).click();
        cy.get('.campus-select select').select('Palm Desert');
        cy.get('.btn-primary').click();
        cy.wait(5000);
        cy.get('.btn-secondary').click();
        cy.wait(5000);
      });

      it('should display Summer 2019', () => {
        cy.get('.select-term select option:first').should('be.selected');
      });
    });
  });
});

  // Given a class search form
  // When a user searches for classes in PDC
  //  And clicks Reset
  //  And searches for Art classes
  //  And clicks Submit 
  // Then Art 200 70 should be displayed
  //  And Art 200 80 should be displayed
  //  And Campus: Palm Desert should be displayed
  //  And Campus: San Bernardino should be displayed
describe.skip('Given a class search form', function () {
  describe('When a user searches for classes on PDC campus and then clicks reset', function () {
    before(() => {
      cy.get('.search-autocomplete input').type('All').click();
      cy.get('.bp3-menu').contains('All', { timeout: 25000 }).click();
      cy.visit(url);
      cy.get('.campus-select select').select('Palm Desert');
      cy.get('.btn-primary').click();
      cy.wait(5000);
      cy.get('.btn-secondary').click();
      cy.get('.search-autocomplete input').type('Art').click();
      cy.get('div').contains('Art', { timeout: 15000 }).click();
      cy.get('.btn-primary').click();
      cy.wait(15000);
    });

    it('should display Art classes from San Bernardino campus and Palm Desert campus', () => {
      cy.get('span').contains('Campus: Palm Desert');
      cy.get('span').contains('Campus: San Bernardino');
    });
  });
});