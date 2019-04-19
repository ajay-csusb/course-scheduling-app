import { IItemRendererProps } from '@blueprintjs/select';
import React from 'react';
import { MenuItem } from '@blueprintjs/core';
import { ISubject } from './Subject';

export function filterClasses(query: any, subject: any): boolean {
  return `${subject.name}`.toLowerCase().indexOf(query.toLowerCase()) >= 0;
}

export function renderMenuItem(subject: ISubject, classRenderer: IItemRendererProps): JSX.Element {
  return (
    <MenuItem
      active={false}
      disabled={false}
      label={subject.abbr}
      key={subject.abbr}
      onClick={classRenderer.handleClick}
      text={subject.name}
      className="search-autocomplete-items"
    />
  );
}

export function renderInputValue(subject: ISubject): string {
  if (subject.abbr.length === 0) {
    return '';
  }
  return `${subject.name} (${subject.abbr})`;
}

export const renderClassSuggestProps = {
  itemRenderer: renderMenuItem,
  itemPredicate: filterClasses,
  inputValueRenderer: renderInputValue,
};
