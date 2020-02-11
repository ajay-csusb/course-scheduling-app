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

function enterCourseNumber(courseNumber = "100") {
  cy.get('.course-number').type(courseNumber);
}

module.exports = {
  url: url,
  selectSubject: selectSubject,
  enterCourseNumber: enterCourseNumber,
}