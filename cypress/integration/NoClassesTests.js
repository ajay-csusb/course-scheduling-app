const devUrl = 'https://dev-main.csusb.edu/course-schedule';
const localUrl = 'http://localhost:3000/';

describe('No classes behavior', function () {

  context('When Biology is selected as a subject and Sunday is checked together', () => {
    it('should display message for no classes found', () => {
      cy.visit(localUrl);
      cy.get('.search-autocomplete input').type('Biology').click();
      cy.get('div').contains('Biology', { timeout: 7000 }).click();
      cy.get('.sun > .bp3-control-indicator').click();
      cy.get('button').contains('Submit').click();
      cy.get('p').should('contain', 'Found 0 classes');
    });
  });

  context('When Biology is selected as a subject followed by Sunday', () => {
    it('should display message for no classes found', () => {
      cy.visit(localUrl);
      cy.get('.search-autocomplete input').type('Biology').click();
      cy.get('div').contains('Biology', { timeout: 7000 }).click();
      cy.get('button').contains('Submit').click();
      cy.wait(15000);
      cy.get('p').should('not.contain', 'Found 0 classes');
      cy.get('.sun > .bp3-control-indicator').click();
      cy.get('button').contains('Submit').click();
      cy.get('p').should('contain', 'Found 0 classes');
    });
  });
  
});
