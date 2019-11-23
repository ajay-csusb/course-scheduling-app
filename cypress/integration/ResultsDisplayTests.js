const devUrl = 'http://theme-csusb.pantheonsite.io/class-schedule';
const localUrl = 'http://localhost:3000/';

describe('Class information displays accurate data', function () {
  context('Given a user searches by a subject', () => {
    context('When they try to click on class information ', () => {
      before(function () {
        cy.visit(localUrl);
        cy.get('.search-autocomplete input').type('Biology').click();
        cy.get('div').contains('Biology', { timeout: 15000 }).click();
        cy.get('.mon > .bp3-control-indicator').click();
        cy.get('.btn-primary').click();
        cy.wait(5000)
      });

      it('then it should not be clickable', () => {
        cy.get('div').should('not.contain.class', 'bp3-interactive');
      });
    });
  });

});
