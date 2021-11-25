const Bot = require('../../models/api/bot');

const isBotExists = async (req, res, next) => {
  let bot
  try {
    bot = await Bot.findById(req.params.id)
    if (!bot) return res.status(404).json({message: `Bot doesn't exists`})
  } catch (err) {
    console.log('ERROR:', err.stack)
    res.status(500).json({message: err.message})
  }

  res.bot = bot
  next()
};


module.exports = {
  isBotExists,
}
