import * as form from './Utils';

describe('when a user searches for classes on Monday and Tuesday', () => {
  before(function () {
    cy.visit( form.url );
    form.selectSubject();
    form.checkDays( [ '.mon', '.tue' ] )
    form.submit();
  });

  it('should should classes on Monday and Tuesday', () => {
    cy.get( 'li' )
      .should( 'contain', 'M-W' )
      .should( 'contain', 'Tu-Th' );
  });
});

describe('when a user does not check any days', () => {
  before(function () {
    cy.visit( form.url );
    form.selectSubject();
    form.submit();
  });

  it('should should classes all in-person and online classes', () => {
    cy.get( 'li' )
      .should( 'contain', 'M-W' )
      .should( 'contain', 'Tu-Th' );
  });
});

describe('when a user searches only by meeting day', () => {
  before(function () {
    cy.visit( form.url );
    form.checkDays( [ '.sun' ] )
    form.submit();
  });

  it('should return more than 1 classes in the results', () => {
    cy.get( '.class-search-results-component p' )
      .should( 'not.contain', 'Found 0 classes' );
  });
});