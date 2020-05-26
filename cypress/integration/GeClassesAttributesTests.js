import * as form from './Utils';

describe('Filter classes by GE attributes', function () {

  context('when a user searches for GE classes related to Biology', () => {
    before(() => {
      cy.visit(form.url);
      form.selectSubject();
      cy.get('#additional-filters').click();
      cy.get('.select-ge-classes-attr select').select('GE-B2 Life Science');
      form.submit();
    });
    it('should show BIO 100', () => {
      cy.get('#class-search-results-component')
        .should('contain', 'BIOL 1000')
    });
  });

});
