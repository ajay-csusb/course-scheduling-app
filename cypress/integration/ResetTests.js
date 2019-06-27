const devUrl = 'https://dev-main.csusb.edu/course-schedule';
const localUrl = 'http://localhost:3000/';

describe('Reset button behavior', function () {
  describe('Given a class search form', function () {
    describe('When reset button is clicked', function () {
      before(() => {
        cy.visit(localUrl);
        cy.get('.search-autocomplete input').type('Communication Studies').click();
        cy.get('div').contains('Communication Studies', { timeout: 15000 }).click();
        cy.get('.select-term select').select('Fall 2019');
        cy.get('.campus-select select').select('Palm Desert');
        cy.get('button').contains('Submit').click();
        cy.wait(5000);
        cy.get('button').contains('Reset').click();
        cy.wait(5000);
      });

      it('should display Summer 2019', () => {
        cy.get('.select-term select option:first').should('be.selected');
      });

    });
  });

});
