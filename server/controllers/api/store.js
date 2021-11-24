const Store = require('../../models/api/store');

const getStores = async (req, res) => {
  try {
    console.log('---1', req.params)
    const stores = await Store.find()
    res.status(200).json(stores)
  } catch (err) {
    console.log('ERROR:', err.stack)
    res.status(500).json({message: err.message})
  }
}

const getStore = async (req, res) => {
  try {
    console.log('---2', req.params.id)
    const stores = await Store.findById(req.params.id)
    res.status(200).json(stores)
  } catch (err) {
    console.log('ERROR:', err.stack)
    res.status(500).json({message: err.message})
  }
}

const createStore = async (req, res) => {
  try {
    const {name, address, phone} = req.body
    const store = new Store({name, address, phone})
    const newStore = await store.save()
    res.status(201).json(newStore)
  } catch (err) {
    console.log('ERROR:', err.stack)
    res.status(400).json({message: err.message})
  }
}

const updateStore = async (req, res) => {
  try {
    const {name, address, phone} = req.body
    if (name) res.store.name = name
    if (address) res.store.address = address
    if (phone) res.store.phone = phone
    const newStore = await res.store.save()
    res.status(200).json(newStore)
  } catch (err) {
    console.log('ERROR:', err.stack)
    res.status(400).json({message: err.message})
  }
}

const deleteStore = async (req, res) => {
  try {
    const deletedStore = await res.store.remove()
    res.status(200).json(deletedStore)
  } catch (err) {
    console.log('ERROR:', err.stack)
    res.status(400).json({message: err.message})
  }
}


module.exports = {
  getStores,
  getStore,
  createStore,
  updateStore,
  deleteStore,
}