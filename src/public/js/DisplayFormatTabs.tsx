import * as React from 'react';
import {Tab, Tabs, TabId} from '@blueprintjs/core';

interface IDisplayFormatTabsProps {
  format: string;
  onChangeOfFormat: (event: any) => void;
  listClasses: JSX.Element[];
  tableClasses: JSX.Element;
}

export class DisplayFormatTabs extends React.Component<IDisplayFormatTabsProps, {}> {

  constructor(props: IDisplayFormatTabsProps) {
    super(props);
    this.handleChangeOfFormat = this.handleChangeOfFormat.bind(this);
  }

  public render(): JSX.Element {
    return(
      <Tabs
        animate={true}
        id="display-format-tabs"
        onChange={(event: any) => this.handleChangeOfFormat(event)}
        selectedTabId={this.props.format}
      >
        <Tab
          id="lists"
          key="lists"
          title={<><span className="sr-only">List View </span><i className="fas fa-bars" /></>}
          panel={<ul>{this.props.listClasses}</ul>}
          className={this.getClassName('lists')}
        />
        <Tab
          id="table"
          title={<><span className="sr-only">Table View </span><i className="fal fa-table" /></>}
          key="table"
          panel={<>{this.props.tableClasses}</>}
          className={this.getClassName('table')}
        />
      </Tabs>
    );
  }

  private handleChangeOfFormat(tabId: TabId): void {
    this.props.onChangeOfFormat(tabId);
  }

  private getClassName(currentTab: string): string {
    if (this.isActive(currentTab)) {
      return 'active';
    }
    return 'inactive';
  }

  private isActive(currentTab: string): boolean {
    return this.props.format === currentTab;
  }
}
