const Bot = require('../../models/api/bot');
const Store = require('../../models/api/store');
const {generateError} = require('../../helper/utils');

const isBotExists = async (req, res, next) => {
  let bot
  try {
    bot = await Bot.findById(req.params.id)
    if (!bot) {
      const error = generateError(404, `Bot doesn't exists`)
      next(error)
    }
  } catch (err) {
    console.log('ERROR:', err.stack)
    const error = generateError(500, err.message)
    next(error)
  }

  res.bot = bot
  next()
};

const isStoreExists = async (req, res, next) => {
  try {
    const store = await Store.findById(req.body.storeId)
    if (!store) {
      const error = generateError(404, `Store doesn't exists`)
      next(error)
    }
  } catch (err) {
    console.log('ERROR:', err.stack)
    const error = generateError(500, err.message)
    next(error)
  }

  next()
};


module.exports = {
  isBotExists,
  isStoreExists,
}
