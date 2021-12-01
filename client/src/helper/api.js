import {useState} from 'react';

import {apiCall} from './utils';
import {localId} from '../constant/auth';

const API_ENDPOINT = 'http://localhost:3000/api'

export const useFetchSessions = (botId) => {
  const [sessionId, setSessionId] = useState('') // Single session
  const sessionURL = `${API_ENDPOINT}/sessions`

  const createNewSession = async () => {
    try {
      // Get session and save to local storage
      const newSession = await apiCall(sessionURL, 'POST', {botId})
      const newSessionId = newSession._id
      localStorage.setItem(localId, newSessionId)
    } catch (error) {
      console.log('ERROR:', error)
    }
  }

  return [{sessionId}, {createNewSession, setSessionId}]
}

export const useFetchMessages = (botId) => {
  const [messages, setMessages] = useState([])
  const messageURL = `${API_ENDPOINT}/messages`

  const getMessages = async (sessionId) => {
    try {
      // Get session and save to local storage
      const getSpecificMessagesUrl = `${messageURL}/sessions/${sessionId}`
      const messages = await apiCall(getSpecificMessagesUrl, 'GET')
      setMessages(messages)
    } catch (error) {
      console.log('ERROR:', error)
    }
  }

  return [{messages}, {setMessages, getMessages}]
}