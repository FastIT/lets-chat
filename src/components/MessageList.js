import React, { Component } from 'react';
import MessageListItem from './MessageListItem';

class MessageList extends Component {

  onNewMessageReady = () => {
    this.scrollView.scrollTop = this.scrollView.scrollHeight;
  }

  setScrollViewRef = (ref) => {
    this.scrollView = ref;
  }

  render() {
    return (
      <div className="App-message-list" ref={this.setScrollViewRef}>
        { this.props.msgs.map( (msg, idx) => <MessageListItem key={idx} msg={msg} onNewMessageReady={this.onNewMessageReady}/> ) }
      </div>
    );
  }

}

export default MessageList;
