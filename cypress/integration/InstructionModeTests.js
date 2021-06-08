const { url, selectSubject, submit, clickAdditionalFilters } = require('./Utils');

describe('Filter classes by instruction mode', function () {
  context('given a class search form', () => {
    context('when a user searches for online classes', () => {
      before(function () {
        cy.visit(url);
        selectSubject('Administration');
        clickAdditionalFilters();
        cy.get('.select-instruction-mode select').select('Online');
        submit();
      });

      it('should show classes that have Instruction mode as Online', () => {
        cy.get('ul.course-desc li').should('contain', 'Online');
      });

      it('should not show classes that have Instruction mode as Classroom', () => {
        cy.get('ul.course-desc li').should('not.contain', 'Classroom');
      });
    });
  });
});
