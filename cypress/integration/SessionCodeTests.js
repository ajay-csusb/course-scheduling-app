const devUrl = 'https://dev-main.csusb.edu/course-schedule';
const localUrl = 'http://localhost:3000/';

describe('Filter classes by session code', function () {

  context('Given class search form', () => {
    context('when a user searches by subject and 10 weeks is selected as session code', () => {
      before(function () {
        cy.visit(localUrl);
        cy.get('.search-autocomplete input').type('all').click();
        cy.wait(5000);
        cy.get('span').contains('all', { timeout: 20000 }).click();
        cy.get('#additional-filters').click();
        cy.get('.session-code select').select('10 weeks');
        cy.get('button').contains('Submit').click();
        cy.wait(25000);
      });
      it('should show classes that are 10 weeks long', () => {
        cy.get('h5').should('contain', 'THESIS');
        cy.get('h5').should('contain', 'MBA PORTFOLIO');
        cy.get('h5').should('contain', 'CONTINUOUS ENROLLMENT');
        cy.get('h5').should('contain', 'GRAD INDEPENDENT STUDY');
        cy.get('span').should('contain', '10 weeks');
      });
    });
  });
});
