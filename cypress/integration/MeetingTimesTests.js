const devUrl = 'https://dev-main.csusb.edu/course-schedule';
const localUrl = 'http://localhost:3000/';

describe('Filter classes by meeting times', function () {

  context('when a user searches by start time', () => {
    context('and sets the start time before noon', () => {
    before(function () {
      cy.visit(localUrl);
      cy.get('.search-autocomplete input').type('Biology').click();
      cy.get('div').contains('Biology', { timeout: 15000 }).click();
      cy.get('.start-time input.bp3-timepicker-hour:first-child').type('10');
      cy.get('.start-time select').select('am')
      cy.get('button').contains('Submit').click();
      cy.wait(10000);
    });

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

  context('when a user sets the start time after noon', () => {
    before(function () {
      cy.visit(localUrl);
      cy.get('.search-autocomplete input').type('Biology').click();
      cy.get('div').contains('Biology', { timeout: 15000 }).click();
      cy.get('.start-time input.bp3-timepicker-hour:first-child').type('3');
      cy.get('.start-time select').select('pm')
      cy.get('button').contains('Submit').click();
      cy.wait(10000);
    });

    it('should show classes at 3 PM', function () {
      cy.contains('#class-search-results-component', '3:00 pm').should('be.visible');
    });

    it('should not show classes at 12 PM', function () {
      cy.get('#class-search-results-component').should('not.contain', '12:00 pm');
    });
  });
  });

  context('when a user searches by end time', () => {
    context('and sets the end time before noon', () => {
    before(() => {
      cy.visit(localUrl);
      cy.get('.search-autocomplete input').type('Biology').click();
      cy.get('div').contains('Biology', { timeout: 15000 }).click();
      cy.get('.end-time input.bp3-timepicker-hour:first-child').type('11');
      cy.get('.end-time input.bp3-timepicker-minute').type('30');
      cy.get('.end-time select').select('am');
      cy.get('button').contains('Submit').click();
      cy.wait(30000);
    });

    it('should not show classes after 11:30 AM', function () {
      cy.get('#class-search-results-component').should('not.contain', '3:00 pm');
      cy.get('#class-search-results-component').should('not.contain', '4:50 pm');
      cy.get('#class-search-results-component').should('not.contain', '12:00 pm');
    });

    it('should show classes before 11:30 AM', function () {
      cy.get('#class-search-results-component').should('contain', '10:50 am');
    });

    it('should show online classes', function () {
      cy.get('#class-search-results-component').should('contain', 'Meeting Days: N/A');
    });
  });
  context('and sets the end time after noon', () => {
    before(() => {
      cy.visit(localUrl);
      cy.get('.search-autocomplete input').type('Biology').click();
      cy.get('div').contains('Biology', { timeout: 15000 }).click();
      cy.get('.end-time input.bp3-timepicker-hour:first-child').type('5');
      cy.get('.end-time select').select('pm');
      cy.get('button').contains('Submit').click();
      cy.wait(10000);
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
});

describe('Filter classes by meeting times after filtering by subject', function () {

  context('when a user searches by start time', () => {
    before(function () {
      cy.visit(localUrl);
      cy.get('.search-autocomplete input').type('Biology').click();
      cy.get('div').contains('Biology', { timeout: 15000 }).click();
      cy.get('button').contains('Submit').click();
      cy.wait(10000);
      cy.get('.start-time input.bp3-timepicker-hour:first-child').type('10');
      cy.get('.start-time select').select('am')
      cy.get('button').contains('Submit').click();
      cy.wait(10000);
    });
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

  context('when a user searches by end time', () => {
    context('and sets the end time before noon', () => {
      before(() => {
        cy.visit(localUrl);
        cy.get('.search-autocomplete input').type('Biology').click();
        cy.get('div').contains('Biology', { timeout: 15000 }).click();
        cy.get('button').contains('Submit').click();
        cy.wait(10000);
        cy.get('.end-time input.bp3-timepicker-hour:first-child').type('11');
        cy.get('.end-time input.bp3-timepicker-minute').type('30');
        cy.get('.end-time select').select('am');
        cy.get('button').contains('Submit').click();
        cy.wait(10000);
      });

      it('should not show classes after 11:30 AM', function () {
        cy.get('#class-search-results-component').should('not.contain', '3:00 pm');
        cy.get('#class-search-results-component').should('not.contain', '4:50 pm');
        cy.get('#class-search-results-component').should('not.contain', '12:00 pm');
      });

      it('should show classes before 11:30 AM', function () {
        cy.get('#class-search-results-component').should('contain', '10:50 am');
      });

      it('should show online classes', function () {
        cy.get('#class-search-results-component').should('contain', 'Meeting Days: N/A');
      });
    });
    context('and sets the end time after noon', () => {
      before(() => {
        cy.visit(localUrl);
        cy.get('.search-autocomplete input').type('Biology').click();
        cy.get('div').contains('Biology', { timeout: 15000 }).click();
        cy.get('button').contains('Submit').click();
        cy.wait(10000);
        cy.get('.end-time input.bp3-timepicker-hour:first-child').type('5');
        cy.get('.end-time select').select('pm');
        cy.get('button').contains('Submit').click();
        cy.wait(10000);
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
});
