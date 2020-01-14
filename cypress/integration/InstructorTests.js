const url = require('./Utils');

describe('Filter classes by instructor', function () {
  context('when a user searches only by instructor', () => {
    before(function () {
      cy.visit(url);
      cy.get('.search-instructor-autocomplete input').click();
      cy.wait(3000);
      cy.get('a.search-instructor-autocomplete-items div').contains('Liu, Xiang').click();
      cy.get('.btn-primary').click();
      cy.wait(1000);
    });
    it('should show Accounting classes by Liu, Xiang', () => {
      cy.get('a').should('contain', 'Liu, Xiang');
    });
  });
    
  context('when a user searches by subject and instructor together', () => {
    before(function () {
      cy.visit(url);
      cy.get('.search-autocomplete input').type('accounting').click();
      cy.get('div').contains('Accounting', { timeout: 15000 }).click();
      cy.get('.search-instructor-autocomplete input').click();
      cy.wait(3000);
      cy.get('a.search-instructor-autocomplete-items div').contains('Liu, Xiang').click();
      cy.get('.btn-primary').click();
      cy.wait(10000);
    });
    it('should show Accounting classes by Liu, Xiang', () => {
      cy.get('a').should('contain', 'Liu, Xiang');
    });
  });

  context('when a user searches by subject followed by instructor', () => {
    before(function () {
      cy.visit(url);
      cy.get('.search-autocomplete input').type('accounting').click();
      cy.get('div').contains('Accounting', { timeout: 15000 }).click();
      cy.wait(3000);
      cy.get('.search-instructor-autocomplete input').click();
      cy.get('.search-instructor-autocomplete-items div').contains('Liu, Xiang').click();
      cy.get('.btn-primary').click();
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
      cy.visit(url);
      cy.get('.search-autocomplete input').type('accounting').click();
      cy.get('div').contains('Accounting', { timeout: 15000 }).click();
      cy.get('.search-instructor-autocomplete input').click();
      cy.wait(3000);
      cy.get('a.search-instructor-autocomplete-items div').contains('All').click();
      cy.get('.btn-primary').click();
      cy.wait(10000);
    });
    it('should show all Accounting classes', () => {
      cy.get('a').should('contain', 'Liu, Xiang');
      cy.get('a').should('contain', 'Yang, Taewon');
      cy.get('a').should('contain', 'Bazaz, Mohammad');
    });
  });

  context('when a user searches by subject followed by all instructor', () => {
    before(function () {
      cy.visit(url);
      cy.get('.search-autocomplete input').type('accounting').click();
      cy.get('div').contains('Accounting', { timeout: 15000 }).click();
      cy.get('.btn-primary').click();
      cy.wait(3000);
      cy.get('.search-instructor-autocomplete input').click();
      cy.get('a.search-instructor-autocomplete-items div').contains('All').click();
      cy.get('.btn-primary').click();
      cy.wait(10000);
    });
    it('should show all Accounting classes', () => {
      cy.get('a').should('contain', 'Liu, Xiang');
      cy.get('a').should('contain', 'Yang, Taewon');
      cy.get('a').should('contain', 'Bazaz, Mohammad');
    });
    it.skip('should show N/A if instructor name is absent', () => {
      cy.get('span').should('contain', 'Instructor: N/A');
    });
  });
});

describe('Filter classes by All and specific instructor', function () {
  context('when a user searches by all instructors followed specific instructor', () => {
    before(function () {
      cy.visit(url);
      cy.get('.search-autocomplete input').type('accounting').click();
      cy.get('div').contains('Accounting', { timeout: 15000 }).click();
      cy.get('.search-instructor-autocomplete input').click();
      cy.wait(3000);
      cy.get('a.search-instructor-autocomplete-items div').contains('All').click();
      cy.get('.btn-primary').click();
      cy.wait(10000);
      cy.get('.search-instructor-autocomplete input').click();
      cy.get('.search-instructor-autocomplete-items div').contains('Liu, Xiang').click();
      cy.get('.btn-primary').click();
      cy.wait(10000);
    });
    it('should show Accounting classes by Liu, Xiang', () => {
      cy.get('a').should('contain', 'Liu, Xiang');
      cy.get('a').should('not.contain', 'Yang, Taewon');
      cy.get('a').should('not.contain', 'Bazaz, Mohammad');
    });
  });
});
