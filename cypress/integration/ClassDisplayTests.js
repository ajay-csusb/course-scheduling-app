import * as form from './Utils';

describe('Correct class information is displayed in results', function () {
  context('when Biology is searched', () => {
    describe('displayed markup of results', function () {
      context('when classes related to Biology are searched', () => {
        before(function () {
          cy.visit(form.url);
          form.selectSubject();
          form.submit();
        });

        it('should display information related to a class', () => {
          cy.get(':nth-child(1) > .course > .item-header > .course-header > .course-name > strong')
          .should('contain', 'BIOL')
          cy.get('.course:first-child .course-desc > li > span')
          .should('contain', 'Units')
          .and('contain.text', 'Meeting Time')
          .and('contain', 'Meeting Days')
          .and('contain', 'Room')
          .and('contain', 'Campus')
          .and('contain', 'Instructor')
          .and('contain', 'Instruction Mode');
          cy.get('.course:first-child .course-availability').invoke('text').should('match', /(Waitlist)|(Seats available)/);
          cy.get('.course:first-child .course-details > span').should('contain', 'Section');
        });

        it('should show description when info icon is clicked', () => {
          cy.get('.course:first').find('.bp3-popover-wrapper').click();
          cy.get('.bp3-popover-content').should('have.length', '1');
        });

        it('should display correct markup', () => {
          cy.get('.course:first-child button').should('have.class', 'course-info-btn');
          cy.get('.course:first-child .course-name span').should('have.class', 'sr-only');
          cy.get('.course:first-child span').should('have.class', 'course-id');
        });
      });

      context('when Biology classes from past terms are searched', () => {
        before(function () {
          cy.visit(form.url);
          selectPreviousTerm();
          form.selectSubject();
          form.submit();
        });

        it('should display classes as Closed', () => {
          cy.get(':nth-child(1) > .course > .item-header > .course-info > .course-status').should('contain', 'Closed');
        });

        it('should not display markup for available seats', () => {
          cy.wait(5000);
          cy.get('.course:first-child div').should('not.have.class', 'course-availability');
        });
      });
    });

    function selectPreviousTerm() {
      let prevYear = [];
      cy.wait(5000).then(() => {
        cy.get('#term option').each((e) => {
          prevYear.push(Cypress.$(e).text());
        }).then(() => {
          cy.get("#term").select(prevYear[3])
        });
      });
    }
  });
  
});
