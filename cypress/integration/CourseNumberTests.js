const { url, enterCourseNumber, submit } = require('./Utils');

describe( 'Filter classes by course number', function () {

  context( 'given class search form', () => {
    context( 'when a user searches only by course number', () => {
      before( () => {
        cy.visit( url );
        enterCourseNumber();
        submit();
      } );

      it( 'should show atleast one class in the results', () => {
          cy.get('#class-search-results-component > ul > li:nth-child(2) > div > div.item-header > div.course-header > div.course-name > strong')
          .should('contain', 'BIOL 1000')
      } );
    } );
  } );
});
