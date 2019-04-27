import React from 'react';

const ChatMessages = ({messages}) => {

    const messagesListItems = messages.map((message, idx) => (
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
        {messagesListItems}
      </ul>
    );

  }

export default ChatMessages;
