const { url, selectSubject } = require('./Utils');

describe('Class information displays accurate data', function () {
  context('when a user searches by a subject', () => {
    before(function () {
      cy.visit(url);
      selectSubject();
      cy.get('.btn-primary').click();
    });

    it('class results should not be clickable', () => {
      cy.get('div').should('not.contain.class', 'bp3-interactive');
    });

    it('should display the tabs', () => {
      cy.get('.bp3-tabs')
        .should('contain', 'List View ')
        .should('contain', 'Table View ');
    });

    it('should show Export to Excel link', () => {
      cy.get('#export-to-excel')
        .should('contain', 'Export to Excel')
    });
  });

});
