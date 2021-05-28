import * as form from './Utils';

context('Pagination', () => {
  before(() => {
    form.selectClassFromFallTerm();
  });

  it('should display a pager', () => {
    cy.get('.pagination').should('contain', 'First').should('contain', 'Next').should('contain', 'Last');
  });

  it('should have the correct number of classes', () => {
    cy.get('#bp3-tab-panel_display-format-tabs_list li .course').should('have.length', 30);
  });

  it('should have the correct CSS class for the current page number', () => {
    cy.get('a.current').should('contain', 1);
    cy.get('.page-2 a ').first().click();
    cy.get('a.current').should('contain', 2);
  });

  it('should not show the pager if the table tab is clicked', () => {
    cy.get('#bp3-tab-title_display-format-tabs_table').click();
    cy.get('.pagination').should('not.exist');
  });

  it('should show the pager if the list tab is clicked', () => {
    cy.get('#bp3-tab-title_display-format-tabs_list').click();
    cy.get('.pagination').should('have.length', 1);
  });
});
