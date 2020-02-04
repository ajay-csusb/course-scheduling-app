const { url } = require('./Utils');

describe.skip('Filter classes by course attribute', function () {

  context('given class search form', () => {
    context('when a user selects GE-B2 Life Sciences as a course attribute', () => {
      before(function () {
        cy.visit(url);
        cy.get('#additional-filters').click();
        cy.get('#course-attribute').select('');
        cy.get('.btn-primary').click();
      });
      assertGeClasses();
    });
  });
});

function assertGeClasses() {
  it('should show classes that belong to GE', () => {
    cy.get('span').should('contain', 'BIOL 100');
    cy.get('span').should('contain', 'Section 02');
    cy.get('span').should('contain', 'Section 03');
    cy.get('span').should('contain', 'Section 04');
  });

  it('should display full description of course attribute in the results', () => {
    // @Todo it should display GE-B2 Life Sciences
    cy.get('ul.course-desc').should('contain', 'General Education');
  });
}