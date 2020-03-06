import { IItemRendererProps } from '@blueprintjs/select';
import React from 'react';
import { MenuItem } from '@blueprintjs/core';
import { ISubject } from './Subject';

export function filterSubjects(query: string, subject: ISubject): boolean {
  const parsedQuery = query.toLowerCase().trim();
  if (subject.name.toLowerCase().trim().indexOf(parsedQuery) >= 0) {
    return true;
  }
  if (subject.abbr.toLowerCase().trim().indexOf(parsedQuery) >= 0) {
    return true;
  }
  return false;
}

function renderSubjects(subject: ISubject, classRenderer: IItemRendererProps): JSX.Element {
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

export function renderSubject(subject: ISubject): string {
  return `${subject.name.trim()} (${subject.abbr.trim()})`;
}

export const autocompleteSubjectsProps = {
  itemRenderer: renderSubjects,
  itemPredicate: filterSubjects,
  inputValueRenderer: renderSubject,
};
