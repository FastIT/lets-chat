import React, { Component } from 'react';

import MessageList from '../components/MessageList';
import MessageInput from '../components/MessageInput';
import ChannelService from '../services/ChannelService';

import './Message.css';

class MessagePage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      value: '',
      msgs: []
    };
  }

  componentWillMount() {
    this.subscription = ChannelService.subscribe( (msg) => {
      this.setState( prevState => ({
        msgs: [...prevState.msgs,msg]
      }));
    });
  }

  handleNewMessage = (msg) => {
    ChannelService.dispatch(msg);
  }

  render() {
    return (
      <div className="App-message-page">
        <MessageList msgs={this.state.msgs} />
        <MessageInput onNewMessage={this.handleNewMessage} />
      </div>
    );
  }
}

export default MessagePage;
