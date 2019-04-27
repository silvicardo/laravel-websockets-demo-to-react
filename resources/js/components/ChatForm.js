//Refactored to use Hooks
import React, { useState } from 'react';

const ChatForm = (props) => {

  const [newMessage, setNewMessage] = useState('');

  const onNewMessageSubmit = (e) => {

    e.preventDefault();

    props.onMessageSent(setNewMessage);

    setNewMessage('');

  }

  const handleChange = (e) => {

    // console.log('type event!', props.currentUser);
    
    Echo.join('chat').whisper('typing', props.currentUser);

    setNewMessage(e.target.value);

  }

  return (
    <form onSubmit={onNewMessageSubmit}>
    <div className="input-group">
        <input
          id="btn-input"
          type="text"
          name="newMessage"
          className="form-control input-sm"
          placeholder="Type your message here..."
          value={newMessage}
          onChange={handleChange}
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

export default ChatForm;
