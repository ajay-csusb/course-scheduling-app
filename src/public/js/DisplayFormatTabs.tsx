import * as React from 'react';
import {Tab, Tabs, TabId } from '@blueprintjs/core';

interface IDisplayFormatTabsProps {
  format: string;
  onChangeOfFormat: (event: any) => void;
  listClasses: JSX.Element[];
  tableClasses: JSX.Element;
}

export class DisplayFormatTabs extends React.Component<IDisplayFormatTabsProps, {}> {

  constructor(props: IDisplayFormatTabsProps) {
    super(props);
  }

  public render(): JSX.Element {
    const storedValue = sessionStorage.getItem('format');
    const userSelection =  (storedValue !== null && storedValue !== undefined && storedValue.length !== 0) ? storedValue : this.props.format;

    return(
      <Tabs
        animate={true}
        id="display-format-tabs"
        onChange={(tabId: TabId) => this.props.onChangeOfFormat(tabId)}
        selectedTabId={userSelection}
      >
        <Tab
          id="lists"
          key="lists"
          title={<><span className="sr-only">List View </span><i className="fas fa-bars" /></>}
          panel={<ul>{this.props.listClasses}</ul>}
        />
        <Tab
          id="table"
          key="table"
          title={<><span className="sr-only">Table View </span><i className="fal fa-table" /></>}
          panel={<>{this.props.tableClasses}</>}
        />
      </Tabs>
    );
  }

}
