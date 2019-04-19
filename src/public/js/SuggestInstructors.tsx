import { IItemRendererProps } from '@blueprintjs/select';
import React from 'react';
import { MenuItem } from '@blueprintjs/core';

export function filterInstructors(query: any, instructor: any): boolean {
  return `${instructor}`.toLowerCase().indexOf(query.toLowerCase()) >= 0;
}

export function renderMenuItem(instructor: string, instructorRenderer: IItemRendererProps): JSX.Element {
  return (
    <MenuItem
      active={false}
      disabled={false}
      onClick={instructorRenderer.handleClick}
      key={instructor}
      text={instructor}
      className="search-instructor-autocomplete-items"
    />
  );
}

export function renderInputValue(instructors: string): string {
  return (instructors === ' -- Not Known -- ') ? '' : instructors;
}

export const renderInstructorSuggestProps = {
  itemRenderer: renderMenuItem,
  itemPredicate: filterInstructors,
  inputValueRenderer: renderInputValue,
};
