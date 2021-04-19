// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'
const { url, selectSubject, enterCourseNumber, selectPreviousTerm, submit } = require('../integration/Utils');

// Alternatively you can use CommonJS syntax:
// require('./commands')

Cypress.on('uncaught:exception', (err, runnable) => {
  return false
});

before(function () {
  cy.visit(url);
  cy.get('.search-autocomplete input').type('All').click();
  cy.get('.bp3-menu').contains('All').click();
  cy.get('.btn-primary').click();
  cy.wait(10000);
  selectPreviousTerm();
  selectSubject();
  submit();
  cy.wait(10000);
});