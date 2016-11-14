import React, { Component } from 'react';

import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import ContentSend from 'material-ui/svg-icons/content/send';

class MessageInput extends Component {

  constructor(props) {
    super(props);
    this.state = {
      value: ''
    };
  }

  handleChange = (event) => {
    this.setState({value: event.target.value});
  }

  submit = (event) => {
    event.preventDefault();
    const msg = {
      text: this.state.value
    };
    this.props.onNewMessage(msg);
    this.setState({value: ''});
  }

  render() {
    return (
      <form className="Msg-input-layout" onSubmit={this.submit}>
        <TextField
          hintText="Message..."
          fullWidth={true}
          underlineShow={false}
          value={this.state.value}
          onChange={this.handleChange}
        />
        <FlatButton type="submit" icon={<ContentSend />} />
      </form>
    );
  }
}

export default MessageInput;
