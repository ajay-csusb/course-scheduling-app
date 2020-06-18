import { DisplayFormatTabs } from '../../src/public/js/DisplayFormatTabs';
import { mount, ReactWrapper } from 'enzyme';
import * as React from 'react';

function mountDisplayFormatTabsComponent(): ReactWrapper {
  const onChangeOfFormat = jest.fn();
  const displayFormatTabsComponent: JSX.Element = (
    <DisplayFormatTabs
      format={'lists'}
      onChangeOfFormat={onChangeOfFormat}
      listClasses={[]}
      tableClasses={<></>}
    />
  );
  return mount(displayFormatTabsComponent);
}

describe('Display format tabs', () => {

  describe('Given a display format tabs component', () => {
    test('snapshot', () => {
      const displayFormatTabsComponent = mountDisplayFormatTabsComponent();
      expect(displayFormatTabsComponent).toMatchSnapshot();
    });
  });

  describe('When a display format tab component is mounted', () => {
    let displayFormatTabsComponent = null;
    beforeEach(() => {
      displayFormatTabsComponent = mountDisplayFormatTabsComponent();
    });
    it('should display two tabs', () => {
      expect(displayFormatTabsComponent.text()).toContain('List');
      expect(displayFormatTabsComponent.text()).toContain('Table');
    });
  });

});
