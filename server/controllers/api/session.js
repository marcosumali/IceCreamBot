const Session = require('../../models/api/session');

const getSessions = async (req, res) => {
  try {
    const sessions = await Session.find()
    res.status(200).json(sessions)
  } catch (err) {
    console.log('ERROR:', err.stack)
    res.status(500).json({message: err.message})
  }
}

const getSession = async (req, res) => {
  try {
    const session = await Session.findById(req.params.id)
    res.status(200).json(session)
  } catch (err) {
    console.log('ERROR:', err.stack)
    res.status(500).json({message: err.message})
  }
}

const createSession = async (req, res) => {
  try {
    const {botId, customerId} = req.body
    const session = new Session({botId, customerId})
    const newSession = await session.save()
    res.status(201).json(newSession)
  } catch (err) {
    console.log('ERROR:', err.stack)
    res.status(400).json({message: err.message})
  }
}

const updateSession = async (req, res) => {
  try {
    const {botId, customerId} = req.body
    if (botId) res.session.botId = botId
    if (customerId) res.session.customerId = customerId
    const newSession = await res.session.save()
    res.status(200).json(newSession)
  } catch (err) {
    console.log('ERROR:', err.stack)
    res.status(400).json({message: err.message})
  }
}

const deleteSession = async (req, res) => {
  try {
    const deletedSession = await res.session.remove()
    res.status(200).json(deletedSession)
  } catch (err) {
    console.log('ERROR:', err.stack)
    res.status(400).json({message: err.message})
  }
}


module.exports = {
  getSessions,
  getSession,
  createSession,
  updateSession,
  deleteSession,
}