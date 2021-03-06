const dotenv = require('dotenv');
dotenv.config({ path: '.env' });

let url = Cypress.env('url');
if (url === undefined) {
  url = 'http://d8-csusb.pantheonsite.io/class-schedule';
}

function selectSubject(subject = 'Biology') {
  cy.get('.search-autocomplete input').type(subject).click();
  cy.get('div').contains(subject).click();
}

function selectCampus(campus = 'San Bernardino') {
  cy.get('.campus-select select').select(campus);
}

function enterCourseNumber(courseNumber = '1000') {
  cy.get('.course-number').type(courseNumber);
}

function selectInstructionMode(instructionMode = 'Online') {
  cy.get('.select-instruction-mode select').select(instructionMode);
}

function checkDays(days = ['.mon']) {
  for (const day of days) {
    cy.get(day + ' > .bp3-control-indicator').click();
  }
}

function enterTimes(
  startHour = '08',
  startMinute = '00',
  startAmPm = 'am',
  endHour = '10',
  endMinute = '00',
  endAmPm = 'pm'
) {
  cy.get('.start-time input.bp3-timepicker-hour').type(startHour);
  cy.get('.start-time input.bp3-timepicker-minute').type(startMinute);
  cy.get('.start-time select').select(startAmPm);
  cy.get('.end-time input.bp3-timepicker-hour').type(endHour);
  cy.get('.end-time input.bp3-timepicker-minute').type(endMinute);
  cy.get('.end-time select').select(endAmPm);
}

function submit() {
  cy.get('.btn-primary').click();
  submitHelper().then(res => console.log(res));
}

async function submitHelper() {
  return await waitForResults();
}

function clickAdditionalFilters() {
  cy.get('#additional-filters').click();
}

function waitForResults(timer = 0) {
  const results = Cypress.$('.course').length;

  if (results === 0) {
    setTimeout(() => {
      waitForResults(timer + 1);
    }, 50);
  }

  return Promise.resolve(timer);
}

function selectPreviousTerm() {
  let prevYear = [];
  cy.get('#term option').each((e) => {
    prevYear.push(Cypress.$(e).text());
  }).then(() => {
    cy.get("#term").select(prevYear[3])
  });
}

function selectClassFromFallTerm(subject = 'English') {
  let lastFallTerm;
  const nextFallTerms = ['Fall 2021', 'Fall 2022', 'Fall 2023', 'Fall 2024', 'Fall 2025', 'Fall 2026', 'Fall 2027'];
  let index = 0;
  cy.visit(url);
  while (index < nextFallTerms.length) {
    if (cy.get('#term').contains(nextFallTerms[index])) {
      lastFallTerm = nextFallTerms[index];
      break;
    }
    index += 1;
  }
  cy.get('#term').select(lastFallTerm);
  selectSubject(subject);
  submit();
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
  selectPreviousTerm: selectPreviousTerm,
  selectClassFromFallTerm: selectClassFromFallTerm,
};
