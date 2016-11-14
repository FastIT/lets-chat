import React, { Component } from 'react';
import { Link } from 'react-router'

import './App.css';

import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import CommunicationChat from 'material-ui/svg-icons/communication/chat';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {drawerOpen: false}
  }

  toggleDrawer = () => {
    this.setState((prevState, props) => ({drawerOpen: !prevState.drawerOpen}));
  };

  render() {
    return (
      <div className="App">
        <AppBar
          title="Let's Chat"
          iconClassNameRight="muidocs-icon-navigation-expand-more"
          onLeftIconButtonTouchTap={this.toggleDrawer}
        />
        <Drawer
          docked={false}
          open={this.state.drawerOpen}>
           <Link to="/">
            <MenuItem
              leftIcon={<CommunicationChat />}
              onTouchTap={this.toggleDrawer}
            >
              General
            </MenuItem>
          </Link>
        </Drawer>
        <div className="App-body">
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default App;
