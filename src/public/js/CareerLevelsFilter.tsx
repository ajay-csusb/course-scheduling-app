import { IClass, ICareerLevels } from './Class';

export function filter(classes: IClass[], careerLevelsOptions: ICareerLevels): IClass[] {
  const result: IClass[] = [];

  if (!atLeastOneOptionSelected(careerLevelsOptions)) {
    return classes;
  }

  classes.forEach(_class => {
    if (careerLevelsOptions.ugrd && _class.degreeType.toLowerCase() === 'ugrd') {
      result.push(_class);
    }
    if (careerLevelsOptions.pbac && _class.degreeType.toLowerCase() === 'pbac') {
      result.push(_class);
    }
    if (careerLevelsOptions.exed && _class.degreeType.toLowerCase() === 'exed') {
      result.push(_class);
    }
  });

  return result;
}

function atLeastOneOptionSelected(careerLevelsOptions: ICareerLevels) {
  return careerLevelsOptions.ugrd || careerLevelsOptions.pbac || careerLevelsOptions.exed;
}
