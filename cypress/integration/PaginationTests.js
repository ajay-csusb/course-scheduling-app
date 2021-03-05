import * as form from './Utils';

context('Pagination', () => {
  beforeEach(() => {
    getEnglishClasses();
  });
  
  function getEnglishClasses() {
    // Choose the term as Fall 2020. If Fall 2020 is not available, choose Fall 2021
    cy.visit(form.url);
    cy.request('/')
    .its('body')
    .then(html => {
      var options = Cypress.$('#term').children();
      console.log(options)
      let lastFallTerm;
      for (let option of options) {
        console.log(option);
        if (Cypress.$(option).attr('value').substr(-1) === '8') {
          lastFallTerm = Cypress.$(option).attr('label').trim();
          break;
        }
      }
      cy.get('select#term').select(lastFallTerm);
      form.selectSubject('English');
      form.submit();
    });
  }

it('should display a pager', () => {
    cy.get('.pagination').should('contain', 'First').should('contain', 'Next').should('contain', 'Last');
  });

it('should have the correct number of classes', () => {
    cy.get('#bp3-tab-panel_display-format-tabs_list li .course').should('have.length', 25);
  });

it('should have the correct CSS class for the current page number', () => {
    cy.get('a.current').should('contain', 1);
    cy.get('.page-2 a ').first().click();
    cy.get('a.current').should('contain', 2);
  });

it('should not show the pager if the table tab is clicked', () => {
    cy.get('#bp3-tab-title_display-format-tabs_table').click();
    cy.get('.pagination').should('not.exist');
    cy.get('#bp3-tab-title_display-format-tabs_list').click();
    cy.get('.pagination').should('have.length', 1);
  });
});
