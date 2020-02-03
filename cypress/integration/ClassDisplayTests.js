const { url, selectSubject, enterCourseNumber } = require('./Utils');

describe('Displayed markup of results', function () {
  context('when classes related to Biology are searched', () => {
    before(function () {
      cy.visit(url);
      selectSubject();
      enterCourseNumber();
      cy.get('.btn-primary').click();
    });

    it('should display information related to a class', () => {
      cy.get('span').should('contain', 'BIOL 100');
      cy.get('span').should('contain', 'TOPICS IN BIOLOGY');
      cy.get('span').should('contain', 'Units');
      cy.get('span').should('contain', 'Meeting Time');
      cy.get('span').should('contain', 'Meeting Days');
      cy.get('span').should('contain', 'Room');
      cy.get('span').should('contain', 'Campus');
      cy.get('span').should('contain', 'Instructor');
      cy.get('span').should('contain', 'Instruction Mode');
      cy.get('div').should('contain', 'Available Seats');
      cy.get('span').should('contain', 'Section');
      cy.get('span').should('contain', 'Course Attribute');
      // @Todo test Instructor URL
    });

    it.skip('should show description when class name is clicked', () => {
      cy.get(':nth-child(1) > .course > .item-header > .course-header > .course-title > .course-name span').click();
      cy.get('.bp3-popover-content').should('not.have.length', '0');
    });

    it('should display correct markup', () => {
      const classes = [
        'course result-item',
        'course-header',
        'course-title',
        'course-details',
        'course-name',
        'course-id',
        'item-body',
        'course-btns',
        'course-info',
        'course-availability',
        'course-status',
      ]
      for (const _class of classes) {
        cy.get('div').should('have.class', _class);
      }
    });
  });

  context('When Biology classes from past terms are searched', () => {
    before(function () {
      cy.visit(url);
      selectPreviousTerm();
      selectSubject();
      enterCourseNumber();
      cy.get('.btn-primary').click();
    });

    it('should display classes as Closed', () => {
      cy.get('div').should('contain', 'Closed');
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
