const devUrl = 'https://dev-main.csusb.edu/course-schedule';
const localUrl = 'http://localhost:3000/';

describe('Filter classes by subject', function () {

  context('when a user searches by subject', () => {
    before(function () {
      cy.visit(localUrl);
      cy.get('.search-autocomplete input').type('Biology').click();
      cy.get('div').contains('Biology', { timeout: 15000 }).click();
      cy.get('button').contains('Submit').click();
      cy.wait(10000)
    });

    it('should show Biology classes', () => {
      cy.get('span').should('contain', 'BIOL  100');
      cy.get('span').should('contain', 'BIOL  300');
    });
  });

  context('when a user does not enter asubject', () => {
    before(function () {
      cy.visit(localUrl);
      cy.get('button').contains('Submit').click();
      cy.wait(10000)
    });

    it('should show an error message', () => {
      cy.get('div').should('contain', 'Please select a Subject');
    });
  });

});
