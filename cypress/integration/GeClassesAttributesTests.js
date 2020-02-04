import * as form from './Utils';

describe.skip('Filter classes by GE attributes', function () {

  context('when a user searches for GE classes related to Biology', () => {
    it('should show BIO 100', () => {
      cy.visit(form.url);
      cy.get('#additional-filters').click();
      cy.wait(5000);
      cy.get('.select-ge-classes-attr select').select('GE-B2 Life Sciences');
      form.submit();
      cy.get('span').should('contain', 'BIOL 100');
      cy.get('span').should('contain', 'TOPICS IN BIOLOGY');
      cy.get('.course-desc').should('contain', 'General Education');
    });
  });

});
