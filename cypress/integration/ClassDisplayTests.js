const { url, selectSubject, enterCourseNumber, submit } = require('./Utils');

describe('Correct class information is displayed in results', function () {
  context('when Biology is searched', () => {
    describe('displayed markup of results', function () {
      context('when classes related to Biology are searched', () => {
        before(function () {
          cy.visit(url);
          selectSubject();
          enterCourseNumber();
          cy.get('.btn-primary').click();
        });

        it('should display information related to a class', () => {
          cy.get('span').should('contain', 'BIOL 100');
          cy.get('span').should('contain', 'Topics in Biology');
          cy.get('span').should('contain', 'Units');
          cy.get('span').should('contain', 'Meeting Time');
          cy.get('span').should('contain', 'Meeting Days');
          cy.get('span').should('contain', 'Room');
          cy.get('span').should('contain', 'Campus');
          cy.get('span').should('contain', 'Instructor');
          cy.get('span').should('contain', 'Instruction Mode');
          cy.get('div').should('contain', 'seats available');
          cy.get('span').should('contain', 'Section');
          cy.get('span').should('contain', 'Course Attribute');
        });

        it('should show description when info icon is clicked', () => {
          cy.get(':nth-child(1) > .course > .item-header > .course-header > .bp3-popover-wrapper > .bp3-popover-target > .course-name > .bp3-tooltip-indicator > .course-info-btn > .fas').click();
          cy.get('.bp3-popover-content').should('have.length', '1');
        });

        it('should display correct markup', () => {
          const classes = [
            'course result-item',
            'course-header',
            'course-details',
            'course-name',
            'item-body',
            'course-info',
            'course-availability',
            'course-status',
          ]
          for (const _class of classes) {
            cy.get('div').should('have.class', _class);
          }
          cy.get('button').should('have.class', 'course-info-btn');
          cy.get('.course-name span').should('have.class', 'sr-only');
          cy.get('span').should('have.class', 'course-id');
        });
      });

      context('when Biology classes from past terms are searched', () => {
        before(function () {
          cy.visit(url);
          selectPreviousTerm();
          selectSubject();
          enterCourseNumber();
          submit();
        });

        it('should display classes as Closed', () => {
          cy.get('.course-status').should('contain', 'Closed');
        });

        it('should not display markup for available seats', () => {
          cy.wait(5000);
          cy.get('div').should('not.have.class', 'course-availability');
        });
      });
    });

    function selectPreviousTerm() {
      let prevYear = '';
      cy.wait(5000).then(() => {
        cy.get('#term option').each((e) => {
          prevYear = Cypress.$(e).text();
        }).then(() => {
          cy.get("#term").select(prevYear)
        });
      });
    }
  });
});
