const url = require('./Utils');
describe('Filter classes by session code', function () {

  context('Given class search form', () => {
    context('when a user searches by a subject and Regular is selected as session code', () => {
      before(function () {
        cy.visit(url);
        cy.get('.search-autocomplete input').type('adm').click();
        cy.wait(5000);
        cy.get('span').contains('ADMN', { timeout: 20000 }).click();
        cy.get('#additional-filters').click();
        cy.get('.session-code select').select('Regular');
        cy.get('.btn-primary').click();
        cy.wait(5000);
      });
      it('should show Regular classes', () => {
        cy.get('span').should('contain', 'ADMN 691 01');
        cy.get('h5').should('contain', 'CULM BUS ANALY PROJECT');
        cy.get('span').should('contain', 'Regular');
      });
    });
  });
});
