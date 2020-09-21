import {IClass, ICourseLevels } from './Class';

export function filter(classes: IClass[], courseLevelsOptions: ICourseLevels): IClass[] {
  const result: IClass[] = [];

  if (!atLeastOneOptionSelected(courseLevelsOptions)) {
    return classes;
  }

  classes.forEach(_class => {
    if (courseLevelsOptions[1000] && _class.catalogNo.startsWith('1')) {
      result.push(_class);
    }
    if (courseLevelsOptions[2000] && _class.catalogNo.startsWith('2')) {
      result.push(_class);
    }
    if (courseLevelsOptions[3000] && _class.catalogNo.startsWith('3')) {
      result.push(_class);
    }
    if (courseLevelsOptions[4000] && _class.catalogNo.startsWith('4')) {
      result.push(_class);
    }
    if (courseLevelsOptions[5000] && _class.catalogNo.startsWith('5')) {
      result.push(_class);
    }
    if (courseLevelsOptions[6000] && _class.catalogNo.startsWith('6')) {
      result.push(_class);
    }
    if (courseLevelsOptions[7000] && _class.catalogNo.startsWith('7')) {
      result.push(_class);
    }
  });

  return result;
}

function atLeastOneOptionSelected(courseLevelsOptions: ICourseLevels) {
  return courseLevelsOptions[1000] || courseLevelsOptions[2000] || courseLevelsOptions[3000] || courseLevelsOptions[4000] || courseLevelsOptions[5000] || courseLevelsOptions[6000] || courseLevelsOptions[7000];
  
}