import { ISubject } from '../src/public/js/Subject';
import { filterSubjects, renderSubject } from '../src/public/js/AutocompleteSubjects';

const subject: ISubject = {
  name: 'Administration',
  abbr: 'ADMN',
};
describe('filter subjects by user input', () => {

  describe('when a user searches for Administration classes', () => {
    describe('and searches by subject name', () => {
      it('should return true', () => {
        expect(filterSubjects('Admi', subject)).toBeTruthy();
      });
    });

    describe('and searches by subject abbreviation', () => {
      it('should return true', () => {
        expect(filterSubjects('admn', subject)).toBeTruthy();
        expect(filterSubjects('ADM', subject)).toBeTruthy();
      });
    });

    describe('and searches by invalid subject', () => {
      it('should return false', () => {
        expect(filterSubjects('bio', subject)).toBeFalsy();
      });
    });

    describe('and does not enter any subject', () => {
      it('should return true', () => {
        expect(filterSubjects(' ', subject)).toBeTruthy();
        expect(filterSubjects('', subject)).toBeTruthy();
      });
    });
  });

});

describe('Subject name and abbreviation format', () => {

  describe('when a subject is displayed in the autocomplete', () => {
    it('should be displayed in the correct format', () => {
      expect(renderSubject(subject)).toEqual('Administration (ADMN)');
    });
  });

});
