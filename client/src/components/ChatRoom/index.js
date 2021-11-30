import React, {useRef, useState, useEffect} from 'react';

import styles from './index.scss';
import {socket} from '../../helper/socket';
import {useFetchSessions} from '../../helper/api';
import {localId} from '../../constant/auth';

export default function ChatRoom(props) {
  const {match} = props
  const botId = match.params.id

  const textInputRef = useRef('');
  const [messages, setMessages] = useState([]);
  const [{sessionId}, {createNewSession, setSessionId}] = useFetchSessions(botId);

  const onSubmit = (e) => {
    // Prevent event submit
    e.preventDefault()
    // Emit message to websocket server
    const message = textInputRef.current.value
    if (message) {
      socket.emit('send-message', {message, room: sessionId})
      textInputRef.current.value = '' // Clear up input value
    }
  }

  // Listen on webscoket for incoming messages
  socket.on('receive-message', function(incomingMessage) {
    const newMessages = [...messages, incomingMessage]
    setMessages(newMessages)
    // Add scroll to max scroll behaviour
    window.scrollTo(0, document.body.scrollHeight);
  });

  // On initial mount: check for session Id
  useEffect(() => {
    const localSesionId = localStorage.getItem(localId)
    if (localSesionId) setSessionId(localSesionId)
    if (!localSesionId) createNewSession()
  }, [])

  // On initial mount: join chat room
  useEffect(() => {
    socket.emit('join-room', sessionId)
    return () => {
      socket.emit('leave-room', sessionId)
    }
  }, [sessionId])

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
