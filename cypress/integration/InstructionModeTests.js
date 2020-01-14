const url = require('./Utils');

describe('Filter classes by instruction mode', function () {

  context('Given class search form', () => {
    context('when a user searches by subject and Hybrid classroom and Online Instruction is selected as instruction mode', () => {
      before(function () {
        cy.visit(url);
        cy.get('.search-autocomplete input').type('all').click();
        cy.wait(5000);
        cy.get('span').contains('all', { timeout: 20000 }).click();
        cy.get('#additional-filters').click();
        cy.get('.select-instruction-mode select').select('Hybrid Classroom and Online Instruction');
        cy.get('.btn-primary').click();
        cy.wait(10000);
      });

      it('should show classes that Hybrid Classroom and Online Instruction ', () => {
        cy.get('span').should('contain', 'Hybrid Classroom and Online Instruction');
      });

      it('should not show classes that are Off-Campus', () => {
        cy.get('span').should('not.contain', 'Off-Campus');
      });
    });
  });
});
