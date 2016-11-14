import React, { Component } from 'react';

class MessageListItem extends Component {

  componentDidMount(prevProps, prevState) {
    this.props.onNewMessageReady();
  }

  render() {
    let msg = null;
    if (this.props.msg.image) {
      msg =
        <div>
          <span>{this.props.msg.text}</span>
          <br/>
          <img src={this.props.msg.image} onLoad={this.props.onNewMessageReady} role="presentation"/>
        </div>
    } else {
      msg = <span>{this.props.msg.text}</span>
    }
    return (
      <div className="Msg-message">
        <div className="Msg-header">
          <span className="Msg-username">{this.props.msg.username}</span>
          <span className="Msg-time">{ (new Date(this.props.msg.time)).toLocaleString() }</span>
        </div>
        <div className="Msg-body">{msg}</div>
      </div>
    );
  }

}

export default MessageListItem;
