const Sender = require('../../models/api/sender');

const getSenders = async (req, res) => {
  try {
    const senders = await Sender.find()
    res.status(200).json(senders)
  } catch (err) {
    console.log('ERROR:', err.stack)
    res.status(500).json({message: err.message})
  }
}

const getSender = async (req, res) => {
  try {
    const sender = await Sender.findById(req.params.id)
    res.status(200).json(sender)
  } catch (err) {
    console.log('ERROR:', err.stack)
    res.status(500).json({message: err.message})
  }
}

const createSender = async (req, res) => {
  try {
    const {_id, name} = req.body
    const sender = new Sender({_id, name})
    const newSender = await sender.save()
    res.status(201).json(newSender)
  } catch (err) {
    console.log('ERROR:', err.stack)
    res.status(400).json({message: err.message})
  }
}

const updateSender = async (req, res) => {
  try {
    const {_id, name} = req.body
    if (_id) res.sender._id = _id
    if (name) res.sender.name = name
    const newSender = await res.sender.save()
    res.status(200).json(newSender)
  } catch (err) {
    console.log('ERROR:', err.stack)
    res.status(400).json({message: err.message})
  }
}

const deleteSender = async (req, res) => {
  try {
    const deletedSender = await res.sender.remove()
    res.status(200).json(deletedSender)
  } catch (err) {
    console.log('ERROR:', err.stack)
    res.status(400).json({message: err.message})
  }
}


module.exports = {
  getSenders,
  getSender,
  createSender,
  updateSender,
  deleteSender,
}