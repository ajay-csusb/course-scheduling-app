import * as form from './Utils';

const url = Cypress.env('url')
if (url.length === 0) {
  url = form.url
}  
describe('Filter classes by subject', function () {
  context('when a user searches for Biology classes', () => {
    before(function () {
      cy.visit(url);
      form.selectSubject();
      form.submit(); 
      form.waitForResults();
    });

    it('should show Biology classes', () => {
      cy.get('span').should('contain', 'BIOL 100');
    });
  });

});
