const devUrl = 'https://dev-main.csusb.edu/course-schedule';
const localUrl = 'http://localhost:3000/';

describe('Displayed fields in classes', function () {
  context('when Biology is searched', () => {

    before(function () {
      cy.visit(localUrl);
      cy.get('.search-autocomplete input').type('Biology').click();
      cy.get('div').contains('Biology', { timeout: 15000 }).click();
      cy.get('.course-number').type('100');
      cy.get('.mon > .bp3-control-indicator').click();
      cy.get('button').contains('Submit').click();
      cy.wait(5000);
    });

    it('should display information related to a class', () => {
      cy.get('span').should('contain', 'BIOL 100 02');
      cy.get('b').should('contain', 'TOPICS IN BIOLOGY');
      cy.get('span').should('contain', 'BI 106');
      cy.get('span').should('contain', 'Meeting Time: 9:00 am - 11:50 am');
      cy.get('span').should('contain', 'Meeting Days: M-W');
      cy.get('span').should('contain', 'Campus: San Bernardino');
      cy.get('span').should('contain', 'clev,ge,sote');
      cy.get('span').should('contain', 'No. of units: 1');
      cy.get('span').should('contain', 'Lab');
      cy.get('span').should('contain', 'Open');
      cy.get('span').should('contain', 'Classroom');
    });

    it('should show description when class name is clicked', () => {
      cy.get(':nth-child(1) > .bp3-card > .bp3-popover-wrapper > .bp3-popover-target > h5 > .bp3-tooltip-indicator').click();
      cy.get('.bp3-popover-content').should('contain', 'Materials fee required. (GE=B2) (5 units)');
    });

    it.skip('should show TBD if room number is not assigned', () => {
      cy.get('.mon > .bp3-control-indicator').click();
      cy.get('button').contains('Submit').click();
      cy.wait(5000);
      cy.get('span').should('contain', 'Room: TBD');
    });

  });
});
