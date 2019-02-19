import { IItemRendererProps } from '@blueprintjs/select';
import { IClass } from './Class';
import React from 'react';
import { MenuItem } from '@blueprintjs/core';

export function filterClasses(query: any, classes: any): boolean {
  return `${classes.name.toLowerCase()} ${classes.classNumber}`.indexOf(query.toLowerCase()) >= 0;
}

export function renderMenuItem(classes: IClass, classRenderer: IItemRendererProps): JSX.Element {
  return (
    <MenuItem
      active={false}
      disabled={false}
      label={classes.name}
      key={classes.courseId}
      onClick={classRenderer.handleClick}
      text={`${classes.subject} ${classes.classNumber}`}
      className="search-autocomplete-items"
    />

  );
}

export function renderInputValue(classes: IClass): string {
  return classes.name;
}

export const renderClassSuggestProps = {
  itemRenderer: renderMenuItem,
  itemPredicate: filterClasses,
  inputValueRenderer: renderInputValue,
};
