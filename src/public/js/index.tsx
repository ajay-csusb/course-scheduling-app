import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { ClassSearchContainer } from './ClassSearchContainer';
import { Utils } from './Utils';

Utils.loadExternalTools();
if (Utils.isProd()) {
  const ErrorBoundary = Utils.loadBugsnagComponent();
  ReactDOM.render(<ErrorBoundary><ClassSearchContainer /></ErrorBoundary>,
    document.querySelector('#class-search-form-wrapper'));
} else {
  ReactDOM.render(<ClassSearchContainer />, document.querySelector('#class-search-form-wrapper'));
}
