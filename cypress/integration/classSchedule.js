import { ContextMenu } from "@blueprintjs/core";

describe('when a user filter by subject(ACCT) and instructor(Liu Xiang)', function () {

  before(() => {
    cy.visit('http://localhost:3000/');
    cy.get('.search-autocomplete input').click();
    cy.get('.search-autocomplete input').type('accounting').click();
    cy.wait(600)
    cy.get('div').contains('Accounting').click();
    cy.get('button').contains('Submit').click();
    cy.wait(900)
    cy.get('.search-instructor-autocomplete input').click();
    cy.wait(300)
    cy.get('a.search-instructor-autocomplete-items div').contains('Liu, Xiang').click();
  });

  it('should show an accounting class by Liu Xiang', function () {
    cy.get('a').should('contain', 'Liu, Xiang');
  });

  it('should not show accounting classes by other professors', function () {
    cy.get('a').should('not.contain', 'Munsif, Vishal');
    cy.get('a').should('not.contain', 'Bazaz, Mohammad');
  });

});

describe('when a user searches all Biology classes', function () {

  before(function () {
      cy.visit('http://localhost:3000/');
      cy.get('.search-autocomplete input').type('Biology').click();
      cy.get('div').contains('Biology').click();
      cy.get('button').contains('Submit').click();
      cy.wait(900)
      cy.get('.start-time > .bp3-timepicker-arrow-row:first-child > .bp3-timepicker-hour:first-child').click();
      cy.get('.start-time > .bp3-timepicker-arrow-row:first-child > .bp3-timepicker-hour:first-child').click();
      cy.get('.start-time select').select('am') 
      cy.get('button').contains('Submit').click();
    });

  context('that start at 10:00 AM', () => {

    it('should not shhow classes before 10 AM', function () {
      cy.get('#class-search-results-component').should('not.contain', '9:00 am');
    });

    it('should show classes after 10 AM', function () {
      cy.get('#class-search-results-component').should('contain', '3:00 pm');
    });

    it('should show online classes', function () {
      cy.get('#class-search-results-component').should('contain', 'Meeting Days: N/A');
    });
  });

  context('and ends at 4:50 PM', () => {

    before(() => {
      cy.get('.end-time input.bp3-timepicker-hour:first-child').type('4');
      cy.get('.end-time input.bp3-timepicker-minute').type('50');
      cy.get('.end-time select').select('pm') 
    });

    it('should not show classes after 4:50 PM', function () {
      cy.get('#class-search-results-component').should('not.contain', '5:50 pm');
    });

    it('should show classes at 4:50 PM or before', function () {
      cy.get('#class-search-results-component').should('contain', '4:50 pm');
    });

    it('should show online classes', function () {
      cy.get('#class-search-results-component').should('contain', 'Meeting Days: N/A');
    });
  });

});
