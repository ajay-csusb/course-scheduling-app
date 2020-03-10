import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { ClassSearchContainer } from './ClassSearchContainer';
import { Utils } from './Utils';

Utils.loadExternalTools();
ReactDOM.render(<ClassSearchContainer />, document.querySelector('#class-search-form-wrapper'));
