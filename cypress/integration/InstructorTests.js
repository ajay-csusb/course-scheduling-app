const devUrl = 'https://dev-main.csusb.edu/course-schedule';
const localUrl = 'http://localhost:3000/';

describe('Filter classes by instructor', function () {
    
  context('when a user searches by subject and instructor together', () => {
    before(function () {
      cy.visit(localUrl);
      cy.get('.search-autocomplete input').type('accounting').click();
      cy.get('div').contains('Accounting', { timeout: 15000 }).click();
      cy.get('.search-instructor-autocomplete input').click();
      cy.wait(3000);
      cy.get('a.search-instructor-autocomplete-items div').contains('Liu, Xiang').click();
      cy.get('button').contains('Submit').click();
      cy.wait(10000);
    });
    it('should show Accounting classes by Liu, Xiang', () => {
      cy.get('a').should('contain', 'Liu, Xiang');
    });
  });

  context('when a user searches by subject followed by instructor', () => {
    before(function () {
      cy.visit(localUrl);
      cy.get('.search-autocomplete input').type('accounting').click();
      cy.get('div').contains('Accounting', { timeout: 15000 }).click();
      cy.get('button').contains('Submit').click();
      cy.wait(3000);
      cy.get('.search-instructor-autocomplete input').click();
      cy.get('.search-instructor-autocomplete-items div').contains('Liu, Xiang').click();
      cy.get('button').contains('Submit').click();
      cy.wait(10000);
    });
    it('should show Accounting classes by Liu, Xiang', () => {
      cy.get('a').should('contain', 'Liu, Xiang');
    });
  });

});


describe('Filter classes by All instructors', function () {
  context('when a user searches by subject and all instructor together', () => {
    before(function () {
      cy.visit(localUrl);
      cy.get('.search-autocomplete input').type('accounting').click();
      cy.get('div').contains('Accounting', { timeout: 15000 }).click();
      cy.get('.search-instructor-autocomplete input').click();
      cy.wait(3000);
      cy.get('a.search-instructor-autocomplete-items div').contains('All').click();
      cy.get('button').contains('Submit').click();
      cy.wait(10000);
    });
    it('should show all Accounting classes', () => {
      cy.get('a').should('contain', 'Liu, Xiang');
      cy.get('a').should('contain', 'Munsif, Vishal');
      cy.get('a').should('contain', 'Bazaz, Mohammad');
    });
  });

  context('when a user searches by subject followed by all instructor', () => {
    before(function () {
      cy.visit(localUrl);
      cy.get('.search-autocomplete input').type('accounting').click();
      cy.get('div').contains('Accounting', { timeout: 15000 }).click();
      cy.get('button').contains('Submit').click();
      cy.wait(3000);
      cy.get('.search-instructor-autocomplete input').click();
      cy.get('a.search-instructor-autocomplete-items div').contains('All').click();
      cy.get('button').contains('Submit').click();
      cy.wait(10000);
    });
    it('should show all Accounting classes', () => {
      cy.get('a').should('contain', 'Liu, Xiang');
      cy.get('a').should('contain', 'Munsif, Vishal');
      cy.get('a').should('contain', 'Bazaz, Mohammad');
    });

    it('should show N/A if instructor name is absent', () => {
      cy.get('span').should('contain', 'Instructor: N/A');
    });
  });
});


describe('Filter classes by All and specific instructor', function () {
  context('when a user searches by all instructors followed specific instructor', () => {
    before(function () {
      cy.visit(localUrl);
      cy.get('.search-autocomplete input').type('accounting').click();
      cy.get('div').contains('Accounting', { timeout: 15000 }).click();
      cy.get('.search-instructor-autocomplete input').click();
      cy.wait(3000);
      cy.get('a.search-instructor-autocomplete-items div').contains('All').click();
      cy.get('button').contains('Submit').click();
      cy.wait(10000);
      cy.get('.search-instructor-autocomplete input').click();
      cy.get('.search-instructor-autocomplete-items div').contains('Liu, Xiang').click();
      cy.get('button').contains('Submit').click();
      cy.wait(10000);
    });
    it('should show Accounting classes by Liu, Xiang', () => {
      cy.get('a').should('contain', 'Liu, Xiang');
      cy.get('a').should('not.contain', 'Munsif, Vishal');
      cy.get('a').should('not.contain', 'Bazaz, Mohammad');
    });

  });
});
