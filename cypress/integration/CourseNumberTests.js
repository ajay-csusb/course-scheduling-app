const { url, enterCourseNumber, submit } = require('./Utils');

describe('Filter classes by course number', function () {

  context('given class search form', () => {
    context('when a user searches only by course number', () => {
      it('should BIO 100 in the results', () => {
        cy.visit(url);
        enterCourseNumber("100");
        submit();
        cy.wait(5000);
        cy.get('p').should('not.contain', 'Found 0 classes');
      });
    });
  });
});
