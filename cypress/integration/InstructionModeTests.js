const devUrl = 'https://dev-main.csusb.edu/course-schedule';
const localUrl = 'http://localhost:3000/';

describe('Filter classes by instruction mode', function () {

  context('Given class search form', () => {
    context('when a user searches by subject and Hybrid classroom and Online Instruction is selected as instruction mode', () => {
      before(function () {
        cy.visit(localUrl);
        cy.get('.select-term select').select('Fall 2019');
        cy.get('.search-autocomplete input').type('all').click();
        cy.wait(5000);
        cy.get('span').contains('all', { timeout: 20000 }).click();
        cy.get('#additional-filters').click();
        cy.get('.select-instruction-mode select').select('Hybrid Classroom and Online Instruction');
        cy.get('button').contains('Submit').click();
        cy.wait(25000);
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
