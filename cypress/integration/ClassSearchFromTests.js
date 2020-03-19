import { url } from './Utils';

describe('Markup of search form', () => {
    before(() => {
      cy.visit(url);
    });
  context('When the form is displayed', () => {
    it('should have the Additional Search Criteria label', () => {
      cy.get('a').should('contain', 'Additional Search Criteria');
    });

    it('subject input field should have the correct placeholder', () => {
      cy.get('.search-autocomplete input').invoke('attr', 'placeholder').should('contain', 'Accounting');
    });

    it('instructor autocomplete field should have correct placeholder', () => {
      cy.get('.search-instructor-autocomplete input').invoke('attr', 'placeholder').should('contain', 'First name or last name');
    });

    context('when a user does not enter any input', () => {
      before(function () {
        cy.get('.btn-primary').click();
      });

      it('should show an error message', () => {
        cy.get('div').should('contain', 'Please select a Course Subject');
      });

      it('should highlight the subject textfield', () => {
        cy.get('.search-autocomplete input').should('contain.class', 'bp3-intent-danger');
      });
    });

    context('when a validation message is displayed', () => {
      before(function () {
        cy.visit(url);
        cy.get('.btn-primary').click();
      });
      context('when reset is clicked', () => {
        it('should not highlight the subject textfield', () => {
          cy.contains('Reset').click();
          cy.get('.search-autocomplete input').should('not.contain.class', 'bp3-intent-danger');
        });

        it('should not show the error message', () => {
          cy.get('div').should('not.contain', 'Please select a Course Subject');
        });
      });
    });
  });
});