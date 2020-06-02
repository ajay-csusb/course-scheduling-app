import * as form from './Utils';

describe('Filter classes by subject', function () {
  context('when a user searches for Biology classes', () => {
    it('should show Biology classes', () => {
      cy.visit(form.url);
      form.selectSubject();
      cy.get('.btn-primary').click();
      cy.get('#class-search-results-component').should('contain', 'classes found');
      cy.get('.course').should('have.length.be.gt', 0);
    });
  });

});
