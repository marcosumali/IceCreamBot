const Message = require('../../models/api/message');

const getMessages = async (req, res) => {
  try {
    const messages = await Message.find()
    res.status(200).json(messages)
  } catch (err) {
    console.log('ERROR:', err.stack)
    res.status(500).json({message: err.message})
  }
}

const getMessage = async (req, res) => {
  try {
    const message = await Message.findById(req.params.id)
    res.status(200).json(message)
  } catch (err) {
    console.log('ERROR:', err.stack)
    res.status(500).json({message: err.message})
  }
}

const createMessage = async (req, res) => {
  try {
    const {text, fileUrl, createdAt, sessionId, senderId} = req.body
    const message = new Message({text, fileUrl, createdAt, sessionId, senderId})
    const newMessage = await message.save()
    res.status(201).json(newMessage)
  } catch (err) {
    console.log('ERROR:', err.stack)
    res.status(400).json({message: err.message})
  }
}

const updateMessage = async (req, res) => {
  try {
    const {text, fileUrl, createdAt, sessionId, senderId} = req.body
    if (text) res.message.text = text
    if (fileUrl) res.message.fileUrl = fileUrl
    if (createdAt) res.message.createdAt = createdAt
    if (sessionId) res.message.sessionId = sessionId
    if (senderId) res.message.senderId = senderId
    const newMessage = await res.message.save()
    res.status(200).json(newMessage)
  } catch (err) {
    console.log('ERROR:', err.stack)
    res.status(400).json({message: err.message})
  }
}

const deleteMessage = async (req, res) => {
  try {
    const deletedMessage = await res.message.remove()
    res.status(200).json(deletedMessage)
  } catch (err) {
    console.log('ERROR:', err.stack)
    res.status(400).json({message: err.message})
  }
}


module.exports = {
  getMessages,
  getMessage,
  createMessage,
  updateMessage,
  deleteMessage,
}