import React, { Component } from 'react';

class ChatMessages extends Component {
  render() {

    const {messages} = this.props;

    const messagesLis = messages.map((message, idx) => (
      <li key={idx} className="left clearfix">
          <div className="chat-body clearfix">
              <div className="header">
                  <strong className="primary-font">
                      { message.user.name }
                  </strong>
              </div>
              <p>
                  { message.message }
              </p>
          </div>
      </li>
    ))

    return (
      <ul className="chat">
        {messagesLis}
      </ul>
    );
  }
}

export default ChatMessages;
