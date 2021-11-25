const Bot = require('../../models/api/bot');

const getBots = async (req, res) => {
  try {
    const bots = await Bot.find()
    res.status(200).json(bots)
  } catch (err) {
    console.log('ERROR:', err.stack)
    res.status(500).json({message: err.message})
  }
}

const getBot = async (req, res) => {
  try {
    const bot = await Bot.findById(req.params.id)
    res.status(200).json(bot)
  } catch (err) {
    console.log('ERROR:', err.stack)
    res.status(500).json({message: err.message})
  }
}

const createBot = async (req, res) => {
  try {
    const {name, username, storeId} = req.body
    const bot = new Bot({name, username, storeId})
    const newBot = await bot.save()
    res.status(201).json(newBot)
  } catch (err) {
    console.log('ERROR:', err.stack)
    res.status(400).json({message: err.message})
  }
}

const updateBot = async (req, res) => {
  try {
    const {name, username, storeId} = req.body
    if (name) res.bot.name = name
    if (username) res.bot.username = username
    if (storeId) res.bot.storeId = storeId
    const newBot = await res.bot.save()
    res.status(200).json(newBot)
  } catch (err) {
    console.log('ERROR:', err.stack)
    res.status(400).json({message: err.message})
  }
}

const deleteBot = async (req, res) => {
  try {
    const deletedBot = await res.bot.remove()
    res.status(200).json(deletedBot)
  } catch (err) {
    console.log('ERROR:', err.stack)
    res.status(400).json({message: err.message})
  }
}


module.exports = {
  getBots,
  getBot,
  createBot,
  updateBot,
  deleteBot,
}