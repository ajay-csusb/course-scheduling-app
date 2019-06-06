const devUrl = 'https://dev-main.csusb.edu/course-schedule';
const localUrl = 'http://localhost:3000/';

describe('Loading message behavior', function () {
  context('When Biology is selected as a subject', () => {
    before(() => {
      cy.visit(localUrl);
      cy.get('.search-autocomplete input').type('Biology').click();
      cy.get('div').contains('Biology', { timeout: 7000 }).click();
      cy.get('button').contains('Submit').click();
    });

    it('should show loading message', () => {
      cy.get('p').should('contain', 'Loading...');
      cy.wait(10000);
    });

    it('should show loading message if the results are filtered further', () => {
      cy.get('.course-number').type('300');
      cy.get('button').contains('Submit').click();
      cy.get('p').should('contain', 'Loading...');
      cy.wait(10000);
    });

    it('should show loading message after a search is made where no results are found', () => {
      cy.visit(localUrl);
      cy.get('.search-autocomplete input').type('Biology').click();
      cy.get('div').contains('Biology', { timeout: 7000 }).click();
      cy.get('.sun > .bp3-control-indicator').click();
      cy.get('button').contains('Submit').click();
      cy.wait(10000);
      cy.get('.sun > .bp3-control-indicator').click();
      cy.get('.all-date > .bp3-control-indicator').click();
      cy.get('button').contains('Submit').click();
      cy.get('p').should('contain', 'Loading...');
    });
  });
});
