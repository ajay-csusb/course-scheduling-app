const dotenv = require('dotenv');
dotenv.config({ path: '.env' });

let url = 'http://theme-csusb.pantheonsite.io/class-schedule';
if (process.env.NODE_ENV === 'local') {
  url = process.env.LOCAL_URL;
}

function selectSubject(subject="Biology") {
  cy.get('.search-autocomplete input').type(subject).click();
  cy.get('div').contains(subject).click();
}

function selectCampus(campus="San Bernardino") {
  cy.get('.campus-select select').select(campus);
}

function enterCourseNumber(courseNumber="100") {
  cy.get('.course-number').type(courseNumber);
}

function selectInstructionMode(instructionMode="Online") {
  cy.get('.select-instruction-mode select').select(instructionMode);
}

function checkDays(days=['.mon']) {
  for (const day of days) {
    cy.get(day + ' > .bp3-control-indicator').click();
  }
}

function enterTimes(startHour='08', startMinute='00', startAmPm = 'am', endHour='10', endMinute='00', endAmPm='pm') {
  cy.get('.start-time input.bp3-timepicker-hour').type(startHour);
  cy.get('.start-time input.bp3-timepicker-minute').type(startMinute);
  cy.get('.start-time select').select(startAmPm);
  cy.get('.end-time input.bp3-timepicker-hour').type(endHour);
  cy.get('.end-time input.bp3-timepicker-minute').type(endMinute);
  cy.get('.end-time select').select(endAmPm)
}

function submit() {
  cy.get('.btn-primary').click();
  waitForResults();
}

function clickAdditionalFilters() {
  cy.get('#additional-filters').click();
}

function waitForResults() {
  const loadingSpinner = Cypress.$('.bp3-spinner-animation');
  if (loadingSpinner.length === 1) {
    setTimeout(() => {
      waitForResults();
    }, 500);
  }
}
module.exports = {
  url: url,
  selectSubject: selectSubject,
  selectCampus: selectCampus,
  enterCourseNumber: enterCourseNumber,
  selectInstructionMode: selectInstructionMode,
  checkDays: checkDays,
  enterTimes: enterTimes,
  submit: submit,
  clickAdditionalFilters: clickAdditionalFilters,
  waitForResults: waitForResults,
}