import { IClass, ICareerLevels } from './Class';

export function filter(classes: IClass[], careerLevelOptions: ICareerLevels): IClass[] {
  const result: IClass[] = [];

  if (!atLeastOneOptionSelected(careerLevelOptions)) {
    return classes;
  }

  classes.forEach(_class => {
    if (careerLevelOptions.ugrd && _class.degreeType.toLowerCase() === 'ugrd') {
      result.push(_class);
    }
    if (careerLevelOptions.pbac && _class.degreeType.toLowerCase() === 'pbac') {
      result.push(_class);
    }
    if (careerLevelOptions.exed && _class.degreeType.toLowerCase() === 'exed') {
      result.push(_class);
    }
  });

  return result;
}

function atLeastOneOptionSelected(careerLevelOptions: ICareerLevels) {
  return careerLevelOptions.ugrd || careerLevelOptions.pbac || careerLevelOptions.exed;
}
