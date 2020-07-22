import * as form from './Utils';

context('table format', () => {
  before(() => {
    cy.visit(form.url);
    form.selectSubject();
    form.submit();
    cy.get('#bp3-tab-title_display-format-tabs_table').click();
  });

  it('should display classes in table format', () => {
    cy.get('.bp3-table-column-name')
      .should('contain', 'Subjects')
      .should('contain', 'Title')
      .should('contain', 'Section')
      .should('contain', 'Class Number')
      .should('contain', 'Type')
      .should('contain', 'Unit')
      .should('contain', 'Instructor')
      .should('contain', 'Building')
      .should('contain', 'Day(s)')
      .should('contain', 'Time')
      .should('contain', 'Seats Available')
      .should('contain', 'Waitlist Seats')
      .should('contain', 'Mode');
  });
});
