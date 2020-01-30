import { url } from './Utils';

describe('Markup of search form', () => {
  context('When the form is displayed', () => {
    it('should have the Additional Search Criteria label', () => {
      cy.visit(url);
      cy.get('a').should('contain', 'Additional Search Criteria');
    });
  });
});