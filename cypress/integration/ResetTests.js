import * as form from './Utils';

describe('Given a class search form', function () {
  describe('When a user searches for classes and the clicks on reset', function () {
    before(() => {
      cy.visit(form.url);
      form.selectSubject();
      form.selectCampus();
      form.enterCourseNumber();
      form.selectInstructionMode();
      form.checkDays(['.mon', '.thu']);
      form.enterTimes();
      form.clickAdditionalFilters();
      cy.get('#course-attribute').select('eBook');
      cy.get('.select-ge-classes-attr select').select('GE-B2 Life Sciences');
      cy.get('.class-number').type('0000');
      cy.get('.session-code select').select('Regular');
      form.submit();
      cy.get('.btn-secondary').click();
    });

    it('should reset all the fields', () => {
      cy.get('p').should('not.contain', '0 classes found');
      cy.get('i').should('not.contain', 'Try refining the search above to get more results');
      cy.get('#class-search-results-component').should('not.visible');
      cy.get('.campus-select select').should('have.value', 'both');
      cy.get('.search-autocomplete input').invoke('attr', 'value').should('not.contain', 'Biology');
      cy.get('#course-number').invoke('attr', 'value').should('contain', '');
      cy.get('.search-instructor-autocomplete input').invoke('attr', 'value').should('contain', '');
      cy.get('.select-instruction-mode select').should('have.value', 'all');
      cy.get('.start-time .bp3-timepicker-hour').invoke('attr', 'value').should('contain', '12');
      cy.get('.start-time .bp3-timepicker-minute').invoke('attr', 'value').should('contain', '00');
      cy.get('.start-time .bp3-timepicker-ampm-select select').should('have.value', 'am');
      cy.get('.end-time .bp3-timepicker-hour').invoke('attr', 'value').should('contain', '11');
      cy.get('.end-time .bp3-timepicker-minute').invoke('attr', 'value').should('contain', '00');
      cy.get('.end-time .bp3-timepicker-ampm-select select').should('have.value', 'pm');
      cy.get('.select-ge-classes-attr select').should('have.value', '');
      cy.get('.course-attribute select').should('have.value', 'all');
      cy.get('#class-number').invoke('attr', 'value').should('contain', '');
      cy.get('.session-code select').should('have.value', 'all');
    });
  });
});