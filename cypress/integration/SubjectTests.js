import * as form from './Utils';

describe('Filter classes by subject', function () {
  context('when a user searches for Biology classes', () => {
    before(function () {
      cy.visit(form.url);
      form.selectSubject();
      form.submit(); 
    });

    it('should show Biology classes', () => {
      cy.get('span').should('contain', 'BIOL 100');
    });
  });

});
