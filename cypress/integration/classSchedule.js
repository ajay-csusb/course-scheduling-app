import { ContextMenu } from "@blueprintjs/core";

const devUrl = 'https://dev-main.csusb.edu/course-schedule';
const localUrl = 'http://localhost:3000/';
describe('when a user filter by subject(ACCT) and instructor(Liu Xiang)', function () {

  before(() => {
    cy.visit(localUrl);
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
      cy.visit(localUrl);
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

    context('and filters by course number', () => {
      before(() => {
        cy.get('.course-number').type('21');
      });

      it('should show not show cost accounting class', () => {
        cy.get('.course-number', {timeout: 2000}).should('contain.value', '21');
        cy.get('h5').should('not.contain', 'COST ACCOUNTING');
      });

      context('and clicks reset', () => {
        before(() => {
          cy.get('button').contains('Reset').click();
        });

        it('should clear value in course number field', () => {
          cy.get('.course-number').should('not.contain.value', '21');
        });
      });
    });

  });



});

describe('when a user searches for Biology classes', function () {

  before(function () {
    cy.visit(localUrl);
    cy.get('.search-autocomplete input').type('Biology').click();
    cy.get('div').contains('Biology', { timeout: 9000 }).click();
    cy.get('button').contains('Submit').click();
    cy.get('.start-time input.bp3-timepicker-hour:first-child').type('10');
    cy.get('.start-time select').select('am') 
    cy.get('button').contains('Submit').click();
  });

  it('should show loading message after submit is clicked', () => {
    cy.get('p').should('contain', 'Loading...');
  });

  context('and selects "All" as instructor', () => {
    before(() => {
      cy.get('.search-instructor-autocomplete input').click();
      cy.wait(3000)
      cy.get('a.search-instructor-autocomplete-items div').contains('All').click();
    });

    it('should show classes related to Biology', () => {
      cy.get('#class-search-results-component', { timeout: 5000 }).should('exist');
      cy.get('div').should('contain', 'TOPICS IN BIOLOGY');
      cy.get('#class-search-results-component').should('contain', 'CELL PHYSIOLOGY');
    });
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

  context('that start at 12:30 PM', () => {
    before(() => {
    cy.get('.start-time input.bp3-timepicker-hour:first-child').type('12');
    cy.get(':nth-child(1) > .bp3-timepicker > .bp3-timepicker-input-row > .bp3-timepicker-minute').type(30);
    cy.get('.start-time select').select('pm') 
    cy.get('button').contains('Submit').click();
    });

    it('should show classes at 3 PM', function () {
      cy.get('#class-search-results-component').should('contain', '3:00 pm');
    });

    it('should not show classes at 12 PM', function () {
      cy.get('#class-search-results-component').should('not.contain', '12:00 pm');
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

  context('then selects Chinese, Accounting, Biology and Aerospace studies as subjects', () => {

    before(() => {
      cy.get('.search-autocomplete input').type('Chinese').click();
      cy.get('div').contains('Chinese').click();
    });

    it('should not show loading message when Chinese is selected and before submit is clicked', () => {
      cy.wait(10000);
      cy.get('p').should('not.contain', 'Loading...');
    });

    it('should not show loading message when Chinese is selected and submit is clicked', () => {
      cy.get('button').contains('Submit').click();
      cy.wait(10000);
      cy.get('p').should('contain', 'No classes found.');
    });

    it('should show loading message when Accounting is selected', () => {
      cy.get('.search-autocomplete input').type('Accounting').click();
      cy.get('div').contains('Accounting', { timeout: 7000 }).click();
      cy.wait(10000);
      cy.get('p').should('contain', 'Loading...');
    });

    it('should show loading message when Biology is selected', () => {
      cy.get('.search-autocomplete input').type('Biology').click();
      cy.get('div').contains('Biology', {timeout: 10000}).click();
      cy.wait(10000);
      cy.get('p').should('contain', 'Loading...');
    });

    it('should not show loading message when Aerospace studies is selected', () => {
      cy.get('.search-autocomplete input').type('Aerospace studies').click();
      cy.get('div').contains('Aerospace Studies', { timeout: 7000 }).click();
      cy.wait(20000);
      cy.get('p').should('not.contain', 'Loading...');
      cy.get('p').should('contain', 'No classes found.');
    });
  });

  context('then selects Sunday from meeting day', () => {
    beforeEach(() => {
      cy.get('.search-autocomplete input').type('Biology').click();
      cy.get('div').contains('Biology', { timeout: 7000 }).click();
      cy.get('.sun > .bp3-control-indicator').click();
    });

    it('should display no classes found', () => {
      cy.get('p').should('contain', 'No classes found.');
    });
  })
  
});

describe('when All is selected as a subject', () => {
  before(() => {
    cy.visit(localUrl);
    cy.get('.search-autocomplete input').click();
    cy.wait(7000)
    cy.get('span').contains('all').click();
    cy.get('button').contains('Submit').click();
  });

  it('should show all the classes or the first 3000 classes', () => {
    cy.get('#class-search-results-component', { timeout: 50000 }).should('exist');
  });
});
