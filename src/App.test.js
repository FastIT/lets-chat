import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import { shallow, mount } from 'enzyme';

import App from './App';

import IconButton from 'material-ui/IconButton';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

describe('App component tests', () => {

  const mountWithCtx = (cmp) => {
    return mount(cmp, {
      context: {muiTheme: getMuiTheme()},
      childContextTypes: {muiTheme: React.PropTypes.object}
    });
  };

  it('renders without crashing', () => {
    const wrapper = mountWithCtx(<App />);
  });

  it('has 3 children', () => {
    const wrapper = mountWithCtx(<App />);
    expect(wrapper.children().length).toEqual(3);
    expect(wrapper.childAt(0).type()).toBe(AppBar);
    expect(wrapper.childAt(1).type()).toBe(Drawer);
    expect(wrapper.childAt(2).type()).toBe('div');
  });

  it('starts with drawer closed', () => {
    const wrapper = mountWithCtx(<App />);
    expect(wrapper.state('drawerOpen')).toBe(false);
  });

  it('opens drawer on click', () => {
    const wrapper = mountWithCtx(<App />);
    // starts closed
    expect(wrapper.state('drawerOpen')).toBe(false);
    expect(wrapper.find(Drawer).prop('open')).toBe(false);
    // click on btn
    const btnElm = ReactDOM.findDOMNode(wrapper.find(IconButton).first().node);
    TestUtils.Simulate.touchTap(btnElm)
    // expect drawer to be opened
    expect(wrapper.state('drawerOpen')).toBe(true);
    expect(wrapper.find(Drawer).prop('open')).toBe(true);
  });
});
