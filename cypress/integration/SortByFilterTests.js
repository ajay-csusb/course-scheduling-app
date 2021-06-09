import * as form from './Utils';

context('Sort by filter', () => {
  before(() => {
    form.selectClassFromFallTerm();
  });

  it('should display the Sort by filter', () => {
    cy.get('.sort-by-select').should('have.length', 1);
  });

  it('should not show Sort by filter if the table tab is clicked', () => {
    cy.get('#bp3-tab-title_display-format-tabs_table').click();
    cy.get('.sort-by-select').should('not.exist');
  });

  it('should show the Sort by filter if the list tab is clicked', () => {
    cy.get('#bp3-tab-title_display-format-tabs_list').click();
    cy.get('.sort-by-select').should('exist');
  });

  it('should show the correct class after the options are selected in sort by filter', () => {
    const courseId1 = Cypress.$('.course-id')[0];
    const courseId1Text = Cypress.$(courseId1).text();
    cy.get('.sort-by-select > select').select('Class number: high to low');
    const courseId2 = Cypress.$('.course-id')[0];
    const courseId2Text = Cypress.$(courseId2).text();
    cy.get('.sort-by-select > select').select('Class number: low to high');
    const courseId3 = Cypress.$('.course-id')[0];
    expect(Cypress.$(courseId3).text()).to.equal(courseId1Text);
    cy.get('.sort-by-select > select').select('Class number: high to low');
    const courseId4 = Cypress.$('.course-id')[0];
    expect(Cypress.$(courseId4).text()).to.equal(courseId2Text);
  });
});