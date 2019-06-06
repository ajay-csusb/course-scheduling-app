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
      cy.get('span').should('contain', 'BIOL  100 02');
      cy.get('b').should('contain', 'TOPICS IN BIOLOGY');
      cy.get('span').should('contain', '(Class No. 60565)');
      cy.get('a').should('contain', 'Lopez, Larry');
      cy.get('span').should('contain', 'BI 106');
      cy.get('span').should('contain', 'Meeting Time: 9:00 am - 11:50 am');
      cy.get('span').should('contain', 'Meeting Days: M-W');
      cy.get('span').should('contain', 'Campus: San Bernardino');
      cy.get('span').should('contain', 'clev,ge,sote');
      cy.get('span').should('contain', 'No. of units: 1');
      cy.get('span').should('contain', 'Lab');
      cy.get('span').should('contain', 'Open');
      cy.get('span').should('contain', 'Session type: 6W1');
      cy.get('span').should('contain', 'Classroom');
    });
  });
});
