import * as form from './Utils';

context('ShowClassFilter', () => {
  before(() => {
    form.selectClassFromFallTerm();
  });

  it('should display show classes filter', () => {
    cy.get('#results-options').should('have.length', 1);
  });

  it('should not show the show classes filter if the table tab is clicked', () => {
    cy.get('#bp3-tab-title_display-format-tabs_table').click();
    cy.get('#results-options').should('not.exist');
  });

  it('should show the show classes filter if the list tab is clicked', () => {
    cy.get('#bp3-tab-title_display-format-tabs_list').click();
    cy.get('#results-options').should('exist');
  });

  it('should show the show classes filter if the list tab is clicked', () => {
    cy.get('#bp3-tab-title_display-format-tabs_list').click();
    cy.get('#results-options').should('have.length', 1);
  });

  it('should display 30 classes by default', () => {
    cy.get('.course').should('have.length', 30);
  });

  it('should display 60 classes when 60 classes is clicked after 30 classes', () => {
    cy.get('a').contains('Last').click();
    cy.get('#results-options').select('60 classes');
    cy.get('.course').should('have.length', 60);
  });

  it('should display atleast 30 classes when 30 classes is clicked after 60 classes', () => {
    cy.get('#results-options').select('30 classes');
    cy.get('.course').should('have.length.greaterThan', 0);
    cy.get('.course').should('have.length.lessThan', 31);
  });

  it('should display 60 classes when 60 classes is selected from the dropdown', () => {
    cy.get('#results-options').select('60 classes');
    cy.get('.course').should('have.length', 60);
  });

  it('should display all classes when all classes is selected from the dropdown', () => {
    cy.get('#results-options').select('All classes');
    cy.get('.course').should('have.length.greaterThan', 60);
  });
});

context('when the number of classes are less than 30', () => {
  before(() => {
    form.selectClassFromFallTerm('Arabic');
  });

  it('should not display the show classes filter', () => {
    cy.get('#results-options').should('have.length', 0);
  });
});
