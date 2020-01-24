const url = require('./Utils');

describe('Filter classes by GE attributes', function () {

  context('when a user searches for GE classes related to Biology', () => {
    before(function () {
      cy.visit(url);
      cy.get('.search-autocomplete input').type('Biology').click();
      cy.get('div').contains('Biology').click();
      cy.get('#additional-filters').click();
      cy.get('.btn-primary').click();
    });
    assertBioGeClasses();
  });

  context('when a user searches for GE classes related to GE-B2 Life Sciences', () => {
    before(function () {
      cy.visit(url);
      cy.get('#additional-filters').click();
      cy.get('.select-ge-classes-attr select').select('GE-B2 Life Sciences');
      cy.get('.btn-primary').click();
    });
    assertBioGeClasses();
  });

  function assertBioGeClasses() {
    it('should show BIO 100', () => {
      cy.get('span').should('contain', 'BIOL 100');
      cy.get('span').should('contain', 'TOPICS IN BIOLOGY');
    });
  }

});
