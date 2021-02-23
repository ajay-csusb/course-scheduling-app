const { url } = require('./Utils');

describe('Filter classes by campus', function () {
  context('when a user searches for classes in Palm Desert campus', () => {
    before(function () {
      cy.visit(url);
      cy.get('.campus-select select').select('Palm Desert');
      cy.get('.btn-primary').click();
    });

  it('should show classes in Palm Desert campus', () => {
      cy.get('#class-search-results-component').should('contain', 'classes found');
      cy.get('.course').should('have.length.be.gt', 0);
      cy.get('.course-desc').should('contain', 'Palm Desert');
    });
  });
});
