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
          id="list"
          key="list"
          title={<><i className="fas fa-bars" /> List</>}
          panel={<ul>{this.props.listClasses}</ul>}
        />
        <Tab
          id="table"
          key="table"
          title={<><i className="fal fa-table" /> Table</>}
          panel={<>{this.props.tableClasses}</>}
        />
      </Tabs>
    );
  }

}
