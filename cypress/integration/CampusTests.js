const { url, selectSubject, enterCourseNumber } = require('./Utils');

describe('Filter classes by campus', function () {
  context('when a user searches for classes in Palm Desert', () => {
    before(function () {
      cy.visit(url);
      cy.get('.campus-select select').select('Palm Desert');
      cy.get('.btn-primary').click();
    });

    it('should show classes in Palm Desert', () => {
      cy.get('.course-desc > :nth-child(5)').should('contain', 'Palm Desert');
      cy.get('.course-desc > :nth-child(5)').should('not.contain', 'San Bernardino');
    });
  });

  context('when a user searches for classes in San Bernardino', () => {
    before(function () {
      cy.visit(url);
      cy.get('.campus-select select').select('San Bernardino');
      cy.get('.btn-primary').click();
    });
    it('should show classes in San Bernardino', () => {
      cy.get('.course-desc > :nth-child(5)').should('contain', 'San Bernardino');
      cy.get('.course-desc > :nth-child(5)').should('not.contain', 'Palm Desert');
    });
  });

});
