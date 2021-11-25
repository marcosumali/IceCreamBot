const Sender = require('../../models/api/sender');

const isSenderExists = async (req, res, next) => {
  let sender
  try {
    sender = await Sender.findById(req.params.id)
    if (!sender) return res.status(404).json({message: `Sender doesn't exists`})
  } catch (err) {
    console.log('ERROR:', err.stack)
    res.status(500).json({message: err.message})
  }

  res.sender = sender
  next()
};


module.exports = {
  isSenderExists,
}
