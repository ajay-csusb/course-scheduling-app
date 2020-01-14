const url = require('./Utils');

describe('Filter classes by class number', function () {

  context('Given class search form', () => {
    context('when a user searches only by class number', () => {
      before(function () {
        cy.visit(url);
        cy.get('#additional-filters').click();
        cy.get('.class-number').type('20894');
        cy.get('.btn-primary').click();
      });
      it('should ADM 602 in the results', () => {
        cy.get('span').should('contain', 'ADMN 602');
      });
    });
  });
});
