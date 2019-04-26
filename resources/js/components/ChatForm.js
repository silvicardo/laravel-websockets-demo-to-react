import React, { Component } from 'react';

class ChatForm extends Component {

  constructor(props){
    super(props);

    this.state = {
      newMessage: '',

    };

    this.onNewMessageSubmit = this.onNewMessageSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  onNewMessageSubmit(e){
    e.preventDefault();

    this.props.onMessageSent(this.state.newMessage);

    this.setState({newMessage: ''})

  }

  handleChange(e) {
    console.log('type event!', this.props.currentUser)
    //Send
    Echo.join('chat').whisper('typing', this.props.currentUser);

    this.setState({[e.target.name] : e.target.value });

  }

  render() {
    return (
      <form onSubmit={this.onNewMessageSubmit}>
      <div className="input-group">
          <input
            id="btn-input"
            type="text"
            name="newMessage"
            className="form-control input-sm"
            placeholder="Type your message here..."
            value={this.state.newMessage}
            onChange={this.handleChange}
          />
          <span className="input-group-btn">
              <button
              className="btn btn-primary btn-sm"
              id="btn-chat">
                Send
              </button>
          </span>
      </div>
    </form>
    );
  }
}

export default ChatForm;
