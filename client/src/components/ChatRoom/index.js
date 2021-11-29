import React, {useRef, useState} from 'react';

import styles from './index.scss';
import {socket} from '../../helper/socket';

export default function ChatRoom() {
  const textInputRef = useRef('');
  const [messages, setMessages] = useState([]);

  const onSubmit = (e) => {
    // Prevent event submit
    e.preventDefault()
    // Emit message to websocket server
    const inputValue = textInputRef.current.value
    if (inputValue) {
      socket.emit('chat message', inputValue)
      textInputRef.current.value = '' // Clear up input value
    }
  }

  // Listen on webscoket for incoming messages
  socket.on('chat message', function(incomingMessage) {
    const newMessages = [...messages, incomingMessage]
    setMessages(newMessages)
    // Add scroll to max scroll behaviour
    window.scrollTo(0, document.body.scrollHeight);
  });

  return (
    <div>
      <ul id="messages" className={styles.messages}>
        {messages && messages.map((message, index) => (
          <li key={`message-${index}`}>{message}</li>
        ))}
      </ul>
      <form id="form" className={styles.form} action="" onSubmit={onSubmit}>
        <input type="text" id="input" ref={textInputRef} className={styles.input} autoComplete="off" /><button>Send</button>
      </form>
    </div>
  )
}
