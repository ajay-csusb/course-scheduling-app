const { url, enterCourseNumber, selectSubject, submit } = require('./Utils');

describe('Filter classes by course number', function () {
  context('given class search form', () => {
    context('when a user searches only by course number', () => {
      before(() => {
        cy.visit(url);
        selectSubject();
        enterCourseNumber('1000');
        submit();
      });

      it('should show atleast one class in the results', () => {
        cy.get('.course-name').should('contain', 'BIOL 1000');
      });
    });
  });
});
