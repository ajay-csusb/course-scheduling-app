import { ContextMenu } from "@blueprintjs/core";

describe('when a user filter by subject(ACCT) and instructor(Liu Xiang)', function () {

  before(() => {
    cy.visit('http://localhost:3000/');
    cy.get('.search-autocomplete input').click();
    cy.get('.search-autocomplete input').type('accounting').click();
    cy.wait(5000)
    cy.get('div').contains('Accounting').click();
    cy.get('button').contains('Submit').click();
    cy.wait(2000)
    cy.get('.search-instructor-autocomplete input').click();
    cy.wait(3000)
    cy.get('a.search-instructor-autocomplete-items div').contains('Liu, Xiang').click();
  });

  it('should show an accounting class by Liu Xiang', function () {
    cy.get('a').should('contain', 'Liu, Xiang');
  });

  it('should not show accounting classes by other professors', function () {
    cy.get('a').should('not.contain', 'Munsif, Vishal');
    cy.get('a').should('not.contain', 'Bazaz, Mohammad');
  });

  context('and the user clicks on Reset button', () => {
    before(() => {
      cy.get('[type="reset"]').click();
      cy.wait(100);
    });

    it('should remove Accounting from "Select a Subject" autocomplete box', () => {
      cy.get(':nth-child(2) > .bp3-popover-wrapper > .bp3-popover-target > .bp3-input-group > .bp3-input').should('not.have.value', 'Accounting (ACCT)');
    });

    it('should remove Liu Xiang from "Instructor" autocomplete box', () => {
      cy.get(':nth-child(4) > .bp3-popover-wrapper > .bp3-popover-target > .bp3-input-group > .bp3-input').should('not.have.value', 'Liu Xiang');
    });

    it('should not display any classes', () => {
      // Wait for 12 secs to ensure it does not display all classes.
      cy.get('#class-search-results-component', { timeout: 12000 }).should('not.exist');
    });

  });

  context('and clicks on submit without any values in any other fields', () => {
    before(() => {
      cy.get('button').contains('Submit').click();
    });

    it('should not display any classes', () => {
      cy.get('#class-search-results-component', { timeout: 12000 }).should('not.exist');
    });

    it('should display a warning message if the user clicks on Submit without selecting a subject', () => {
      cy.get('button').contains('Submit').click();
      cy.get('.select-a-subject').should('exist');
    });
  });

  context('and searches for classes related to Accounting and Liu Xiang again', () => {
    before(() => {
      cy.visit('http://localhost:3000/');
      cy.get('.search-autocomplete input').click();
      cy.get('.search-autocomplete input').type('accounting').click();
      cy.wait(5000)
      cy.get('div').contains('Accounting').click();
      cy.get('button').contains('Submit').click();
      cy.wait(900)
      cy.get('.search-instructor-autocomplete input').click();
      cy.wait(300)
      cy.get('a.search-instructor-autocomplete-items div').contains('Liu, Xiang').click();
    });

    it('should show accounting classes by Liu Xiang', function () {
      cy.get('a').should('contain', 'Liu, Xiang');
    });

    it('should show Accounting (ACCT) in "Select a Subject" autocomplete box', () => {
      cy.get(':nth-child(2) > .bp3-popover-wrapper > .bp3-popover-target > .bp3-input-group > .bp3-input').should('have.value', 'Accounting (ACCT)');
    });

    it('should show Liu Xiang in "Instructor" autocomplete box', () => {
      cy.get(':nth-child(4) > .bp3-popover-wrapper > .bp3-popover-target > .bp3-input-group > .bp3-input').should('have.value', 'Liu, Xiang');
    });
  });

});

describe('when a user searches for Biology classes', function () {

  before(function () {
      cy.visit('http://localhost:3000/');
      cy.get('.search-autocomplete input').type('Biology').click();
      cy.get('div').contains('Biology', { timeout: 7000 }).click();
      cy.get('button').contains('Submit').click();
      cy.get('.start-time > .bp3-timepicker-arrow-row:first-child > .bp3-timepicker-hour:first-child').click();
      cy.get('.start-time > .bp3-timepicker-arrow-row:first-child > .bp3-timepicker-hour:first-child').click();
      cy.get('.start-time select').select('am') 
      cy.get('button').contains('Submit').click();
      cy.wait(2000)
    });

  context('that starts at 10:00 AM', () => {

    it('should not show classes before 10 AM', function () {
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

  context('and toggles the GE box', () => {
    it('should show only GE classes from Biology if GE is set', () => {
      cy.get('.bp3-switch > .bp3-control-indicator').click();
      cy.get('div').should('contain', 'TOPICS IN BIOLOGY');
      cy.get('#class-search-results-component').should('not.contain', 'CELL PHYSIOLOGY');
    });

    it('should show all classes from Biology when GE is unset', () => {
      cy.get('.bp3-switch > .bp3-control-indicator').click();
      cy.get('div').should('contain', 'TOPICS IN BIOLOGY');
      cy.get('#class-search-results-component').should('contain', 'CELL PHYSIOLOGY');
    });
  });
  
});
